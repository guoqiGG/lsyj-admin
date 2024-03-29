<template>
    <el-card>
        <el-form :inline="true" :model="searchForm" class="demo-form-inline" lable-width="100px">
            <el-row>
                <el-col :lg="6" :md="8" :sm="12">
                    <el-form-item label="用户名称">
                        <el-input v-model="searchForm.name" placeholder="请输入" clearable />
                    </el-form-item>
                </el-col>
                <el-col :lg="6" :md="8" :sm="12">
                    <el-form-item label="用户手机号">
                        <el-input v-model="searchForm.mobile" placeholder="请输入" clearable />
                    </el-form-item>
                </el-col>
                <el-col :lg="6" :md="8" :sm="12">
                    <el-form-item label="礼品卡名称">
                        <el-input v-model="searchForm.giftName" placeholder="请输入" clearable />
                    </el-form-item>
                </el-col>
                <el-col :lg="6" :md="8" :sm="12">
                    <el-form-item label="礼品卡状态">
                        <el-select style="width:92%" v-model="searchForm.status" placeholder="请选择" clearable>
                            <el-option label="未合成" value="0" />
                            <el-option label="已合成" value="1" />
                            <el-option label="已过期" value="2" />
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :lg="6" :md="8" :sm="12">
                    <el-form-item label="礼品卡来源">
                        <el-select style="width:92%" v-model="searchForm.type" placeholder="请选择" clearable>
                            <el-option label="系统发放 " value="0" />
                            <el-option label="后台赠送" value="1" />
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-form-item>
                    <el-button type="primary" @click="getUserGiftList">查询</el-button>
                    <el-button @click="resetForm()">重置</el-button>
                </el-form-item>
            </el-row>
        </el-form>

    </el-card>
    <el-card style="margin-top: 10px;">
        <el-button  :icon="Download" style="margin-bottom: 20px"  >导出</el-button>
        <el-table v-loading="loading" :data="userGiftListData" style="width: 100%"  :header-cell-style="{ background: '#eef1f6', color: '#606266' }">
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
                v-model:page-size="pages.pageSize" v-model:current-page="pages.pageNo"
                :page-sizes="[10, 20, 50, 100, 200, 500]" :total="total" @size-change="tableHandleSizeChange"
                @current-change="tableHandleChange" />
        </div>
    </el-card>
</template>
<script setup>
import { onMounted, ref } from "vue";
import { userGiftList} from "../../api/modules";
import {
   Download
} from '@element-plus/icons-vue'
const searchParams = {
    name: null,//用户名称
    mobile: null,
    // userId:null,
    status:null,//0未合成 1已合成 2已过期
    type:null,//0系统发放 1 后台赠送的
    giftName:null,//礼品卡名称

}
const loading = ref(false)
const searchForm = ref({ ...searchParams })
const pages = ref({
    pageNo: 1,
    pageSize: 10,
})
const total = ref(0)
let userGiftListData = ref([])

const getUserGiftList = async () => {
    loading.value = true
    const res = await userGiftList({ ...searchForm.value, ...pages.value })
    loading.value = false
    userGiftListData.value = res.data.list
    total.value = res.data.total
}

const tableHandleSizeChange = (e) => {
    pages.value.pageSize = e
}
const tableHandleChange = (e) => {
    pages.value.pageNo = e
    getUserGiftList()
}
const resetForm = () => {
    searchForm.value = { ...searchParams }
    getUserGiftList()
}
onMounted(() => {
    getUserGiftList()
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
