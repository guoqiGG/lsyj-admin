<template>
    <el-card>
        <el-form :inline="true" :model="searchForm" class="demo-form-inline" lable-width="100px">
            <el-row>
                <el-col :lg="6" :md="8" :sm="12">
                    <el-form-item label="合成卡名">
                        <el-input v-model="searchForm.name" placeholder="合成卡名" clearable />
                    </el-form-item>
                </el-col>
                <el-col :lg="6" :md="8" :sm="12">
                    <el-form-item label="时间筛选">
                        <el-date-picker v-model="searchForm.time" type="datetimerange" start-placeholder="开始时间"
                            end-placeholder="结束时间" format="YYYY-MM-DD HH:mm:ss" date-format="YYYY/MM/DD ddd"
                            time-format="A hh:mm:ss" value-format="YYYY-MM-DD h:m:s" />
                    </el-form-item>
                </el-col>

                <el-form-item>
                    <el-button type="primary" @click="geCompositeCardList">查询</el-button>
                    <el-button @click="resetForm()">重置</el-button>
                </el-form-item>
            </el-row>
        </el-form>

    </el-card>
    <el-card style="margin-top: 10px;">
        <el-button type="primary" :icon="CirclePlus" class="add" @click="add()">新增</el-button>
        <el-button  :icon="Download" class="add" >导出</el-button>

        <el-table :data="compositeData" :span-method="objectSpanMethod" border v-loading="loading" style="width: 100%"
        :header-cell-style="{ background: '#f7f8fa', color: '#000' }">
            <el-table-column align="center" prop="parentName" label="合成卡名称" show-overflow-tooltip></el-table-column>
            <el-table-column align="center" prop="parentNumber" label="需礼品卡数" show-overflow-tooltip></el-table-column>
            <el-table-column align="center" prop="name" label="礼品卡名称" show-overflow-tooltip></el-table-column>
            <el-table-column align="center" prop="number" label="用户最大领取数量" show-overflow-tooltip></el-table-column>
            <el-table-column align="center" prop="total" label="礼品卡总数量" show-overflow-tooltip></el-table-column>
            <el-table-column align="center" prop="startDate" label="开始时间" show-overflow-tooltip></el-table-column>
            <el-table-column align="center" prop="endDate" label="开始时间" show-overflow-tooltip></el-table-column>
            <el-table-column fixed="right" label="操作" width="180" align="center">
                <template #default="scope">
                    <span class="operation" @click="handleEditor(scope.row)">修改</span>
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
    <el-dialog v-model="dialogVisible" :title="isEdit ? '编辑合成卡' : '新增合成卡'" width="600px">
        <el-form ref="formRef" :model="form" :rules="rules" class="add_dialog" lable-width="100px">
            <el-form-item label="合成卡名" prop="name">
                <el-input v-model="form.name" placeholder="合成卡名" clearable />
            </el-form-item>
            <el-form-item label="礼品卡名" prop="ruleIds">
                <el-select v-model="form.ruleIds" multiple placeholder="请选择礼品卡" style="width: 240px">
                    <el-option v-for="item in options" :key="item.id" :label="item.name" :value="item.id" />
                </el-select>
            </el-form-item>
            <el-form-item label="需礼品卡数" prop="number">
                <el-input type="number" v-model.number="form.number" placeholder="需礼品卡数" clearable />
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
import { compositeCardList, compositeCardAdd, compositeCardUpdate, giftList } from "../../api/modules";
import {
    CirclePlus,Download
} from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus';
const loading = ref(false)
const searchParams = {
    name: null,//名称
    time: [],
}
const searchForm = ref({ ...searchParams })
const pages = ref({
    pageNo: 1,
    pageSize: 10,
})
// 查询
const resetForm = () => {
    searchForm.value = { ...searchParams }
    geCompositeCardList()
}
// 获取列表
const total = ref(0)
let compositeData = ref([])
let rowSpanArr = ref([]);
const geCompositeCardList = async () => {
    loading.value = true
    let obj = { ...pages.value }
    obj.name = searchForm.value.name
    if (searchForm.value.time) {
        obj.startDate = searchForm.value.time[0]
        obj.endDate = searchForm.value.time[1]
    }
    const res = await compositeCardList(obj)
    loading.value = false
    total.value = res.data.total
    compositeData.value = []
    res.data.list.map((item, index) => {
        let ids = []
        item.gifts.map((ie, ix) => {
            if (ie) {
                ie.parentName = item.name
                ie.parentId = item.id
                ie.parentNumber = item.number
                ids.push(ie.id)
                ie.ruleIds = ids
                compositeData.value.push(ie)
            }
        })
    })
    handleTableData(compositeData.value)
}
// 更改数据格式
const handleTableData = (tableData) => {
    let rowSpanList = [],
        position = 0;
    for (let [index, item] of tableData.entries()) {
        if (index == 0) {
            rowSpanList.push(1);
            position = 0;
        } else {
            if (item['parentId']) {
                if (item['parentId'] == tableData[index - 1]['parentId']) {
                    rowSpanList[position] += 1; //项目名称相同，合并到同一个数组中
                    rowSpanList.push(0);
                } else {
                    rowSpanList.push(1);
                    position = index;
                }
            } else {
                rowSpanList.push(1);
                position = index;
            }
        }
    }
    rowSpanArr.value = rowSpanList;
}
//  合并单元格的处理方法 当前行row、当前列column、当前行号rowIndex、当前列号columnIndex
const objectSpanMethod = ({ row, column, rowIndex, columnIndex }) => {
    if (columnIndex === 0) {
        const rowSpan = rowSpanArr.value[rowIndex];
        return [rowSpan, 1];
        
    }
    if (columnIndex === 1) {
        const rowSpan = rowSpanArr.value[rowIndex];
        return [rowSpan, 1];
    }
    if (columnIndex === 7) {
        const rowSpan = rowSpanArr.value[rowIndex];
        return [rowSpan, 1];
    }
};
// 分页
const tableHandleSizeChange = (e) => {
    pages.value.pageSize = e
    geCompositeCardList()
}
const tableHandleChange = (e) => {
    pages.value.pageNo = e
    geCompositeCardList()
}
const options = ref([])
// 礼品卡数据
const optionsList = async () => {
    const res = await giftList({
        pageNo: 1,
        pageSize: 1000,
    })
    options.value = res.data.list
}
// 新增弹框
const dialogVisible = ref(false)
const isEdit = ref(false)
const formRef = ref(null);
const form = ref({
    name: '',
    number: '',
    total: '',
    time: null,
})
const rules = reactive({
    name: [{ required: true, message: '请输入合成卡名', trigger: 'blur' }],
    number: [{ required: true, message: '请输入限制数量', trigger: 'blur' }],
    ruleIds: [{ required: true, message: '请选择礼品卡', trigger: 'blur' }]
})

// 新增
const add = () => {
    dialogVisible.value = true
    isEdit.value = false
    form.value = {}
}
// 新增弹框-保存按钮
const submitForm = () => {
    formRef.value.validate(async (valid) => {
        if (valid) {
            const res = ref()
            let obj = {
                name: form.value.name,
                number: form.value.number,
                ruleIds: "",
                id: form.value.id,
            }
            form.value.ruleIds.map((item, index) => {
                if (index < form.value.ruleIds.length) {
                    obj.ruleIds += item + ','
                } else {
                    obj.ruleIds += item
                }
            })
            // 修改
            if (form.value.id) {
                res.value = await compositeCardUpdate(JSON.stringify(obj))
            } else {
                // 新增
                res.value = await compositeCardAdd(JSON.stringify(obj))
            }
            if (res.value.code == 0) {
                dialogVisible.value = false
                ElMessage.success('提交成功');
                geCompositeCardList()
            }

        } else {
            ElMessage.error('表单验证失败');
            return false;
        }
    });
};
//  修改
const handleEditor = (item) => {
    isEdit.value = true
    form.value.name = item.parentName
    form.value.number = item.parentNumber
    form.value.ruleIds = item.ruleIds
    form.value.id = item.parentId
    dialogVisible.value = true
}
// 删除
const handleDel = async (item) => {
    const res = await compositeCardUpdate({ id: item.parentId, isDeleted: 1 })
    if (res.code === 0) {
        ElMessage.success('删除成功');
        geCompositeCardList()
    } else {
        ElMessage.error(res.msg);
        return false;
    }
}


onMounted(() => {
    geCompositeCardList()
    optionsList()
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

.footer {
    margin-left: 95px;
}


.add_dialog{
       :deep(.el-form-item__label) {
    width: 95px !important;
} 
}


</style>
