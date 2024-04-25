<template>

    <el-card>

        <el-form :inline="true" :model="searchForm" class="demo-form-inline" lable-width="100px">
            <el-row>
                <el-col :lg="6" :md="8" :sm="12">
                    <el-form-item label="直播间状态">
                        <el-select v-model="searchForm.status" placeholder="请选择" clearable>
                            <el-option label="直播中" value="101" />
                            <el-option label="未开始" value="102" />
                            <el-option label="已结束" value="103" />
                            <el-option label="禁播" value="104" />
                            <el-option label="暂停" value="105" />
                            <el-option label="异常" value="106" />
                            <el-option label="已过期" value="107" />
                        </el-select>
                    </el-form-item>
                </el-col>

                <el-form-item>
                    <el-button type="primary" @click="getLiveList">查询</el-button>
                    <el-button @click="resetForm()">重置</el-button>
                </el-form-item>
            </el-row>

        </el-form>

    </el-card>
    <el-card style="margin-top: 10px;">
        <el-button tag="div" :icon="CirclePlus" type="primary" @click="showEditOrCreateDialog()">创建直播间</el-button>
        <el-table v-loading="loading" :data="liveListData" style="width: 100%;margin-top: 10px;"
            :header-cell-style="{ background: '#f7f8fa', color: '#000' }">
            <el-table-column prop="roomId" label="房间号" width="100" align="center" />
            <el-table-column prop="name" label="直播间标题" width="300" align="center" />
            <el-table-column prop="anchorName" label="主播" width="200" align="center" />
            <el-table-column label="直播间状态" align="center">
                <template #default="scope">
                    {{ liveStatusCom[scope.row.liveStatus] }}
                </template>
            </el-table-column>
            <el-table-column prop="createTime" label="创建时间" width="400" align="center" />
        </el-table>
        <div class="pagination">
            <el-pagination background layout="total, sizes, prev, pager, next, jumper"
                v-model:page-size="pages.pageSize" v-model:current-page="pages.pageNo"
                :page-sizes="[10, 20, 50, 100, 200, 500]" :total="pages.total" @size-change="tableHandleSizeChange"
                @current-change="tableHandleChange" />
        </div>
    </el-card>

    <el-dialog v-model="editOrCreateDialogVisible" :title="isCreate ? '新增直播间' : '编辑直播间'" width="800px"
        @close="closeEditOrCreateDialog">
        <el-form ref="liveRoomFormRef" :rules="rules" :model="liveRoomForm" class="demo-form-inline" label-width="100px"
            :label-position="right">
            <el-form-item label="直播名称" prop="course_name">
                <el-input v-model="liveRoomForm.course_name" placeholder="直播名称" clearable style="width: 400px;"
                    maxlength="20" show-word-limit />
            </el-form-item>
            <el-form-item label="account" prop="account">
                <el-input v-model="liveRoomForm.account" placeholder="接入方主播账号或ID或手机号等，最长32位" clearable
                    style="width: 400px;" maxlength="32" show-word-limit />
            </el-form-item>
            <el-form-item label="开始时间" prop="startTime">
                <el-date-picker v-model="liveRoomForm.startTime" type="datetime" format="YYYY-MM-DD HH:mm:ss"
                    value-format="YYYY-MM-DD HH:mm:ss" placeholder="直播开始时间,格式: 2015-01-10 12:00:00"
                    style="width: 300px;" />
            </el-form-item>
            <el-form-item label="结束时间" prop="endTime">
                <el-date-picker v-model="liveRoomForm.endTime" type="datetime" format="YYYY-MM-DD HH:mm:ss"
                    value-format="YYYY-MM-DD HH:mm:ss" placeholder="直播结束时间,格式: 2015-01-10 13:00:00"
                    style="width: 300px;" />
            </el-form-item>
            <el-form-item label="主播昵称" prop="nickname">
                <el-input v-model="liveRoomForm.nickname" placeholder="主播昵称" clearable style="width: 400px;"
                    maxlength="15" show-word-limit />
            </el-form-item>
            <el-form-item label="主播简介">
                <el-input type="textarea" v-model="liveRoomForm.accountlntro" placeholder="主播简介(非必填)" clearable
                    :rows="4" style="width: 400px;" maxlength="150" show-word-limit />
            </el-form-item>
            <!-- <el-form-item label="其他" >
             暂无。。。
            </el-form-item> -->

            <el-form-item class="footer">
                <el-button type="primary" @click="save">保存</el-button>
                <el-button @click="closeEditOrCreateDialog">关闭</el-button>
            </el-form-item>
        </el-form>
    </el-dialog>

</template>
<script setup>
import { onMounted, ref, watch, computed, reactive } from "vue";
import { liveList, createLive } from "@/api/modules";

const liveStatusCom = {
    101: '直播中',
    102: '未开始',
    103: '已结束',
    104: '禁播',
    105: '暂停',
    106: '异常',
    107: '已过期',
}
const searchParams = {
    status: ''
}

const loading = ref(false)
const searchForm = ref({ ...searchParams })
const pages = ref({
    pageNo: 1,
    pageSize: 20,
    total: 0
})
let liveListData = ref([])
const getLiveList = async () => {
    loading.value = true
    const res = await liveList({ ...searchForm.value, ...pages.value })
    loading.value = false
    liveListData.value = res.data.list
    pages.value.total = res.data.total
}
const tableHandleSizeChange = (e) => {
    pages.value.pageSize = e
    getLiveList()
}
const tableHandleChange = (e) => {
    pages.value.pageNo = e
    getLiveList()
}
const resetForm = () => {
    searchForm.value = { ...searchParams }
    getLiveList()
}

const liveRoomFormRef = ref(null)
const editOrCreateDialogVisible = ref(false)
const liveRoomForm = ref({
    course_name: null, // 直播名称
    account: null, // 接入方主播账号或ID或手机号等，最长32位
    startTime: null, // 直播开始时间,格式: 2015-01-10 12:00:00
    endTime: null, // 直播结束时间,格式: 2015-01-10 13:00:00
    nickname: null, // 主播的昵称
    accountlntro: null, // 主播的简介(非必填)
    options: {} // 其他选项(object非必填)
    // course_name: '测试直播间', // 直播名称
    // account: '18437930709', // 接入方主播账号或ID或手机号等，最长32位
    // startTime: '2024-04-25 14:59:07', // 直播开始时间,格式: 2015-01-10 12:00:00
    // endTime: '2024-04-25 14:59:24', // 直播结束时间,格式: 2015-01-10 13:00:00
    // nickname: '郭琦zz', // 主播的昵称
    // accountlntro: '新人主播多多关照', // 主播的简介(非必填)
    // options: {} // 其他选项(object非必填)
})

var validateTime = (rule, value, callback) => {
    if (liveRoomForm.value.startTime && liveRoomForm.value.endTime) {
        if (Date.parse(liveRoomForm.value.startTime) >= Date.parse(liveRoomForm.value.endTime)) {
            callback(new Error('开始时间不能小于等于结束时间'))
        } else {
            callback()
        }
    }
}

const rules = reactive({
    course_name: [
        { required: true, message: '直播名称不能为空', trigger: 'blur' },
    ],
    account: [
        { required: true, message: 'account不能为空', trigger: 'blur' },
    ],
    startTime: [
        { required: true, message: '直播开始时间不能为空', trigger: 'blur' },
        { validator: validateTime, trigger: 'blur' }
    ],
    endTime: [
        { required: true, message: '直播结束时间不能为空', trigger: 'blur' },
        { validator: validateTime, trigger: 'blur' }
    ],
    nickname: [
        { required: true, message: '主播昵称不能为空', trigger: 'blur' },
    ],
})
const isCreate = ref(false)

// 创建直播间
const showEditOrCreateDialog = () => {
    // let url = 'https://qingchuntai2.oss-cn-beijing.aliyuncs.com/2024/02/20/%E6%89%B9%E9%87%8F%E5%8F%91%E8%B4%A7.xlsx'
    // window.location.href = url
    isCreate.value = true
    editOrCreateDialogVisible.value = true
}


const save = () => {
    liveRoomFormRef.value.validate(async (valid) => {
        try {
            if (isCreate.value) { // 新增
                let params = {
                    course_name: liveRoomForm.value.course_name,
                    account: liveRoomForm.value.account,
                    startTime: liveRoomForm.value.startTime,
                    endTime: liveRoomForm.value.endTime,
                    nickname: liveRoomForm.value.nickname,
                    accountlntro: liveRoomForm.value.accountlntro,
                    options: liveRoomForm.value.options
                }
                const res = await createLive({ ...params })
                if (res?.code === 0) {
                    closeEditOrCreateDialog()
                    getLiveList()
                }
            }
        } catch (error) {

        }
    })
}
const closeEditOrCreateDialog = () => {
    editOrCreateDialogVisible.value = false
    clearEditForm()
}

const clearEditForm = () => {
    liveRoomForm.value = {
        course_name: null,
        account: null,
        startTime: null,
        endTime: null,
        nickname: null,
        accountlntro: null,
        options: {}
    }
}

onMounted(() => {
    getLiveList()
})
</script>

<style scoped>
.pagination {
    margin-top: 20px;
}
</style>
