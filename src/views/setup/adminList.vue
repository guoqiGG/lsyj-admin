<template>
    <el-card style="margin-top: 10px;">
        <el-button type="primary" :icon="CirclePlus" class="add" @click="add()">新增</el-button>
        <el-table v-loading="loading" :data="adminListData" style="width: 100%"
        :header-cell-style="{ background: '#f7f8fa', color: '#000' }">
            <el-table-column prop="name" label="名字" align="center" />
            <el-table-column prop="account" label="账号" align="center" />
            <el-table-column prop="ruleName" label="所属角色" align="center" />
            <el-table-column prop="createTime" label="创建时间" align="center" />
            
            <!-- <el-table-column fixed="right" label="操作" width="180" align="center">
                <template #default="scope">
                    <span class="operation" @click="editor(scope)">修改</span>
                    <el-popconfirm confirm-button-text="确定" cancel-button-text="取消" cancel-button-type="info"
                        icon-color="#626AEF" title="确定要删除吗?" @confirm="handleDel(scope.row)" @cancel="cancelEvent">
                        <template #reference>
                            <span class="operation">删除</span>
                        </template>
                    </el-popconfirm>
                </template>
            </el-table-column> -->
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
    <el-dialog v-model="dialogVisible" :title="isEdit ? '编辑管理员' : '新增管理员'" width="600px" :close="clearEditForm" >
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
                            <el-option v-for="item in roleListData" :key="item.id" :label="item.name"
                                :value="item.id" />
                        </el-select>
                    </el-form-item>
            <el-form-item class="footer">
                <el-button type="primary" @click="submitForm(formRef)">保存</el-button>
                <el-button @click="dialogVisible=false">关闭</el-button>
            </el-form-item>
        </el-form>
    </el-dialog>
</template>
<script setup>
import { onMounted, ref, reactive } from "vue";
import { adminList,roleList,addAdminList,  giftUpdate } from "../../api/modules";
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
    const res = await adminList({  ...pages.value })
    loading.value = false
    console.log(res,'res=========res')
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
    const res = await roleList({  ...pages.value })
    console.log(res,'res====角色数据=====res')
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
    endDate:null
})

var validateTotal = (rule, value, callback) => {
    if (form.value.total&&form.value.number>form.value.total) {
        callback(new Error('礼品卡总数小于限制数量'))
    } else {
        callback()
    }
}
var validateTime = (rule, value, callback) => {
    if (Date.parse(form.value.startDate) == Date.parse(form.value.endDate)) {
        callback(new Error('开始时间不能等于结束时间'))
    } else {
        callback()
    }
}

const rules = reactive({
    name: [{ required: true, message: '请输入名字', trigger: 'blur' }],
    account: [{ required: true, message: '请输入账号', trigger: 'blur' }],
    password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
    roleId: [{ required: true, message: '请选择角色', trigger: 'blur' }],
})

const timeChange = (e) => {
    form.value.startDate = e[0]
    form.value.endDate = e[1]
}
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
    console.log(scope.row.type, form.value)
    dialogVisible.value = true
}
// 新增弹框-保存按钮
const submitForm = () => {
    formRef.value.validate(async (valid) => {
        if (valid) {
            const res = ref()
            let obj = {
                name: form.value.name,
                account: form.value.account,
                password: form.value.password,
                roleId: form.value.roleId,
            }
            // 修改
            if (form.value.id) {
                res.value = await giftUpdate(JSON.stringify(obj))
            } else {
                // 新增
                res.value = await addAdminList(obj)
            }
            if (res.value.code === 0) {
                dialogVisible.value = false
                getAdminList()
            }
        } else {
            return false;
        }
    });

};



// 删除
const handleDel = async (item) => {
    const res = await giftUpdate({ id: item.id, isDeleted: 1 })
    if (res.code === 0) {
        ElMessage.success('删除成功');
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
    cursor: pointer;
}

.pagination {
    margin-top: 20px;
}

.footer {
    margin-left: 80px;
}
</style>
