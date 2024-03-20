<template>
    <el-card>
        <el-form :inline="true" :model="searchForm" class="demo-form-inline" lable-width="100px">
            <el-row>
                <el-col :span="6">
                    <el-form-item label="用户名称">
                        <el-input v-model="searchForm.name" placeholder="请输入" clearable />
                    </el-form-item>
                </el-col>
                <el-col :span="6">
                    <el-form-item label="用户手机号">
                        <el-input v-model="searchForm.mobile" placeholder="请输入" clearable />
                    </el-form-item>
                </el-col>
                <el-col :span="6">
                    <el-form-item label="用户ID">
                        <el-input v-model="searchForm.userId" placeholder="请输入" clearable />
                    </el-form-item>
                </el-col>
                <el-col :span="6">
                    <el-form-item label="礼品卡名称">
                        <el-input v-model="searchForm.giftName" placeholder="请输入" clearable />
                    </el-form-item>
                </el-col>
                <el-col :span="6">
                    <el-form-item label="礼品卡状态">
                        <el-select style="width:92%" v-model="searchForm.status" placeholder="请选择" clearable>
                            <el-option label="未合成" value="0" />
                            <el-option label="已合成" value="1" />
                            <el-option label="已过期" value="2" />
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="6">
                    <el-form-item label="礼品卡来源">
                        <el-select style="width:92%" v-model="searchForm.type" placeholder="请选择" clearable>
                            <el-option label="系统发放 " value="0" />
                            <el-option label="后台赠送" value="1" />
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-form-item>
                    <el-button type="primary" @click="getUserCompositeList">查询</el-button>
                    <el-button @click="resetForm()">重置</el-button>
                </el-form-item>
            </el-row>
        </el-form>

    </el-card>
    <el-card style="margin-top: 10px;">
        <el-table v-loading="loading" :data="userCompositeData" style="width: 100%">
            <el-table-column prop="name" label="用户名称" align="center" />
            <el-table-column prop="mobile" label="手机号" align="center" />
            <el-table-column prop="id" label="用户ID" align="center" />
            <el-table-column prop="giftName" label="礼品卡名称" align="center" />
            <el-table-column prop="status" label="礼品卡状态" align="center">
                <template #default="scope">
                    {{ scope.row.status == 0 ? '未合成' :scope.row.status == 1 ? '已合成' : scope.row.status == 1 ? '已过期' : '' }}
                </template>
            </el-table-column>
            <el-table-column prop="type" label="礼品卡来源" align="center">
                <template #default="scope">
                    {{ scope.row.type == 0 ? '系统发放' :scope.row.type == 1 ?'后台赠送': '' }}
                </template>
            </el-table-column>
        </el-table>
        <div class="pagination">
            <el-pagination background layout="total, sizes, prev, pager, next, jumper"
                v-model:page-size="pages.pageSize" v-model:current-page="pages.current"
                :page-sizes="[10, 20, 50, 100, 200, 500]" :total="total" @size-change="tableHandleSizeChange"
                @current-change="tableHandleChange" />
        </div>
    </el-card>
</template>
<script setup>
import { onMounted, ref } from "vue";
import { userCompositeList} from "../../api/modules";
const searchParams = {
    userName: null,//用户名称
    userMobile: null,
    userId:null,
    status:null,//0未核销 1已核销
    giftRuleName:null,//合成卡名称q
    leaderName:null,//团长名称
    leaderMobile:null,//团长手机号
    pUid:null,//团长id
    startDate:null,//合成卡获得开始时间
    endDate:null,//合成卡获得结束时间
    cancelStartDate:null,//核销开始时间
    cancelEndDate:null,//cancelEndDate
}
const loading = ref(false)
const searchForm = ref({ ...searchParams })
const pages = ref({
    pageNo: 1,
    pageSize: 10,
})
const total = ref(0)
let userCompositeData = ref([])

const getUserCompositeList = async () => {
    loading.value = true
    const res = await userCompositeList({ ...searchForm.value, ...pages.value })
    loading.value = false
    userCompositeData.value = res.data.list
    total.value = res.data.total
}

const tableHandleSizeChange = (e) => {
    pages.value.pageSize = e
}
const tableHandleChange = (e) => {
    pages.value.pageNo = e
    getUserCompositeList()
}
const resetForm = () => {
    searchForm.value = { ...searchParams }
    getUserCompositeList()
}
onMounted(() => {
    getUserCompositeList()
})
</script>
<style lang="scss" scoped>
.pagination{
    margin-top: 20px;
}
.operation{
    color: #4060c7;
    margin: 0px 5px;
}

</style>
