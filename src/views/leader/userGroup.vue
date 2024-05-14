<template>
    <el-card>
        <el-form :inline="true" :model="searchForm" class="demo-form-inline" label-width="100px">
            <el-row>
                <el-col :lg="6" :md="8" :sm="12">
                    <el-form-item label="团长手机">
                        <el-input v-model="searchForm.userMobile" placeholder="团长手机" clearable />
                    </el-form-item>
                </el-col>
                <el-col :lg="6" :md="8" :sm="12">
                    <el-form-item label="分组名称">
                        <el-select v-model="searchForm.groupId" filterable placeholder="请选择分组" style="width: 90%"
                            clearable>
                            <el-option v-for="item in leaderGroupListData" :key="item.id" :label="item.name"
                                :value="item.id" />
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-form-item>
                    <el-button type="primary" @click="getLeaderUserGroupList">查询</el-button>
                    <el-button @click="resetForm()">重置</el-button>
                </el-form-item>
            </el-row>
        </el-form>

    </el-card>
    <el-card style="margin-top: 10px;">
        <el-button tag="div" :icon="CirclePlus" type="primary" @click="openDialog('add')">团长添加分组</el-button>
        <el-table v-loading="loading" :data="leaderUserGroupListData" style="width: 100%;margin-top: 10px;"
            :header-cell-style="{ background: '#f7f8fa', color: '#000' }">
            <el-table-column prop="id" label="ID" align="center" />
            <el-table-column prop="leaderName" label="团长" align="center" />
            <el-table-column prop="userMobile" label="手机号" align="center" />
            <el-table-column prop="groupName" label="所属分组" align="center" />
            <el-table-column prop="commissionRate" label="分佣比例" align="center" />
            <el-table-column prop="createTime" label="创建时间" align="center" />
            <el-table-column prop="updateTime" label="更新时间" align="center" />
            <el-table-column fixed="right" label="操作" width="200" align="center">
                <template #default="scope">
                    <span class="operation" @click="openDialog('edit', scope)">编辑</span>
                    <el-popconfirm confirm-button-text="确定" cancel-button-text="取消" cancel-button-type="info"
                        icon-color="#626AEF" title="确定要删除吗?" @confirm="deleteById(scope)" @cancel="cancelEvent">
                        <template #reference>
                            <span class="operation">删除</span>
                        </template>
                    </el-popconfirm>
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
    <!-- 添加分组 -->
    <el-dialog v-model="dialogVisible" :title="isCreate ? '团长添加分组' : '编辑团长分组'" width="400px" @close="closeDialog">
        <el-form ref="leaderUserGroupFormRef" :rules="rules" :model="leaderUserGroupForm" class="demo-form-inline"
            label-width="100px" :label-position="right">
            <el-form-item label="所属团长" prop="userId">
                <el-select v-model="leaderUserGroupForm.userId" filterable placeholder="请选择团长" style="width: 90%"
                    clearable :disabled="isCreate ? false : true">
                    <el-option v-for="item in leaderListData" :key="item.puid"
                        :label="item.leaderName + '-' + item.leaderMobile" :value="item.puid" />
                </el-select>
            </el-form-item>
            <el-form-item label="分组" prop="groupId">
                <el-select v-model="leaderUserGroupForm.groupId" filterable placeholder="请选择分组" style="width: 90%"
                    clearable>
                    <el-option v-for="item in leaderGroupListData" :key="item.id" :label="item.name" :value="item.id" />
                </el-select>
            </el-form-item>
            <el-form-item class="footer">
                <el-button type="primary" @click="save">保存</el-button>
                <el-button @click="closeDialog">关闭</el-button>
            </el-form-item>
        </el-form>
    </el-dialog>
</template>
<script setup>
import { onMounted, ref, reactive } from "vue";
import { leaderUserGroupList, addLeaderUserGroup, updateLeaderUserGroup, leaderList, leaderGroupList } from "../../api/modules";
import { ElMessage } from "element-plus";
const searchParams = {
    userMobile: null,
    groupId: null
}
const searchForm = ref({ ...searchParams })
const pages = ref({
    pageNo: 1,
    pageSize: 10,
})
const total = ref(0)
const loading = ref(false)
let leaderUserGroupListData = ref([])
const getLeaderUserGroupList = async () => {
    loading.value = true
    const res = await leaderUserGroupList({ ...searchForm.value, ...pages.value })
    loading.value = false
    leaderUserGroupListData.value = res.data.list
    total.value = res.data.total
}

const tableHandleSizeChange = (e) => {
    pages.value.pageSize = e
    getLeaderUserGroupList()
}
const tableHandleChange = (e) => {
    pages.value.pageNo = e
    getLeaderUserGroupList()
}
const resetForm = () => {
    searchForm.value = { ...searchParams }
    getLeaderUserGroupList()
}
const isCreate = ref(false)
const dialogVisible = ref(false)
const leaderUserGroupFormRef = ref(null)
const leaderUserGroupForm = ref({
    id: null,
    userId: null,
    groupId: null,
})
const rules = reactive({
    userId: [
        { required: true, message: '请选择团长', trigger: 'blur' },
    ],
    groupId: [
        { required: true, message: '请选择分组', trigger: 'blur' },
    ],
})


const openDialog = (edit, scope) => {
    edit == 'add' ? isCreate.value = true : isCreate.value = false
    if (scope) {
        leaderUserGroupForm.value.id = scope.row.id
        leaderUserGroupForm.value.userId = scope.row.userId
        leaderUserGroupForm.value.groupId = scope.row.groupId
    }
    dialogVisible.value = true
    getLeaderList()

}

const closeDialog = () => {
    clearForm()
    dialogVisible.value = false
}

const clearForm = () => {
    leaderUserGroupForm.value.id = null
    leaderUserGroupForm.value.userId = null
    leaderUserGroupForm.value.groupId = null
}

const save = () => {
    leaderUserGroupFormRef.value.validate(async (valid) => {
        if (valid) {
            try {

                if (isCreate.value) {//新增
                    const res = await addLeaderUserGroup({ userId: leaderUserGroupForm.value.userId, groupId: leaderUserGroupForm.value.groupId })
                    if (res?.code === 0) {
                        ElMessage({
                            showClose: false,
                            message: '团长添加分组成功',
                            type: 'success',
                        })
                        closeDialog()
                        getLeaderUserGroupList()
                    }
                } else {
                    const res = await updateLeaderUserGroup({ id: leaderUserGroupForm.value.id, userId: leaderUserGroupForm.value.userId, groupId: leaderUserGroupForm.value.groupId, isDeleted: 0 })
                    if (res?.code === 0) {
                        ElMessage({
                            showClose: false,
                            message: '团长编辑分组成功',
                            type: 'success',
                        })
                        closeDialog()
                        getLeaderUserGroupList()
                    }

                }
            } catch (error) {

            }
        } else {
            return false
        }
    })
}
const deleteById = async (scope) => {
    console.log(scope.row)
    const res = await updateLeaderUserGroup(Object.assign({ ...scope.row }, { isDeleted: 1 }))
    if (res?.code === 0) {
        ElMessage({
            showClose: false,
            message: '删除成功',
            type: 'success',
        })
        getLeaderUserGroupList()
    }
}

const leaderListData = ref([])
// 团长列表
const getLeaderList = async () => {
    const res = await leaderList({ pageNo: 1, pageSize: 1000000 })
    leaderListData.value = res.data.list
}
const leaderGroupListData = ref([])
// 团长列表
const getLeaderGroupList = async () => {
    const res = await leaderGroupList({ pageNo: 1, pageSize: 1000000 })
    leaderGroupListData.value = res.data.list
}

onMounted(() => {
    getLeaderUserGroupList()
    getLeaderGroupList()
})
</script>
<style lang="scss" scoped>
.el-image {
    border-radius: 50%;
    width: 60px;
    height: 60px;
}

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
.pagination {
    margin-top: 20px;
}

.operation {
    color: #4060c7;
    margin: 0px 5px;
    cursor: pointer;
}
</style>