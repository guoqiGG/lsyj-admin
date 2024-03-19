<template>

    <el-card>

        <el-form :inline="true" :model="searchForm" class="demo-form-inline" lable-width="100px">
            <el-row>
                <el-col :span="6">
                    <el-form-item label="用户昵称">
                        <el-input v-model="searchForm.name" placeholder="用户昵称" clearable />
                    </el-form-item>
                </el-col>
                <el-form-item>
                    <el-button type="primary" @click="getUserList">查询</el-button>
                    <el-button @click="resetForm()">重置</el-button>
                </el-form-item>
            </el-row>
        </el-form>

    </el-card>
    <el-card style="margin-top: 10px;">
        <el-table v-loading="loading" :data="userListData" style="width: 100%">
            <el-table-column prop="name" label="用户昵称" />
            <el-table-column prop="mobile" label="用户手机" />
            <el-table-column label="团长" align="center">
                <template #default="scope">
                    {{ scope.row.leaderName ? scope.row.leaderName + ':' + scope.row.leaderMobile : '无' }}
                </template>
            </el-table-column>
            <el-table-column label="用户类型" align="center">
                <template #default="scope">
                    <div :class="['info', scope.row.type == 0 ? 'blue' : '']">{{ scope.row.type == 0 ? '普通用户' : '团长' }}
                    </div>
                </template>
            </el-table-column>
            <el-table-column prop="levelName" label="用户等级" />
            <el-table-column prop="regTime" label="注册时间" />
            <el-table-column prop="createTime" label="创建时间" />
        </el-table>
        <div class="pagination">
            <el-pagination background layout="total, sizes, prev, pager, next, jumper"
                v-model:page-size="pages.pageSize" v-model:current-page="pages.current"
                :page-sizes="[10, 20, 50, 100, 200, 500]" :total="pages.total" @size-change="tableHandleSizeChange"
                @current-change="tableHandleChange" />
        </div>
    </el-card>
</template>
<script setup>
import { onMounted, ref } from "vue";
import { userList } from "../../api/modules";
const searchParams = {
    name: '',
    mobile: '',
    memberType: '',
    leaderName: '',
    leaderMobile: '',
}
const loading = ref(false)
const searchForm = ref({ ...searchParams })
const pages = ref({
    pageNo: 1,
    pageSize: 20,
    total: 0
})
let userListData = ref([])

const getUserList = async () => {
    loading.value = true
    const res = await userList({ ...searchForm.value, ...pages.value })
    loading.value = false
    userListData.value = res.data.list
    pages.value.total = res.data.total
}

const tableHandleSizeChange = (e) => {
    pages.value.pageSize = e
}
const tableHandleChange = (e) => {
    pages.value.pageNo = e
    getUserList()
}
const resetForm = () => {
    searchForm.value = { ...searchParams }
}

onMounted(() => {
    getUserList()
})
</script>
<style lang="scss" scoped>
.info {
    display: block;
    width: auto;
    line-height: 20px;
    margin-top: 10px;
    text-align: center;
    color: red;
    padding: 0 5px;

    &.blue {
        color: blue;
    }
}
</style>

<style scoped>
.pagination{
    margin-top: 20px;
}
.operation{
    color: #4060c7;
    margin: 0px 5px;
    cursor: pointer;
}
</style>