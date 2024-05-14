<template>
    <el-card>
        <el-form :inline="true" :model="searchForm" class="demo-form-inline" label-width="100px">
            <el-row>
                <el-col :lg="6" :md="8" :sm="12">
                    <el-form-item label="分组名称">
                        <el-input v-model="searchForm.name" placeholder="分组名称" clearable />
                    </el-form-item>
                </el-col>

                <el-form-item>
                    <el-button type="primary" @click="getLeaderGroupList">查询</el-button>
                    <el-button @click="resetForm()">重置</el-button>
                </el-form-item>
            </el-row>
        </el-form>

    </el-card>
    <el-card style="margin-top: 10px;">
        <el-button tag="div" :icon="CirclePlus" type="primary" @click="openDialog('add')">新增分组</el-button>
        <el-table v-loading="loading" :data="leaderGroupListData" style="width: 100%;margin-top: 10px;"
            :header-cell-style="{ background: '#f7f8fa', color: '#000' }">
            <el-table-column prop="id" label="ID" align="center" />
            <el-table-column prop="name" label="分组名称" align="center" />
            <el-table-column prop="commissionRate" label="分佣比例" align="center" />
            <el-table-column prop="size" label="分组人数" align="center">
                <template #default="scope">
                    {{ scope.row.size ? scope.row.size : 0 }}
                </template>
            </el-table-column>
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
    <el-dialog v-model="dialogVisible" :title="isCreate ? '新增分组' : '编辑分组'" width="400px" @close="closeDialog">
        <el-form ref="leaderGroupFormRef" :rules="rules" :model="leaderGroupForm" class="demo-form-inline"
            label-width="100px" :label-position="right">
            <el-form-item label="分组名称" prop="name">
                <el-input v-model="leaderGroupForm.name" placeholder="分组名称" clearable style="width: 200px;" />
            </el-form-item>
            <el-form-item label="分佣比例" prop="commissionRate">
                <el-input-number controls-position="right" v-model="leaderGroupForm.commissionRate" placeholder="分佣比例"
                    :precision="2" min="0" max="1" clearable style="width: 200px;text-align: left;" />
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
import { leaderGroupList, addLeaderGroup, updateLeaderGroup } from "../../api/modules";
import { ElMessage } from "element-plus";
const searchParams = {
    name: null
}
const searchForm = ref({ ...searchParams })
const pages = ref({
    pageNo: 1,
    pageSize: 10,
})
const total = ref(0)
const loading = ref(false)
let leaderGroupListData = ref([])
const getLeaderGroupList = async () => {
    loading.value = true
    const res = await leaderGroupList({ ...searchForm.value, ...pages.value })
    loading.value = false
    leaderGroupListData.value = res.data.list
    total.value = res.data.total
}

const tableHandleSizeChange = (e) => {
    pages.value.pageSize = e
    getLeaderGroupList()
}
const tableHandleChange = (e) => {
    pages.value.pageNo = e
    getLeaderGroupList()
}
const resetForm = () => {
    searchForm.value = { ...searchParams }
    getLeaderGroupList()
}
const isCreate = ref(false)
const dialogVisible = ref(false)
const leaderGroupFormRef = ref(null)
const leaderGroupForm = ref({
    id: null,
    name: null,
    commissionRate: null
})
const rules = reactive({
    name: [
        { required: true, message: '分组名称不能为空', trigger: 'blur' },
    ],
    commissionRate: [
        { required: true, message: '分佣比例不能为空', trigger: 'blur' },
    ]
})


const openDialog = (edit, scope) => {
    edit == 'add' ? isCreate.value = true : isCreate.value = false
    if (scope) {
        leaderGroupForm.value.id = scope.row.id
        leaderGroupForm.value.name = scope.row.name
        leaderGroupForm.value.commissionRate = scope.row.commissionRate
    }
    dialogVisible.value = true
}

const closeDialog = () => {
    clearForm()
    dialogVisible.value = false
}

const clearForm = () => {
    leaderGroupForm.value.id = null
    leaderGroupForm.value.name = null
    leaderGroupForm.value.commissionRate = null
}

const save = () => {
    leaderGroupFormRef.value.validate(async (valid) => {
        if (valid) {
            try {
                if (isCreate.value) {//新增
                    const res = await addLeaderGroup({ name: leaderGroupForm.value.name, commissionRate: leaderGroupForm.value.commissionRate })
                    if (res?.code === 0) {
                        ElMessage({
                            showClose: false,
                            message: '新增分组成功',
                            type: 'success',
                        })
                        closeDialog()
                        getLeaderGroupList()
                    }
                } else {
                    const res = await updateLeaderGroup({ id: leaderGroupForm.value.id, name: leaderGroupForm.value.name, commissionRate: leaderGroupForm.value.commissionRate, isDeleted: 0 })
                    if (res?.code === 0) {
                        ElMessage({
                            showClose: false,
                            message: '编辑分组成功',
                            type: 'success',
                        })
                        closeDialog()
                        getLeaderGroupList()
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
    const res = await updateLeaderGroup({ id: scope.row.id, name: scope.row.name, commissionRate: leaderGroupForm.value.commissionRate ? eaderGroupForm.value.commissionRate : 0, isDeleted: 1 })
    if (res?.code === 0) {
        ElMessage({
            showClose: false,
            message: '删除成功',
            type: 'success',
        })
        getLeaderGroupList()
    }
}

onMounted(() => {
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