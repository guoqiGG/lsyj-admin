<template>
    <el-card>
        <el-form :inline="true" :model="searchForm" class="demo-form-inline" lable-width="100px">
            <el-row>
                <el-col :span="6">
                    <el-form-item label="用户昵称">
                        <el-input v-model="searchForm.name" placeholder="用户昵称" clearable />
                    </el-form-item>
                </el-col>
                <el-col :span="6">
                    <el-form-item label="用户手机">
                        <el-input v-model="searchForm.mobile" placeholder="用户手机" clearable />
                    </el-form-item>
                </el-col>
                <el-col :span="6">
                    <el-form-item label="团长名称">
                        <el-input v-model="searchForm.leaderName" placeholder="团长名称" clearable />
                    </el-form-item>
                </el-col>
                <el-col :span="6">
                    <el-form-item label="团长手机">
                        <el-input v-model="searchForm.leaderMobile" placeholder="团长手机" clearable />
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="所属团长">
                        <el-select v-model="searchForm.puid" filterable placeholder="请选择所属团长" style="width: 240px">
                            <el-option v-for="item in options" :key="item.id" :label="item.leaderName"
                                :value="item.id" />
                        </el-select>
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
    <el-button  :icon="Download" style="margin-bottom: 20px"  >导出</el-button>
        <el-table v-loading="loading" :data="userListData" style="width: 100%">
            <el-table-column prop="name" label="用户昵称"></el-table-column>
            <el-table-column prop="avatar" label="头像">
                <template #default="scope">
                    <el-image style="width: 35px;border-radius:50%;" :src="scope.row.avatar" lazy></el-image>
                </template>
            </el-table-column>
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
            <!-- <el-table-column prop="createTime" label="创建时间" /> -->
            <el-table-column fixed="right" label="操作" width="180" align="center">
                <template #default="scope">
                    <span class="operation" @click="editOrCreateDialog(scope)" :icon="Edit">编辑</span>
                </template>
            </el-table-column>
        </el-table>
        <div class="pagination">
            <el-pagination background layout="total, sizes, prev, pager, next, jumper"
                v-model:page-size="pages.pageSize" v-model:current-page="pages.pageNo"
                :page-sizes="[10, 20, 50, 100, 200, 500]" :total="pages.total" @size-change="tableHandleSizeChange"
                @current-change="tableHandleChange" />
        </div>
    </el-card>
    <!-- 修改用户信息 -->
    <edit-user-info ref="editUserInfoRef" :editOrCreateDialogVisible="editOrCreateDialogVisible" :userInfo="userInfo"
        :active="active" @closeDialog="closeDialog"></edit-user-info>
</template>
<script setup>
import EditUserInfo from './edit-user-info.vue'

import { onMounted, ref, reactive } from "vue";
import { userList, leaderList } from "../../api/modules";
import {
   Download
} from '@element-plus/icons-vue'

const options = ref()
const getLeaderList = async () => {
    const res = await leaderList({
        pageNo: 1,
        pageSize: 10000,
    })
    options.value = res.data.list
}
const searchParams = {
    name: '',
    mobile: '',
    type: '', // 0 普通团长 1 团长
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
const userInfo = ref({
    id: 0,
    name: '',
    avatar: '',
    mobile: '',
    leaderName: '',
    leaderMobile: '',
    levelName: '',
    regTime: ''
})

const editOrCreateDialogVisible = ref(false)

let userListData = ref([])
const active = ref('1') // tab 1购物明细 2礼品卡明细 3合成卡明细 4优惠券明细
const editUserInfoRef = ref(null)


const getUserList = async () => {
    loading.value = true
    const res = await userList({ ...searchForm.value, ...pages.value })
    userListData.value = res.data.list
    pages.value.total = res.data.total
    loading.value = false
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
    getUserList()
}

const editOrCreateDialog = (scope) => {
    editOrCreateDialogVisible.value = true
    userInfo.value.id = scope.row.id
    userInfo.value.name = scope.row.name
    userInfo.value.avatar = scope.row.avatar
    userInfo.value.mobile = scope.row.mobile
    userInfo.value.leaderName = scope.row.leaderName
    userInfo.value.leaderMobile = scope.row.leaderMobile
    userInfo.value.levelName = scope.row.levelName
    userInfo.value.regTime = scope.row.regTime
    editUserInfoRef.value.getOrderList()
}

const closeDialog = () => {
    console.log(1)
    editOrCreateDialogVisible.value = false
}

onMounted(() => {
    getLeaderList()
    getUserList()
})
</script>


<style scoped lang="scss">
.pagination {
    margin-top: 20px;
}

.operation {
    color: #4060c7;
    margin: 0px 5px;
    cursor: pointer;
}

.footer {
    padding-left: 0;
}
</style>