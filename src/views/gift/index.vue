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
            <el-table-column prop="number" label="限制数量" align="center" />
            <el-table-column prop="total" label="礼品卡总数" align="center" />
            <el-table-column prop="startDate" label="开始时间" align="center" />
            <el-table-column prop="endDate" label="结束时间" align="center" />
            <el-table-column fixed="right" label="操作" width="180" align="center">
                <template #default>
                    <span class="operation" @click="editor">修改</span>
                    <span class="operation" @click="del">删除</span>
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
    <el-dialog v-model="editOrCreateDialogVisible" title="新增礼品卡" width="600px" :close="clearEditForm">
        <el-form :model="form" class="demo-form-inline" lable-width="100px">
            <el-form-item label="礼品卡名">
                <el-input v-model="form.name" placeholder="礼品卡名" clearable />
            </el-form-item>
            <el-form-item label="限制数量">
                <el-input type="number" v-model="form.number" placeholder="限制数量" clearable />
            </el-form-item>
            <el-form-item label="卡总数量">
                <el-input type="number" v-model="form.total" placeholder="卡总数量" clearable />
            </el-form-item>
            <el-form-item label="生效时间">
                <el-date-picker v-model="time" type="datetimerange" start-placeholder="开始时间" end-placeholder="结束时间"
                    format="YYYY-MM-DD HH:mm:ss" date-format="YYYY/MM/DD ddd" time-format="A hh:mm:ss"
                    value-format="YYYY-MM-DD h:m:s" />
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="submitForm(formRef)">保存</el-button>
                <el-button @click="dialogVisible = false">关闭</el-button>
            </el-form-item>
        </el-form>
    </el-dialog>
</template>
<script setup>
import { onMounted, ref } from "vue";
import { giftList, giftAdd } from "../../api/modules";
import {
    CirclePlus
} from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus';

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
// 重置
const resetForm = () => {
    searchForm.value = { ...searchParams }
    getUserList()
}
// 列表数据
const getUserList = async () => {
    loading.value = true
    const res = await giftList({ ...searchForm.value, ...pages.value })
    loading.value = false
    giftListData.value = res.data.list
    total.value = res.data.total
}
// 分页
const tableHandleSizeChange = (e) => {
    pages.value.pageSize = e
}
const tableHandleChange = (e) => {
    pages.value.pageNo = e
    getUserList()
}
// 新增弹框
const dialogVisible = ref(false)
const formRef = ref(null);
const form = ref({
    name: '',
    number: '',
    total: '',
})
const time = ref('')
// 新增弹框
const add = () => {
    dialogVisible.value = true
    form.value = {}
}
// 修改
const handleClick = (item) => {
    form.value = item
    form.value.time = []
    form.value.time[0] = item.startDate
    form.value.time[1] = item.endDate
    dialogVisible.value = true

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
