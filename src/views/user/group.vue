<template>
    <el-card>
        <el-button tag="div" :icon="CirclePlus" type="primary" @click="openDialog('add')">新增分组</el-button>
        <el-table v-loading="loading" :data="groupListData" style="width: 100%;margin-top: 10px;"
            :header-cell-style="{ background: '#f7f8fa', color: '#000' }">
            <el-table-column prop="id" label="ID" align="center" />
            <el-table-column prop="name" label="分组名称" align="center" />
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
                    <span class="operation" @click="openSendDialog(scope)">送优惠券</span>
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
    <el-dialog v-model="dialogVisible" :title="isCreate ? '新增分组' : '编辑分组'" width="400px" @close="closeDialog">
        <el-form ref="groupFormRef" :rules="rules" :model="groupForm" class="demo-form-inline" label-width="100px"
            :label-position="right">
            <el-form-item label="分组名称" prop="name">
                <el-input v-model="groupForm.name" placeholder="分组名称" clearable style="width: 200px;" />
            </el-form-item>
            <el-form-item class="footer">
                <el-button type="primary" @click="save">保存</el-button>
                <el-button @click="closeDialog">关闭</el-button>
            </el-form-item>
        </el-form>
    </el-dialog>

    <!-- 分组送优惠券 -->
    <el-dialog v-model="sendDialogVisible" title="分组送优惠券" width="400px" @close="closeSendDialog">
        <el-form ref="sendCouponFormRef" :rules="sendCouponRules" :model="sendCouponForm" class="demo-form-inline"
            label-width="100px" :label-position="right">
            <el-form-item label="优惠券" prop="couponId">
                <el-select v-model="sendCouponForm.couponId" filterable placeholder="优惠券" clearable
                    style="width: 250px;">
                    <el-option v-for="item in couponListData" :key="item.id" :label="item.name" :value="item.id" />
                </el-select>
            </el-form-item>
            <el-form-item label="赠送数量" prop="num">
                <el-input-number controls-position="right" v-model="sendCouponForm.num" placeholder="赠送数量" min="0"
                    clearable style="width: 250px;" />
            </el-form-item>

            <el-form-item class="footer">
                <el-button type="primary" @click="sendCouponSave">保存</el-button>
                <el-button @click="closeSendDialog">关闭</el-button>
            </el-form-item>
        </el-form>
    </el-dialog>
</template>
<script setup>
import { onMounted, ref, reactive } from "vue";
import { groupList, addGroup, editGroup, couponList, groupSendCoupon } from "../../api/modules";
import { ElMessage } from "element-plus";
const pages = ref({
    pageNo: 1,
    pageSize: 10,
})
const total = ref(0)
const loading = ref(false)
let groupListData = ref([])
const getGroupList = async () => {
    loading.value = true
    const res = await groupList({ ...pages.value })
    loading.value = false
    groupListData.value = res.data.list
    total.value = res.data.total
}

const tableHandleSizeChange = (e) => {
    pages.value.pageSize = e
    getGroupList()
}
const tableHandleChange = (e) => {
    pages.value.pageNo = e
    getGroupList()
}
const isCreate = ref(false)
const dialogVisible = ref(false)
const groupFormRef = ref(null)
const groupForm = ref({
    id: null,
    name: null
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
        groupForm.value.name = scope.row.name
    }
    dialogVisible.value = true
}

const closeDialog = () => {
    clearForm()
    dialogVisible.value = false
}

const clearForm = () => {
    groupForm.value.id = null
    groupForm.value.name = null
}

const save = () => {
    groupFormRef.value.validate(async (valid) => {
        if (valid) {
            try {

                if (isCreate.value) {//新增
                    const res = await addGroup({ name: groupForm.value.name })
                    if (res?.code === 0) {
                        ElMessage({
                            showClose: false,
                            message: '新增分组成功',
                            type: 'success',
                        })
                        closeDialog()
                        getGroupList()
                    }
                } else {
                    const res = await editGroup({ id: groupForm.value.id, name: groupForm.value.name })
                    if (res?.code === 0) {
                        ElMessage({
                            showClose: false,
                            message: '编辑分组成功',
                            type: 'success',
                        })
                        closeDialog()
                        getGroupList()
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
    const res = await editGroup({ id: scope.row.id, name: scope.row.name, isDeleted: 1 })
    if (res?.code === 0) {
        ElMessage({
            showClose: false,
            message: '删除成功',
            type: 'success',
        })
        getGroupList()
    }
}
const sendDialogVisible = ref(false)
const sendCouponFormRef = ref(null)
const sendCouponForm = ref({
    groupId: null,
    couponId: null,
    num: null,
})


const sendCouponRules = reactive({
    couponId: [
        { required: true, message: '请选择优惠券', trigger: 'blur' },
    ],
    num: [
        { required: true, message: '数量不能为空', trigger: 'blur' },
    ],
})
const couponListData = ref([])

const getCouponList = async () => {
    const res = await couponList({ pageNo: 1, pageSize: 1000000 })
    couponListData.value = res.data.list
}
const openSendDialog = (scope) => {
    sendDialogVisible.value = true
    sendCouponForm.value.groupId = scope.row.id
    getCouponList()
}

const sendCouponSave = () => {
    sendCouponFormRef.value.validate(async (valid) => {
        if (valid) {
            try {
                const res = await groupSendCoupon({ ...sendCouponForm.value, adminId: localStorage.getItem('UserID') })
                if (res?.code === 0) {
                    ElMessage({
                        showClose: false,
                        message: '赠送成功',
                        type: 'success',
                    })
                    closeSendDialog()
                }
            } catch (error) {

            }
        } else {
            return false
        }
    })
}

const closeSendDialog = () => {
    sendDialogVisible.value = false
    clearSendCouponForm()
}
const clearSendCouponForm = () => {
    sendCouponForm.value.groupId = null
    sendCouponForm.value.couponId = null
    sendCouponForm.value.num = null
}
onMounted(() => {
    getGroupList()
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