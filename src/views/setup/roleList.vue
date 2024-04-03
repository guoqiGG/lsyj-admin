<template>

    <el-card style="margin-top: 10px;">
        <!-- <el-button type="primary" :icon="CirclePlus" class="add" @click="add()">新增</el-button> -->
        <el-table v-loading="loading" :data="roleListData" style="width: 100%"
        :header-cell-style="{ background: '#f7f8fa', color: '#000' }">
            <el-table-column prop="name" label="角色名称" align="center" />
            <el-table-column prop="createTime" label="创建时间" align="center" />
            <el-table-column prop="updateTime" label="更新时间" align="center" />
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
    <el-dialog v-model="dialogVisible" :title="isEdit ? '编辑礼品卡' : '新增礼品卡'" width="600px" :close="clearEditForm" >
        <el-form ref="formRef" :rules="rules" :model="form" class="demo-form-inline" lable-width="100px">
            <el-form-item label="礼品卡名" prop="name">
                <el-input v-model="form.name" placeholder="礼品卡名" clearable />
            </el-form-item>
            <el-form-item label="卡券类型" prop="type">
                <el-radio-group v-model="form.type">
                    <el-radio border :label="0">普通</el-radio>
                    <el-radio border :label="1">全能</el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item label="限制数量" prop="number">
                <el-input-number   controls-position="right"  v-model="form.number" placeholder="限制数量" clearable />
            </el-form-item>
            <el-form-item label="卡总数量" prop="total">
                <el-input-number    controls-position="right" v-model="form.total" placeholder="卡总数量" clearable />
            </el-form-item>
            <el-form-item label="使用时间" prop="time">
                <el-date-picker @change="timeChange" v-model="form.time" type="datetimerange" start-placeholder="开始时间"
                    end-placeholder="结束时间" format="YYYY-MM-DD HH:mm:ss" date-format="YYYY/MM/DD ddd"
                    value-format="YYYY-MM-DD h:m:s" time-format="A hh:mm:ss" />
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
import { roleList, giftAdd, giftUpdate } from "../../api/modules";
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
    const res = await roleList({  ...pages.value })
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
    name: [{ required: true, message: '请输入礼品卡名', trigger: 'blur' }],
    number: [{ required: true, message: '请输入限制数量', trigger: 'blur' }],
    total: 
    [{ required: true, message: '请输入礼品卡总数', trigger: 'blur' },
    { validator: validateTotal, trigger: 'blur' }],
    type: [{ required: true, message: '请选择卡券类型', trigger: 'blur' }],
    time: [{ required: true, message: '时间不能为空', trigger: 'blur' },
    { validator: validateTime, trigger: 'blur' }],
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
                id: form.value.id,
                name: form.value.name,
                number: form.value.number,
                type: form.value.type,
                total: form.value.total,
                startDate: form.value.startDate,
                endDate: form.value.endDate,
            }
            // 修改
            if (form.value.id) {
                res.value = await giftUpdate(JSON.stringify(obj))

            } else {
                // 新增
                res.value = await giftAdd(JSON.stringify(obj))
            }
            if (res.value.code === 0) {
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
    const res = await giftUpdate({ id: item.id, isDeleted: 1 })
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
