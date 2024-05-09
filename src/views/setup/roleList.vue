<template>
    <el-card style="margin-top: 10px;">
        <el-button type="primary" :icon="CirclePlus" class="add" @click="add()">新增</el-button>
        <el-table v-loading="loading" :data="roleListData" style="width: 100%"
            :header-cell-style="{ background: '#f7f8fa', color: '#000' }">
            <el-table-column prop="name" label="角色名称" align="center" />
            <el-table-column prop="createTime" label="创建时间" align="center" />
            <el-table-column prop="updateTime" label="更新时间" align="center" />
            <el-table-column fixed="right" label="操作" width="180" align="center">
                <template #default="scope">
                    <el-popconfirm confirm-button-text="确定" cancel-button-text="取消" cancel-button-type="info"
                        icon-color="#626AEF" title="确定要删除吗?" @confirm="handleDel(scope.row)" @cancel="cancelEvent">
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
    <!-- 新增 -->
    <el-dialog v-model="dialogVisible" :title="isEdit ? '编辑角色' : '新增角色'" width="600px" :close="clearEditForm">
        <el-form ref="formRef" :rules="rules" :model="form" class="demo-form-inline" label-width="100px">
            <el-form-item label="角色名称" prop="ruleName">
                <el-input v-model="form.ruleName" placeholder="请输入角色名称" clearable />
            </el-form-item>
            <el-form-item label="角色权限" prop="aithorityIds">
                <el-select multiple collapse-tags collapse-tags-tooltip :max-collapse-tags="3"
                    v-model="form.aithorityIds" placeholder="请选择角色权限" size="large" style="width: 240px">
                    <el-option v-for="item in authorityListData" :key="item.id" :label="item.title" :value="item.id" />
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
import { roleList, roleAdd, roleDel, authorityList } from "../../api/modules";
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
let roleListData = ref([])
// 列表数据
const getRoleList = async () => {
    loading.value = true
    const res = await roleList({ ...pages.value })
    loading.value = false
    roleListData.value = res.data.list
    total.value = res.data.total
}
// 分页
const tableHandleSizeChange = (e) => {
    pages.value.pageSize = e
    getRoleList()
}
const tableHandleChange = (e) => {
    pages.value.pageNo = e
    getRoleList()
}
// 角色权限列表数据
const authorityListData = ref([])
const getAuthorityList = async () => {
    const res = await authorityList()
    authorityListData.value = res.data

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
    ruleName: [{ required: true, message: '请输入角色名称', trigger: 'blur' }],
    aithorityIds: [{ required: true, message: '请选择角色权限', trigger: 'blur' }],
})

// 新增按钮
const add = () => {
    dialogVisible.value = true
    isEdit.value = false
    form.value = {}
}
// 新增弹框-保存按钮
const submitForm = () => {
    formRef.value.validate(async (valid) => {
        if (valid) {
            let obj={
                ruleName: form.value.ruleName,
                aithorityIds: form.value.aithorityIds,
                token: localStorage.getItem('token'),
                adminId:localStorage.getItem('UserID')
            }
            const res  = await roleAdd(obj)
            if (res.code === 0) {
                dialogVisible.value = false
                getRoleList()
            }
        } else {
            return false;
        }
    });

};


// 删除
const handleDel = async (item) => {
    const res = await roleDel({ id: item.id, token:localStorage.getItem('token'),adminId:localStorage.getItem('UserID') })
    if (res.code === 0) {
        ElMessage.success('删除成功');
        getRoleList()
    } else {
        ElMessage.error(res.msg);
        return false;
    }
}

onMounted(() => {
    getRoleList()
    getAuthorityList()
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
