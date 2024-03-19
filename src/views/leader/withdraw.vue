<template>

    <el-card>

        <el-form :inline="true" :model="searchForm" class="demo-form-inline" lable-width="100px">
            <el-row>
                <el-col :span="6">
                    <el-form-item label="团长姓名">
                        <el-input v-model="searchForm.leaderName" placeholder="团长姓名" clearable />
                    </el-form-item>
                </el-col>
                <el-col :span="6">
                    <el-form-item label="团长号码">
                        <el-input v-model="searchForm.leaderMobile" placeholder="团长号码" clearable />
                    </el-form-item>
                </el-col>
                <el-col :span="6">
                    <el-form-item label="申请状态">
                        <el-select style="width:92%" v-model="searchForm.status" placeholder="请选择" clearable>
                            <el-option label="待审核" value="0" />
                            <el-option label="已同意" value="1" />
                            <el-option label="已拒绝" value="2" />
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="6">
                    <el-form-item label="申请备注">
                        <el-input v-model="searchForm.remark" placeholder="申请备注" clearable />
                    </el-form-item>
                </el-col>
                <!-- <el-form-item label="时间">
                    <el-date-picker v-model="searchForm.time" type="datetimerange" range-separator="-"
                        start-placeholder="开始时间" end-placeholder="结束时间" />
                </el-form-item> -->
                <el-form-item>
                    <el-button type="primary" @click="getLeaderWithdrawList">查询</el-button>
                    <el-button @click="resetForm()">重置</el-button>
                </el-form-item>
            </el-row>
        </el-form>

    </el-card>
    <el-card style="margin-top: 10px;">
        <el-table v-loading="loading" :data="leaderWithdrawListData" style="width: 100%">
            <el-table-column prop="leaderName" label="团长姓名" />
            <el-table-column prop="leaderMobile" label="团长手机" />
            <el-table-column prop="withrawingAmt" label="申请金额" />
            <el-table-column prop="remark" label="申请备注" />
            <el-table-column prop="deductAmt" label="同意后扣除的金额" />
            <el-table-column prop="createTime" label="申请时间" />
            <el-table-column label="审核状态">
                <template #default="scope">
                    <el-tag v-if="scope.row.status == 0" type="info">待审核</el-tag>
                    <el-tag v-if="scope.row.status == 1" type="success">同意</el-tag>
                    <el-tag v-if="scope.row.status == 2" type="danger">拒绝</el-tag>
                </template>
            </el-table-column>
            <el-table-column prop="examineRemarks" label="审批备注" />
            <el-table-column fixed="right" label="操作" width="120" align="center">
                <template #default="scope">
                    <span v-if="scope.row.status == 0" class="operation" @click="openLeaderWithdrawApproveDialog(scope)">审批</span>
                </template>
            </el-table-column>
        </el-table>
        <div class="pagination">
            <el-pagination background layout="total, sizes, prev, pager, next, jumper"
                v-model:page-size="pages.pageSize" v-model:current-page="pages.current"
                :page-sizes="[10, 20, 50, 100, 200, 500]" :total="pages.total" @size-change="tableHandleSizeChange"
                @current-change="tableHandleChange" />
        </div>
    </el-card>

    <el-dialog v-model="leaderWithdrawApprovalDialogVisible" title="团长提现审批" width="600px" @close="clearEditForm">
        <el-form ref="leaderFormRef" :model="leaderForm" class="demo-form-inline" lable-width="100px" :rules="rules">
            <div class="applyInfo">
                <div class="leaderInfo">
                    <div>团长：小王</div>
                    <div>手机：18437930709</div>
                </div>
                <div style="color: red;">申请金额：10</div>
                <div style="color: blue;">申请备注：审核暗杀是多久啊回家</div>
            </div>
            <el-form-item label="审批状态" prop="status">
                <el-radio-group v-model="leaderForm.status" @change="change">
                    <el-radio border :label="1">同意</el-radio>
                    <el-radio border :label="2">拒绝</el-radio>
                </el-radio-group>
            </el-form-item>

            <el-form-item label="扣除金额" prop="deductAmt">
                <el-input-number v-model="leaderForm.deductAmt" placeholder="扣除金额" controls-position="right"
                    clearable />
            </el-form-item>

            <el-form-item label="申请备注">
                <el-input v-model="leaderForm.examineRemarks" style="width: 100%" :autosize="{ minRows: 4, maxRows: 4 }"
                    type="textarea" placeholder="审批备注" />
            </el-form-item>

            <el-form-item class="footer">
                <el-button type="primary" @click="save">保存</el-button>
                <el-button @click="closeLeaderWithdrawApproveDialog">关闭</el-button>
            </el-form-item>

        </el-form>
    </el-dialog>
</template>
<script setup>
import { onMounted, reactive, ref, watch } from "vue";
import { leaderWithdrawList, leaderWithdrawApproval } from "../../api/modules";
import dayjs from "dayjs";
const searchParams = {
    leaderName: '',
    leaderMobile: '',
    remark: '',
    status: '',
    // startDate: '',
    // endDate: '',
    // time: ''
}

const loading = ref(false)
const searchForm = ref({ ...searchParams })
const pages = ref({
    pageNo: 1,
    pageSize: 20,
    total: 0
})
let leaderWithdrawListData = ref([])

const leaderWithdrawApprovalDialogVisible = ref(false)

const leaderFormRef = ref()

const leaderForm = ref({
    id: 0,
    status: '',
    deductAmt: '',
    examineRemarks: '',
})


const rules = reactive({
    status: [
        { required: true, message: '请选择同意或拒绝', trigger: 'blur' },
    ]
})

const getLeaderWithdrawList = async () => {
    loading.value = true
    const res = await leaderWithdrawList({ ...searchForm.value, ...pages.value })
    loading.value = false
    leaderWithdrawListData.value = res.data.list
    pages.value.total = res.data.total
}

const tableHandleSizeChange = (e) => {
    pages.value.pageSize = e
}
const tableHandleChange = (e) => {
    pages.value.pageNo = e
    getLeaderWithdrawList()
}
const resetForm = () => {
    searchForm.value = { ...searchParams }
}

const closeLeaderWithdrawApproveDialog = () => {
    leaderWithdrawApprovalDialogVisible.value = false
    clearEditForm()
}
const openLeaderWithdrawApproveDialog = (scope) => {
    leaderWithdrawApprovalDialogVisible.value = true
    leaderForm.value.id = scope.row.id
    leaderForm.value.status = scope.row.status
    leaderForm.value.deductAmt = scope.row.deductAmt
    leaderForm.value.examineRemarks = scope.row.examineRemarks
}

const save = () => {
    leaderFormRef.value.validate(async (valid) => {
        if (valid) {
            const res = await leaderWithdrawApproval({ ...leaderForm.value })
            if (res.code === 0) {
                closeLeaderWithdrawApproveDialog()
                getLeaderWithdrawList()
            }
        } else {
            return false
        }
    })

}

// 清空修改团长信息表单
const clearEditForm = () => {
    leaderForm.value = {
        id: 0,
        status: '',
        deductAmt: '',
        examineRemarks: ''
    }
}

onMounted(() => {
    getLeaderWithdrawList()
})

// watch(searchForm.value, (newValue, oldValue) => {
//     searchForm.value.startDate = dayjs(newValue.time[0]).format('YYYY-MM-DD')
//     searchForm.value.endDate = dayjs(newValue.time[1]).format('YYYY-MM-DD')
// }
//     , { deep: true })
</script>
<style lang="scss" scoped>
.applyInfo{
    font-size: 16px;
    color: #010101;
}

.applyInfo>div {
    margin-bottom: 15px;
}

.applyInfo {
    margin-bottom: 40px;

    .leaderInfo {
        display: flex;
        flex-direction: row;
        align-items: center;

        div {
            flex: 1;
        }
    }
}

.footer {
    padding-left: 70px;
}

::deep(.el-dialog__header){
    text-align: center;
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