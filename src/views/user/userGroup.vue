<template>
    <el-card>
        <el-form :inline="true" :model="searchForm" class="demo-form-inline" label-width="100px">
            <el-row>
                <el-col :lg="6" :md="8" :sm="12">
                    <el-form-item label="团长">
                        <el-select v-model="searchForm.pUid" filterable placeholder="团长" clearable
                            style="width: 250px;">
                            <el-option v-for="item in leaderListData" :key="item.id" :label="item.leaderName"
                                :value="item.puid" />
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :lg="6" :md="8" :sm="12">
                    <el-form-item>
                        <el-button type="primary" @click="getUserGrouplList">查询</el-button>
                        <el-button @click="resetForm()">重置</el-button>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-form-item>
                    <el-upload style="margin: 0px 20px 0px 0px;" v-model:file-list="fileList" class="upload-demo"
                        :show-file-list="false" :action="BaseUrl + '/upload/user/group'"
                        :headers="{ Authorization: token }" :multiple="false" :on-success="handleSuccess"
                        :on-error="handleError">
                        <el-button :icon="Upload" type="primary">批量上传添加用户分组</el-button>
                    </el-upload>
                    <el-button :icon="Download" @click="hamdleDownload('send')">下载批量添加用户分组模板</el-button>
                </el-form-item>
            </el-row>
        </el-form>
    </el-card>
    <el-card style="margin-top: 10px;">
        <el-button tag="div" :icon="CirclePlus" type="primary" @click="openDialog('add')">新增分组</el-button>
        <el-table v-loading="loading" :data="userGroupListData" style="width: 100%;margin-top: 10px;"
            :header-cell-style="{ background: '#f7f8fa', color: '#000' }">
            <el-table-column prop="id" label="ID" align="center" />
            <el-table-column prop="userName" label="用户昵称" align="center" />
            <el-table-column prop="userMobile" label="用户手机" align="center" />
            <el-table-column prop="leaderName" label="团长" align="center" />
            <el-table-column prop="groupName" label="所属分组" align="center" />
            <el-table-column prop="createTime" label="创建时间" align="center" />
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
    <el-dialog v-model="dialogVisible" :title="isCreate ? '新增分组用户' : '编辑分组用户'" width="450px" @close="closeDialog">
        <el-form ref="groupFormRef" :rules="rules" :model="groupForm" class="demo-form-inline" label-width="100px"
            :label-position="right">
            <el-form-item label="用户" prop="userId">
                <el-select v-model="groupForm.userId" filterable remote reserve-keyword placeholder="请输入用户昵称搜索"
                    remote-show-suffix :remote-method="getUserListByName" clearable style="width: 250px;"
                    @change="userIdChange" :disabled="isCreate == false">
                    <el-option v-for="item in userListData" :key="item.id" :label="item.name + '-' + item.mobile"
                        :value="item.id" />
                </el-select>
            </el-form-item>
            <el-form-item label="分组" prop="groupId">
                <el-select v-model="groupForm.groupId" filterable placeholder="请选择分组" clearable style="width: 250px;">
                    <el-option v-for="item in groupListData" :key="item.id" :label="item.name" :value="item.id" />
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
import { userGroupList, addUserGroup, editUserGroup, userList, groupList, leaderList } from "../../api/modules";
import { ElMessage } from "element-plus";
import {
    Download, Upload
} from '@element-plus/icons-vue'
const BaseUrl = import.meta.env.VITE_API_BASE_URL
const token = localStorage.getItem('token')
const searchParams = {
    pUid: null,
}
const searchForm = ref({ ...searchParams })
const pages = ref({
    pageNo: 1,
    pageSize: 10,
})

const total = ref(0)
const loading = ref(false)
let userGroupListData = ref([])
const getUserGrouplList = async () => {
    loading.value = true
    const res = await userGroupList({ ...searchForm.value, ...pages.value })
    loading.value = false
    userGroupListData.value = res.data.list
    total.value = res.data.total
}

const tableHandleSizeChange = (e) => {
    pages.value.pageSize = e
    getUserGrouplList()
}
const tableHandleChange = (e) => {
    pages.value.pageNo = e
    getUserGrouplList()
}
const resetForm = () => {
    searchForm.value = { ...searchParams }
    getUserGrouplList()
}

const userListData = ref([])

const getUserList = async () => {
    const res = await userList({ pageNo: 1, pageSize: 100 })
    userListData.value = res.data.list
}

const getUserListByName = async (query) => {
    const res = await userList({ name: query, pageNo: 1, pageSize: 1000 })
    userListData.value = res.data.list
}
const getUserListById = async (id) => {
    const res = await userList({ id: id, pageNo: 1, pageSize: 1 })
    userListData.value = res.data.list
}
const groupListData = ref([])
const getGroupList = async () => {
    const res = await groupList({ pageNo: 1, pageSize: 1000000 })
    groupListData.value = res.data.list
}

const leaderListData = ref([])
const getLeaderList = async () => {
    const res = await leaderList({ pageNo: 1, pageSize: 1000000 })
    leaderListData.value = res.data.list
}
const isCreate = ref(false)
const dialogVisible = ref(false)
const groupFormRef = ref(null)
const groupForm = ref({
    id: null,
    userId: null,
    groupId: null,
})

const rules = reactive({
    name: [
        { required: true, message: '分组名称不能为空', trigger: 'blur' },
    ]
})

const openDialog = (edit, scope) => {
    edit == 'add' ? isCreate.value = true : isCreate.value = false
    if (scope) {
        groupForm.value.id = scope.row.id
        groupForm.value.userId = scope.row.userId
        groupForm.value.groupId = scope.row.groupId
        getUserListById(scope.row.userId)
    } else {
        getUserList()
    }
    dialogVisible.value = true
    getGroupList()
}

const closeDialog = () => {
    clearForm()
    dialogVisible.value = false
}

const clearForm = () => {
    groupForm.value.id = null
    groupForm.value.userId = null
    groupForm.value.groupId = null
}

const userIdChange = (e) => {
    if (!e && isCreate.value == false) {
        getUserList()
    }
}
const save = () => {
    groupFormRef.value.validate(async (valid) => {
        if (valid) {
            try {

                if (isCreate.value) {//新增
                    const res = await addUserGroup({ userId: groupForm.value.userId, groupId: groupForm.value.groupId })
                    if (res?.code === 0) {
                        ElMessage({
                            showClose: false,
                            message: '新增分组成功',
                            type: 'success',
                        })
                        closeDialog()
                        getUserGrouplList()
                    }
                } else {
                    const res = await editUserGroup({ id: groupForm.value.id, userId: groupForm.value.userId, groupId: groupForm.value.groupId })
                    if (res?.code === 0) {
                        ElMessage({
                            showClose: false,
                            message: '编辑分组成功',
                            type: 'success',
                        })
                        closeDialog()
                        getUserGrouplList()
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
    const res = await editUserGroup({ id: scope.row.id, userId: scope.row.userId, groupId: scope.row.groupId, isDeleted: 1 })
    if (res?.code === 0) {
        ElMessage({
            showClose: false,
            message: '删除成功',
            type: 'success',
        })
        getUserGrouplList()
    }
}

// 下载模板
const hamdleDownload = () => {
    let url = 'https://qingchuntai2.oss-cn-beijing.aliyuncs.com/2024/05/07/upload.xlsx'
    window.location.href = url
}

// 批量添加用户分组
const handleSuccess = (response, file, fileList) => {
    if (response.code === 0) {
        ElMessage.success('上传成功');
    } else {
        ElMessage.error(response.msg);
    }
    getUserGrouplList()

}
const handleError = (err, file, fileList) => {
    ElMessage.error('上传失败');
}


onMounted(() => {
    getUserGrouplList()
    getLeaderList()
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