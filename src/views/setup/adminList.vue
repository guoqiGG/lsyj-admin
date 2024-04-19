<template>
    <el-card style="margin-top: 10px;">
        <el-button type="primary" :icon="CirclePlus" class="add" @click="add()">新增</el-button>
        <el-table v-loading="loading" :data="adminListData" style="width: 100%"
            :header-cell-style="{ background: '#f7f8fa', color: '#000' }">
            <el-table-column prop="name" label="名字" align="center" />
            <el-table-column prop="account" label="账号" align="center" />
            <el-table-column prop="ruleName" label="所属角色" align="center" />
            <el-table-column prop="createTime" label="创建时间" align="center" />
            <el-table-column prop="isDeleted" label="状态" align="center" >
                <template #default="scope">
                        <span class="operation"> {{ scope.row.isDeleted === 0 ? '正常' : '禁用' }}</span>
                </template>
            </el-table-column>
            <el-table-column fixed="right" label="操作" width="180" align="center">
                <template #default="scope">
                        <el-switch v-model="scope.row.isDeleted" :active-value="0" :inactive-value="1" @change="switchChange(scope.row)"/>
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
    <!-- 新增 -->
    <!-- roleId  name  account  password -->
    <el-dialog v-model="dialogVisible" :title="isEdit ? '编辑管理员' : '新增管理员'" width="600px" :close="clearEditForm">
        <el-form ref="formRef" :rules="rules" :model="form" class="demo-form-inline" lable-width="100px">
            <el-form-item label="名字" prop="name">
                <el-input v-model="form.name" placeholder="名字" clearable />
            </el-form-item>
            <el-form-item label="账号" prop="account">
                <el-input v-model="form.account" placeholder="账号" clearable />
            </el-form-item>
            <el-form-item label="密码" prop="password">
                <el-input v-model="form.password" placeholder="密码" clearable />
            </el-form-item>
            <el-form-item label="角色" prop="roleId">
                <el-select v-model="form.roleId" placeholder="请选择角色" style="width: 90%" clearable>
                    <el-option v-for="item in roleListData" :key="item.id" :label="item.name" :value="item.id" />
                </el-select>
            </el-form-item>
            <el-form-item class="footer">
                <el-button type="primary" @click="submitForm(formRef)">保存</el-button>
                <el-button @click="dialogVisible = false">关闭</el-button>
            </el-form-item>
        </el-form>
    </el-dialog>
</template>
<script setup>
import { onMounted, ref, reactive } from "vue";
import { adminList, roleList, addAdminList, adminUpdate } from "../../api/modules";
import {
    CirclePlus
} from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus';
import dayjs from "dayjs";
const loading = ref(false)
const pages = ref({
    pageNo: 1,
    pageSize: 10,
})
const total = ref(0)
let adminListData = ref([])
// 列表数据
const getAdminList = async () => {
    loading.value = true
    const res = await adminList({ ...pages.value })
    loading.value = false
    adminListData.value = res.data.list
    total.value = res.data.total
}
// 分页
const tableHandleSizeChange = (e) => {
    pages.value.pageSize = e
    getAdminList()
}
const tableHandleChange = (e) => {
    pages.value.pageNo = e
    getAdminList()
}
let roleListData = ref([])
// 角色数据
const getRoleList = async () => {
    loading.value = true
    const res = await roleList({ ...pages.value })
    roleListData.value = res.data.list
}
// 新增弹框
const dialogVisible = ref(false)
const isEdit = ref(false)
const formRef = ref(null);
const form = ref({
    id: null,
    name: null,
    number: null,
    total: null,
    type: null,
    time: [],
    startDate: null,
    endDate: null
})


const rules = reactive({
    name: [{ required: true, message: '请输入名字', trigger: 'blur' }],
    account: [{ required: true, message: '请输入账号', trigger: 'blur' }],
    password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
    roleId: [{ required: true, message: '请选择角色', trigger: 'blur' }],
})


// 新增按钮
const add = () => {
    dialogVisible.value = true
    isEdit.value = false
    form.value = {}
}
// 修改
const editor = (scope) => {
    isEdit.value = true
    form.value = scope.row
    form.value.time = []
    form.value.type = scope.row.type
    form.value.time[0] = scope.row.startDate
    form.value.time[1] = scope.row.endDate
    dialogVisible.value = true
}
// 新增弹框-保存按钮
const submitForm = () => {
    formRef.value.validate(async (valid) => {
        if (valid) {
            let obj = {
                name: form.value.name,
                account: form.value.account,
                password: form.value.password,
                roleId: form.value.roleId,
                token:localStorage.getItem('token'),
                adminId:localStorage.getItem('UserID')
            }
                const res = await addAdminList(obj)
            if (res.code === 0) {
                dialogVisible.value = false
                getAdminList()
            }
        } else {
            return false;
        }
    });

};

// 禁用
const switchChange = async (item) => {
    const res = await adminUpdate({ id: item.id, token:localStorage.getItem('token'),isDeleted:item.isDeleted,adminId:localStorage.getItem('UserID') })
    if (res.code === 0) {
        ElMessage.success('修改成功');
        getAdminList()
    } else {
        ElMessage.error(res.msg);
        return false;
    }
}

onMounted(() => {
    getAdminList()
    getRoleList()
})


</script>
<style lang="scss" scoped>
.add {
    margin-bottom: 20px;
}

.operation {
    color: #4060c7;
    margin: 0px 5px;
}
.operation2 {
    color: #4060c7;
    margin: 0px 5px;
    cursor: pointer;
}

.pagination {
    margin-top: 20px;
}

.footer {
    margin-left: 80px;
}
</style>
