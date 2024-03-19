<template>
    <el-card>
        <el-form :inline="true" :model="searchForm" class="demo-form-inline" lable-width="100px">
            <el-row>
                <el-col :span="6">
                    <el-form-item label="礼品卡名">
                        <el-input v-model="searchForm.name" placeholder="礼品卡名" clearable />
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
        <el-button type="primary" :icon="CirclePlus" class="add" @click="add()">新增</el-button>
        <el-table v-loading="loading" :data="giftListData" style="width: 100%"
            :header-cell-style="{ background: '#eef1f6', color: '#606266' }">
            <el-table-column prop="name" label="礼品卡名" align="center" />
            <el-table-column prop="total" label="礼品卡类型" align="center">
                <template #default="scope">
                    {{ scope.row.type == 0 ? '普通' : scope.row.type == 1 ?
            "全能卡" : scope.row.type == 2 ?
                "团长卡" :
                '' }}
                </template>
            </el-table-column>
            <el-table-column prop="number" label="限制数量" align="center" />
            <el-table-column prop="total" label="礼品卡总数" align="center" />
            <el-table-column prop="startDate" label="开始时间" align="center" />
            <el-table-column prop="endDate" label="结束时间" align="center" />
            <el-table-column fixed="right" label="操作" width="180" align="center">
                <template #default="scope">
                    <span class="operation" @click="handleClick(scope.row)">修改</span>
                    <span class="operation" @click="handleDel(scope.row)">删除</span>
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
    <!-- 新增 -->
    <el-dialog v-model="dialogVisible" title="新增礼品卡" width="600px">
        <el-form ref="formRef" :model="form" :rules="rules" class="demo-form-inline" lable-width="100px">
            <el-form-item label="礼品卡名" prop="name">
                <el-input v-model="form.name" placeholder="礼品卡名" clearable />
            </el-form-item>
            <el-form-item label="限制数量" prop="number">
                <el-input type="number" v-model.number="form.number" placeholder="限制数量" clearable />
            </el-form-item>
            <el-form-item label="卡总数量" prop="total">
                <el-input type="number" v-model.number="form.total" placeholder="卡总数量" clearable />
            </el-form-item>
            <el-form-item label="生效时间" prop="time">
                <el-date-picker v-model="form.time" type="datetimerange" start-placeholder="开始时间" end-placeholder="结束时间"
                    format="YYYY-MM-DD HH:mm:ss" date-format="YYYY/MM/DD ddd" time-format="A hh:mm:ss"
                    value-format="YYYY-MM-DD h:m:s" />
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="submitForm(formRef)">保存</el-button>
                <el-button @click="closEditLeaderDialog">关闭</el-button>
            </el-form-item>
        </el-form>
    </el-dialog>
</template>
<script setup>
import { onMounted, ref, reactive } from "vue";
import { giftList, giftAdd, giftUpdate } from "../../api/modules";
import {
    CirclePlus
} from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus';
import dayjs from "dayjs";

const searchParams = {
    name: null,//名称
}
const loading = ref(false)
const searchForm = ref({ ...searchParams })
const pages = ref({
    pageNo: 1,
    pageSize: 10,
})
const total = ref(0)
let giftListData = ref([])

const getUserList = async () => {
    loading.value = true
    const res = await giftList({ ...searchForm.value, ...pages.value })
    loading.value = false
    giftListData.value = res.data.list
    total.value = res.data.total
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
const dialogVisible = ref(false)
const formRef = ref(null);
const form = ref({
    name: '',
    number: '',
    total: '',
    time: null,
})
const rules = reactive({
    name: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
    number: [{ required: true, message: '请输入限制数量', trigger: 'blur' }],
    total: [{ required: true, message: '请输入卡总数量', trigger: 'blur' },],
    time: [{
        type: 'array',
        required: true,
        message: '请选择生效时间',
        fields: {
            0: { type: 'date', required: true, message: '请选择开始日期' },
            1: { type: 'date', required: true, message: '请选择结束日期' },
        },
    },],


})

// 新增弹框
const add = () => {
    dialogVisible.value = true
    form.value = {}
}
const detail = ref({})
// 修改
const handleClick = (item) => {
    detail.value = item
    form.value = item
    form.value.time = []
    form.value.time[0] = item.startDate
    form.value.time[1] = item.endDate
    dialogVisible.value = true

}
// 删除
const handleDel = async (item) => {
    const res = await giftUpdate({ id: item.id,isDeleted:1 })
    if (res.code === 0) {
        ElMessage.success('删除成功');
        getUserList()
    } else {
        ElMessage.error(res.msg);
        return false;
    }
}

// 新增弹框-保存按钮
const closEditLeaderDialog = () => {
    dialogVisible.value = false
}
// 新增弹框-保存按钮
const submitForm = () => {
    formRef.value.validate(async (valid) => {
        if (valid) {
            if (form.value.time.length > 0) {
                form.value.startDate = form.value.time[0]
                form.value.endDate = form.value.time[1]
            }
            const res = ref()
            // 修改
            if (form.value.id) {
                let obj = {
                    id: form.value.id,
                    name: form.value.name,
                    number: form.value.number,
                    total: form.value.total,
                    startDate: form.value.startDate,
                    endDate: form.value.endDate,
                }
                res.value = await giftUpdate(obj)
            } else {
                // 新增
                res.value = await giftAdd(JSON.stringify(form.value))
            }
            if (res.code === 0) {
                dialogVisible.value = false
                ElMessage.success('提交成功');
                getUserList()
            }
        } else {
            ElMessage.error('表单验证失败');
            return false;
        }
    });
};



onMounted(() => {
    getUserList()
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

.pagination {
    margin-top: 20px;
}
</style>
