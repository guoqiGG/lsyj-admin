<template>
    <el-card>
        <el-form :inline="true" :model="searchForm" class="demo-form-inline" label-width="100px">
            <el-row>
                <el-col :lg="6" :md="12" :sm="12">
                    <el-form-item label="用户昵称">
                        <el-input v-model="searchForm.name" placeholder="用户昵称" clearable />
                    </el-form-item>
                </el-col>
                <el-col :lg="6" :md="12" :sm="12">
                    <el-form-item label="用户手机">
                        <el-input v-model="searchForm.mobile" placeholder="用户手机" clearable />
                    </el-form-item>
                </el-col>
                <!-- <el-col :lg="6" :md="12" :sm="12">
                    <el-form-item label="团长名称">
                        <el-input v-model="searchForm.leaderName" placeholder="团长名称" clearable />
                    </el-form-item>
                </el-col>
                <el-col :lg="6" :md="12" :sm="12">
                    <el-form-item label="团长手机">
                        <el-input v-model="searchForm.leaderMobile" placeholder="团长手机" clearable />
                    </el-form-item>
                </el-col> -->
                <el-col :lg="6" :md="12" :sm="12">
                    <el-form-item label="所属团长">
                        <el-select v-model="searchForm.pUid" filterable placeholder="请选择所属团长" style="width: 90%"
                            clearable>
                            <el-option v-for="item in options" :key="item.id" :label="item.leaderName"
                                :value="item.id" />
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :lg="6" :md="12" :sm="12">
                    <el-form-item label="用户类型">
                        <el-select v-model="searchForm.type" placeholder="请选择用户类型" style="width: 90%" clearable>
                            <el-option label="普通用户" value="0" />
                            <el-option label="团长" value="1" />
                        </el-select>
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
        <el-button :icon="Download" style="margin-bottom: 20px" @click="exportExcel">导出</el-button>
        <el-table v-loading="loading" :data="userListData" style="width: 100%"
            :header-cell-style="{ background: '#f7f8fa', color: '#000' }">
            <el-table-column prop="name" label="用户昵称" width="150" align="center" />
            <el-table-column prop="avatar" label="头像" width="120" align="center">
                <template #default="scope">
                    <el-image style="width: 60px;height:60px;border-radius:5px;" :src="scope.row.avatar"
                        lazy></el-image>
                </template>
            </el-table-column>
            <el-table-column prop="mobile" label="用户手机" />
            <el-table-column label="团长">
                <template #default="scope">
                    <div class="leader" v-if="scope.row.leaderName && scope.row.leaderMobile">
                        <div> 团长：{{ scope.row.leaderName }}</div>
                        <div> 手机：{{ scope.row.leaderMobile }}</div>
                        <div> 门店：{{ scope.row.leaderStore }}</div>
                        <div> 地址：{{ scope.row.address }}</div>

                    </div>
                    <div v-else>无</div>
                </template>
            </el-table-column>
            <el-table-column label="用户类型" align="center">
                <template #default="scope">
                    <div>{{ scope.row.type == 0 ? '普通用户' : '团长' }}
                    </div>
                </template>
            </el-table-column>
            <el-table-column prop="levelName" label="用户等级" align="center" />
            <el-table-column prop="score" label="青春豆" align="center" />
            <el-table-column prop="regTime" label="注册时间" width="200" align="center" />
            <!-- <el-table-column prop="createTime" label="创建时间" /> -->
            <el-table-column fixed="right" label="操作" width="180" align="center">
                <template #default="scope">
                    <span class="operation" @click="editOrCreateDialog(scope)">编辑</span>
                    <span class="operation" @click="openGenerateHuantuoLiveLink(scope.row)">生成欢拓直播链接</span>
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
    <!-- 修改用户信息 -->
    <edit-user-info ref="editUserInfoRef" :editOrCreateDialogVisible="editOrCreateDialogVisible" :userInfo="userInfo"
        :active="active" @closeDialog="closeDialog"></edit-user-info>
    <!-- 单个用户生成欢拓直播地址 -->
    <el-dialog v-model="generateHuantuoLiveLinkDialogVisible" title="单个用户生成欢拓直播地址" width="400px"
        @close="closeGenerateHuantuoLiveLinkDialog">
        <el-form ref="liveLinkRef" :rules="liveLinkRules" :model="liveLinkForm" class="demo-form-inline"
            label-width="100px" :label-position="right">
            <el-form-item label="欢拓直播间" prop="course_id">
                <el-select v-model="liveLinkForm.course_id" placeholder="请选择欢拓直播间" clearable filterable
                    style="width: 200px;">
                    <el-option v-for="item in liveListData" :label="item.course_name" :value="item.course_id" />
                </el-select>
            </el-form-item>
            <el-form-item class="footer">
                <el-button type="primary" @click="generateLiveLink">保存</el-button>
                <el-button @click="closeGenerateHuantuoLiveLinkDialog">关闭</el-button>
            </el-form-item>
        </el-form>
    </el-dialog>
</template>
<script setup>
import EditUserInfo from './edit-user-info.vue'
import { onMounted, reactive, ref } from "vue";
import { userList, leaderList, exportUser, huanTuoliveList, generateHuanTuoLiveSingleLink } from "../../api/modules";
import {
    Download
} from '@element-plus/icons-vue'
import { ElMessage } from "element-plus";
const options = ref()
const getLeaderList = async () => {
    const res = await leaderList({
        pageNo: 1,
        pageSize: 10000,
    })
    options.value = res.data.list
}
const searchParams = {
    name: '',
    mobile: '',
    type: '', // 0 普通团长 1 团长
    leaderName: '',
    leaderMobile: '',
    // pUid: ''
}
const loading = ref(false)
const searchForm = ref({ ...searchParams })
const pages = ref({
    pageNo: 1,
    pageSize: 20,
    total: 0
})
const userInfo = ref({
    id: 0,
    name: '',
    avatar: '',
    mobile: '',
    leaderName: '',
    leaderMobile: '',
    levelName: '',
    regTime: ''
})

const editOrCreateDialogVisible = ref(false)

let userListData = ref([])
const active = ref('1') // tab 1购物明细 2礼品卡明细 3合成卡明细 4优惠券明细
const editUserInfoRef = ref(null)
const generateHuantuoLiveLinkDialogVisible = ref(false)
const liveListData = ref([])
const liveLinkForm = ref({
    course_id: null
})
const liveLinkRef = ref(null)
const getUserList = async () => {
    loading.value = true
    const res = await userList({ ...searchForm.value, ...pages.value })
    userListData.value = res.data.list
    pages.value.total = res.data.total
    loading.value = false
}

const tableHandleSizeChange = (e) => {
    pages.value.pageSize = e
    getUserList()
}
const tableHandleChange = (e) => {
    pages.value.pageNo = e
    getUserList()
}

const resetForm = () => {
    searchForm.value = { ...searchParams }
    getUserList()
}

const editOrCreateDialog = (scope) => {
    editOrCreateDialogVisible.value = true
    userInfo.value.id = scope.row.id
    userInfo.value.name = scope.row.name
    userInfo.value.avatar = scope.row.avatar
    userInfo.value.mobile = scope.row.mobile
    userInfo.value.score = scope.row.score
    userInfo.value.leaderName = scope.row.leaderName
    userInfo.value.leaderMobile = scope.row.leaderMobile
    userInfo.value.levelName = scope.row.levelName
    userInfo.value.regTime = scope.row.regTime
}

const closeDialog = (params = 0) => {
    editOrCreateDialogVisible.value = false
    if (params == 1) {
        getUserList()
    }
}

const exportExcel = async () => {
    loading.value = true
    const res = await exportUser({
        name: searchForm.value.name,
        mobile: searchForm.value.mobile,
        type: searchForm.value.type,
        leaderName: searchForm.value.leaderName,
        leaderMobile: searchForm.value.leaderMobile,
        // pUid: searchForm.value.pUid
    })
    loading.value = false
    var blob = new Blob([res], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=utf-8' })
    const fileName = '用户信息表'
    const elink = document.createElement('a')
    if ('download' in elink) { // 非IE下载
        elink.download = fileName
        elink.style.display = 'none'
        elink.href = URL.createObjectURL(blob)
        document.body.appendChild(elink)
        elink.click()
        URL.revokeObjectURL(elink.href) // 释放URL 对象
        document.body.removeChild(elink)
    } else { // IE10+下载
        navigator.msSaveBlob(blob, fileName)
    }
}

const openGenerateHuantuoLiveLink = (scope) => {
    userInfo.value = scope
    generateHuantuoLiveLinkDialogVisible.value = true
    getHuanTuoLiveList()
}

const closeGenerateHuantuoLiveLinkDialog = () => {
    generateHuantuoLiveLinkDialogVisible.value = false
    liveLinkForm.value.course_id = null
    userInfo.value = null
}

const getHuanTuoLiveList = async () => {
    const res = await huanTuoliveList({ pageNo: 1, pageSize: 20 })
    liveListData.value = res.data
}

const liveLinkRules = reactive({
    course_id: [{ required: true, message: "请选择直播间", trigger: "blur" }],
})

const generateLiveLink = async () => {
    liveLinkRef.value.validate(async (valid) => {
        if (valid) {
            try {
                const res = await generateHuanTuoLiveSingleLink({
                    userId: userInfo.value.id,
                    course_id: liveLinkForm.value.course_id
                });

                if (res.code == 0) {
                    ElMessage.success('生成直播间地址成功');
                    closeGenerateHuantuoLiveLinkDialog()
                }
            } catch (error) {
                ElMessage.error('生成直播间地址失败');
                return
            }
        } else {
            return false;
        }
    });
};


onMounted(() => {
    getLeaderList()
    getUserList()
})
</script>


<style scoped lang="scss">
.pagination {
    margin-top: 20px;
}

.operation {
    color: #4060c7;
    margin: 0px 5px;
    cursor: pointer;
}

.footer {
    padding-left: 0;
}
</style>