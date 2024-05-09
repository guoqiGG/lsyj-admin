<template>
    <el-card>
        <el-form :inline="true" :model="searchForm" class="demo-form-inline" label-width="100px">
            <el-row>
                <el-col :lg="6" :md="8" :sm="12">
                    <el-form-item label="配置名">
                        <el-input v-model="searchForm.remark" placeholder="配置名" clearable />
                    </el-form-item>
                </el-col>
                <el-form-item>
                    <el-button type="primary" @click="getConfigList">查询</el-button>
                    <el-button @click="resetForm()">重置</el-button>
                </el-form-item>
            </el-row>
        </el-form>

    </el-card>
    <el-card style="margin-top: 10px;">
        <el-table v-loading="loading" :data="configListData" style="width: 100%"
            :header-cell-style="{ background: '#f7f8fa', color: '#000' }">
            <el-table-column prop="remark" label="配置名" align="center" />
            <el-table-column prop="value" label="值" align="center" />
            <el-table-column prop="createTime" label="创建时间" align="center" />
            <el-table-column prop="updateTime" label="更新时间" align="center" />
            <el-table-column fixed="right" label="操作" width="120" align="center">
                <template #default="scope">
                    <span class="operation" @click="openUpdateConfigDialog(scope)">修改</span>
                </template>
            </el-table-column>
        </el-table>
        <div class="pagination">
            <el-pagination background layout="total, sizes, prev, pager, next, jumper"
                v-model:page-size="pages.pageSize" v-model:current-page="pages.pageNo"
                :page-sizes="[10, 20, 50, 100, 200, 500]" :total="pages.total" @size-change="tableHandleSizeChange"
                @current-change="tableHandleChange" />
        </div>
    </el-card>

    <el-dialog v-model="updateConfigDialogVisible" title="修改配置信息" width="600px" @close="closeUpdateConfigDialog">
        <el-form ref="configFormRef" :model="configForm" :rules="configFormRules" class="demo-form-inline"
            label-width="100px" :label-position="right">
            <el-form-item label="配置名" prop="remark">
                <el-input v-model="configForm.remark" placeholder="配置名" clearable />
            </el-form-item>
            <el-form-item label="value" prop="value">
                <el-input v-model="configForm.value" placeholder="value" clearable />
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="save">保存</el-button>
                <el-button @click="closeUpdateConfigDialog">关闭</el-button>
            </el-form-item>
        </el-form>
    </el-dialog>
</template>
<script setup>
import { onMounted, ref, reactive } from "vue";
import { configList, updateConfig } from "../../api/modules";
import { ElMessage } from "element-plus";
const searchParams = {
    remark: null
}
const loading = ref(false)
const searchForm = ref({ ...searchParams })
const pages = ref({
    pageNo: 1,
    pageSize: 20,
    total: 0
})
let configListData = ref([])
const updateConfigDialogVisible = ref(false)
const configForm = ref({
    id: 0,
    remark: null,
    value: null,
    key: null
})
const configFormRef = ref(null)
const configFormRules = reactive({
    remark: [{ required: true, message: "配置名不能为空", trigger: "blur" }],
    value: [{ required: true, message: "value不能为空", trigger: "blur" }],
})
const getConfigList = async () => {
    loading.value = true
    const res = await configList({ ...searchForm.value, ...pages.value })
    console.log(res)
    loading.value = false
    configListData.value = res.data.list
    pages.value.total = res.data.total
}

const tableHandleSizeChange = (e) => {
    pages.value.pageSize = e
    getConfigList()
}
const tableHandleChange = (e) => {
    pages.value.pageNo = e
    getConfigList()
}
const resetForm = () => {
    searchForm.value = { ...searchParams }
    getConfigList()
}

const closeUpdateConfigDialog = () => {
    updateConfigDialogVisible.value = false
    clearEditForm()
}
const openUpdateConfigDialog = (scope) => {
    updateConfigDialogVisible.value = true
    configForm.value.id = scope.row.id
    configForm.value.remark = scope.row.remark
    configForm.value.value = scope.row.value
    configForm.value.key = scope.row.key
}

const save = async () => {
    configFormRef.value.validate(async (valid) => {
        if (valid) {
            try {
                const res = await updateConfig({ ...configForm.value })
                if (res.code === 0) {
                    ElMessage.success('修改成功')
                    closeUpdateConfigDialog()
                    getConfigList()
                }
            } catch (error) {
                ElMessage.error('修改失败')
                return
            }
        } else {
            return false;
        }
    });
}

// 清空修改团长信息表单
const clearEditForm = () => {
    configForm.value = {
        id: 0,
        leaderName: null,
        value: null,
        key: null,
    }
}

onMounted(() => {
    getConfigList()
})
</script>
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