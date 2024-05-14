<template>
    <el-card>
        <el-divider content-position="left"><span style="font-size: 16px;color:#ea3b26;">须知:</span></el-divider>
        <div style="font-size: 12px;color:#ea3b26;">1.创建直播间完，请立即创建商品 </div>
        <div style="margin-top: 5px; font-size: 12px;color:#ea3b26;">2.请在当天开播前 两个半小时 创建完成直播间</div>
        <div style="margin-top: 20px;"></div>
        <el-button tag="div" :icon="CirclePlus" type="primary" @click="showEditOrCreateDialog()">创建直播间</el-button>
        <el-button tag="div" @click="toHuanTuoAdmin()">欢拓后台地址</el-button>
        <el-table v-loading="loading" :data="liveListData" style="width: 100%;margin-top: 10px;" :border="parentBorder"
            :header-cell-style="{ background: '#f7f8fa', color: '#000' }">
            <el-table-column type="expand">
                <template #default="props">
                    <el-table :data="props.row.huanTuoGoodsInfos" :border="childBorder">
                        <el-table-column prop="name" label="商品名称" align="center" />
                        <el-table-column label="商品图片" align="center">
                            <template #default="scope">
                                <img v-if="scope.row.img" style="width: 50px;height:50px;border-radius: 5px;"
                                    :src="scope.row.img" alt="">
                            </template>
                        </el-table-column>
                        <el-table-column prop="price" label="现价" align="center" />
                        <el-table-column prop="originalPrice" label="原价" align="center" />
                        <el-table-column label="标签" align="center">
                            <template #default="scope">
                                {{ tab[Number(scope.row.tab)] }}
                            </template>
                        </el-table-column>
                        <el-table-column prop="url" label="商品链接" align="center" />
                        <el-table-column label="商品状态" align="center">
                            <template #default="scope">
                                <el-switch v-model="scope.row.putaway" active-value="1" inactive-value="0"
                                    style="--el-switch-on-color: #13ce66; --el-switch-off-color: #ff4949"
                                    @change="editLiveProdStatus(props.row.course_id, scope)" />
                            </template>
                        </el-table-column>
                    </el-table>
                </template>
            </el-table-column>
            <el-table-column prop="course_id" label="ID" width="100" align="center" />
            <el-table-column prop="course_name" label="名称" width="200" align="center">
                <template #default="scope">
                    <div style="white-space: nowrap;">
                        {{ scope.row.course_name }}
                    </div>
                </template>
            </el-table-column>
            <el-table-column label="封面图" align="center">
                <template #default="scope">
                    <img v-if="scope.row.thumb" style="width: 50px;height:50px;border-radius: 5px;"
                        :src="scope.row.thumb" alt="">
                    <div v-else style="width: 50px;height:50px;border-radius: 5px;"></div>
                </template>
            </el-table-column>
            <el-table-column prop="startTime" label="设置开始时间" width="180" align="center">
                <template #default="scope">
                    <div style="white-space: nowrap;">
                        {{ scope.row.startTime }}
                    </div>
                </template>
            </el-table-column>
            <el-table-column prop="endTime" label="设置结束时间" width="180" align="center">
                <template #default="scope">
                    <div style="white-space: nowrap;">
                        {{ scope.row.endTime }}
                    </div>
                </template>
            </el-table-column>
            <el-table-column prop="liveStime" label="实际开始时间" width="180" align="center">
                <template #default="scope">
                    <div style="white-space: nowrap;">
                        {{ scope.row.liveStime }}
                    </div>
                </template>
            </el-table-column>
            <el-table-column prop="liveEtime" label="实际结束时间" width="180" align="center">
                <template #default="scope">
                    <div style="white-space: nowrap;">
                        {{ scope.row.liveEtime }}
                    </div>
                </template>
            </el-table-column>
            <el-table-column prop="duration" label="时长" align="center" />
            <el-table-column label="状态" align="center">
                <template #default="scope">
                    {{ scope.row.status === 0 ? '正常' : '已删除' }}
                </template>
            </el-table-column>
            <el-table-column prop="chatTotal" label="聊天总数" align="center" />
            <el-table-column prop="livePv" label="直播观看次数" align="center" />
            <el-table-column prop="liveUv" label="直播观看人数" align="center" />
            <el-table-column prop="pbPv" label="回放观看次数" align="center" />
            <el-table-column label="直播状态" align="center">
                <template #default="scope">
                    {{ liveStatus[scope.row.liveStatus] }}
                </template>
            </el-table-column>
            <el-table-column fixed="right" label="操作" width="200" align="center">
                <template #default="scope">
                    <span class="operation" @click="getAddress(scope.row.course_id, 'push')">推流密钥</span>
                    <span class="operation" @click="getAddress(scope.row.course_id, 'obs')">推流地址</span>
                    <span class="operation" @click="showAddLiveProdDialog(scope.row.course_id)">添加直播商品</span>
                    <span class="operation" @click="generateLiveLink(scope.row.course_id, 0)">生成h5直播链接</span>
                    <span class="operation" @click="generateLiveLink(scope.row.course_id, 1)">生成小程序直播链接</span>
                </template>
            </el-table-column>
        </el-table>
        <!-- <div class="pagination">
            <el-pagination background layout="total, sizes, prev, pager, next, jumper"
                v-model:page-size="pages.pageSize" v-model:current-page="pages.pageNo"
                :page-sizes="[10, 20, 50, 100, 200, 500]" :total="pages.total" @size-change="tableHandleSizeChange"
                @current-change="tableHandleChange" />
        </div> -->
    </el-card>
    <!-- 添加直播间 -->
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

    <!-- 直播间添加商品 -->
    <el-dialog v-model="addLiveProdDialogVisible" title="添加直播商品" width="800px" @close="closeAddLiveProdDialog">
        <el-form ref="addLiveProdFormRef" :rules="liveProdRules" :model="addLiveProdForm" class="demo-form-inline"
            label-width="100px" :label-position="right">
            <el-form-item label="商品类型" prop="putaway">
                <el-radio-group v-model="addLiveProdForm.type" @change="prodTypeChange">
                    <el-radio :label="0" border>普通商品</el-radio>
                    <el-radio :label="1" border>优惠券</el-radio>
                    <el-radio :label="2" border>礼品卡</el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item label="直播商品" prop="name">
                <el-select v-model="addLiveProdForm.name" filterable remote reserve-keyword placeholder="请输入商品名称"
                    remote-show-suffix :remote-method="getProdListByName" clearable @change="liveProdChange">
                    <el-option v-for="item in prodListData" :key="item.id" :label="item.name" :value="item.name" />
                </el-select>
            </el-form-item>
            <el-form-item label="商品图片" prop="img">
                <el-upload ref="uploadRef" accept="image/*" v-model:file-list="fileList" class="image-uploader"
                    :show-file-list="false" :action="BaseUrl + '/upload/oss'" :headers="{ Authorization: token }"
                    :on-success="handleSuccess" :on-error="handleError" :before-upload="beforeUpload">
                    <el-image class="avatar" v-if="addLiveProdForm.img" controls="controls"
                        :src="addLiveProdForm.img"></el-image>
                    <el-icon v-else class="image-uploader-icon">
                        <Plus />
                    </el-icon>
                </el-upload>
            </el-form-item>
            <el-form-item label="现价" prop="price">
                <el-input-number controls-position="right" v-model="addLiveProdForm.price" placeholder="现价" clearable />
            </el-form-item>
            <el-form-item label="原价" prop="originalPrice">
                <el-input-number controls-position="right" v-model="addLiveProdForm.originalPrice" placeholder="原价"
                    clearable />
            </el-form-item>
            <el-form-item label="商品链接" prop="url">
                <el-input v-model="addLiveProdForm.url" placeholder="商品链接" clearable />
            </el-form-item>
            <el-form-item label="商品状态" prop="putaway">
                <el-radio-group v-model="addLiveProdForm.putaway">
                    <el-radio :label="1" border>上架</el-radio>
                    <el-radio :label="0" border>下架</el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item class="footer">
                <el-button type="primary" @click="saveAddLiveProd">保存</el-button>
                <el-button @click="closeAddLiveProdDialog">关闭</el-button>
            </el-form-item>
        </el-form>
    </el-dialog>
</template>
<script setup>
import { onMounted, ref, watch, computed, reactive } from "vue";
import { huanTuoliveList, createLive, huanTuoPushStreamingAndObsAddress, prodList, couponList, giftList, huanTuoAddLiveProd, editHuanTuoLiveProdStatus, generateHuanTuoLiveLink, prodInfoById } from "@/api/modules";
import { ElMessage } from "element-plus";
const BaseUrl = import.meta.env.VITE_API_BASE_URL
const token = localStorage.getItem('token')
const liveStatus = { 1: '未开始', 2: '直播中', 3: '已结束', }
const tab = { 1: '特价', 2: '限时', 3: '新品', 4: '钜惠', 5: '秒杀', }
const putaway = { 0: '下架', 1: '上架', 2: '推荐', 3: '取消推荐', }
const parentBorder = ref(false)
const childBorder = ref(false)
const loading = ref(false)
const pages = ref({
    pageNo: 1,
    pageSize: 20,
    total: 0
})
let liveListData = ref([])
const getHuanTuoLiveList = async () => {
    loading.value = true
    const res = await huanTuoliveList({ ...pages.value })
    loading.value = false
    let data = res.data
    data.forEach(element => {
        if (!element.huanTuoGoodsInfos) {
            element.huanTuoGoodsInfos = []
        }
    });

    liveListData.value = data
    pages.value.total = data.length
}
const tableHandleSizeChange = (e) => {
    pages.value.pageSize = e
    getHuanTuoLiveList()
}
const tableHandleChange = (e) => {
    pages.value.pageNo = e
    getHuanTuoLiveList()
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
                    ElMessage({
                        showClose: false,
                        message: '添加直播间成功',
                        type: 'success',
                    })
                    closeEditOrCreateDialog()
                    getHuanTuoLiveList()
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

// 修改直播间商品状态
const editLiveProdStatus = async (course_id, scope) => {
    let params = { ...scope.row }
    params.course_id = course_id
    try {
        const res = await editHuanTuoLiveProdStatus({ ...params })
        if (res?.code === 0) {
            if (params.putaway == 0) {
                ElMessage({
                    showClose: false,
                    message: '下架成功',
                    type: 'success',
                })
            } else {
                ElMessage({
                    showClose: false,
                    message: '上架成功',
                    type: 'success',
                })
            }
            getHuanTuoLiveList()
        }
    } catch (error) {
    }
}

// 推流地址 obs地址
const getAddress = async (e, m) => {
    const res = await huanTuoPushStreamingAndObsAddress({ course_id: e })
    console.log(res)
    let url = ''
    if (m === 'push') {
        url = res.data.systemObsCode
    }
    else {
        url = res.data.systemObs
    }
    // 创建输入框
    let inputDom = document.createElement('input');
    // 给输入框value赋值
    inputDom.value = url;
    // 把input框添加到body上
    document.body.appendChild(inputDom);
    // 选中输入框中的内容
    inputDom.select();
    // 复制文字到剪切板
    const hasCopy = document.execCommand('Copy');
    console.log(hasCopy, 'hasCopy')
    ElMessage({
        type: hasCopy ? 'success' : 'error',
        message: hasCopy ? '复制成功' : '复制失败'
    });
    // 删除创建的dom节点
    document.body.removeChild(inputDom);
}

const addLiveProdDialogVisible = ref(false)

const showAddLiveProdDialog = (courseId) => {
    addLiveProdDialogVisible.value = true
    addLiveProdForm.value.courseId = courseId
    getProdList()
}
const addLiveProdFormRef = ref(null)
const addLiveProdForm = ref({
    type: 0, // 0普通商品 1 优惠券 2 礼品卡
    courseId: null,// 直播间ID
    name: null, // 商品名称
    img: null, //图片
    price: 0.00, //现价
    originalPrice: 0.00, //原价
    tab: 2, // 标签 默认传2 
    url: null, //商品链接  http://h5.hnspsd.com/#/pages/package-prod/pages/prod/prod?prodId=105
    putaway: 0,// 商品状态 0下架 1上架 2推荐 3取消推荐 默认0 下架
    pay: 1,// 购买方式 默认1 链接购买  
})

const liveProdRules = reactive({
    name: [
        { required: true, message: '商品名称不能为空', trigger: 'blur' },
    ],
    img: [
        { required: true, message: '商品图片不能为空', trigger: 'blur' },
    ],
    price: [
        { required: true, message: '商品现价不能为空', trigger: 'blur' },
    ],
    originalPrice: [
        { required: true, message: '商品原价不能为空', trigger: 'blur' },
    ],
    url: [
        { required: true, message: '商品链接不能为空', trigger: 'blur' },
    ],
    putaway: [
        { required: true, message: '请选择商品状态', trigger: 'blur' },
    ],
})

const handleSuccess = (response, file, fileList) => {
    addLiveProdForm.value.img = response
    ElMessage({
        showClose: false,
        message: '上传成功',
        type: 'success',
    })
}
const handleError = (err, file, fileList) => {
    ElMessage({
        showClose: false,
        message: '上传失败',
        type: 'danger'
    })
}

const beforeUpload = (file) => {
    const fileName = file.name;
    const fileType = fileName.substring(fileName.lastIndexOf('.'));
    const isOKType =
        fileType === '.jpg' ||
        fileType === '.png' ||
        fileType === '.jpeg' ||
        fileType === '.bmp' ||
        fileType === '.gif';
    if (!isOKType) {
        this.$message.error('图片格式只能为jpeg/png/jpg/bmp/gif');
    }

    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
        this.$message.error('图片大小不能超过 2MB!');
    }
    return isLt2M && isOKType;
}
const prodListData = ref([])
// 普通商品
const getProdListByName = async (query) => {
    if (addLiveProdForm.value.type == 0) {
        const res = await prodList({ name: query, pageNo: 1, pageSize: 100000000 })
        prodListData.value = res.data.list
    }
    if (addLiveProdForm.value.type == 1) {
        const res = await couponList({ name: query, pageNo: 1, pageSize: 100000000 })
        prodListData.value = res.data.list
    }
    if (addLiveProdForm.value.type == 2) {
        const res = await giftList({ name: query, pageNo: 1, pageSize: 100000000 })
        prodListData.value = res.data.list
    }
}

const getProdList = async () => {
    const res = await prodList({ pageNo: 1, pageSize: 5 })
    prodListData.value = res.data.list
}

// 优惠券
const getCouponList = async () => {
    const res = await couponList({ pageNo: 1, pageSize: 10 })
    prodListData.value = res.data.list
}
// 礼品卡
const getGiftList = async () => {
    const res = await giftList({ pageNo: 1, pageSize: 10 })
    prodListData.value = res.data.list
}

const liveProdChange = async (e) => {
    console.log(e)
    if (addLiveProdForm.value.type === 0) {
        let prodId = ''
        prodListData.value.forEach(element => {
            if (element.name === e) {
                addLiveProdForm.value.img = element.thumbail
                addLiveProdForm.value.url = "https://h5.hnliyue.cn/#/pages/package-prod/pages/prod/prod?prodId=" + element.id
                prodId = element.id
            }
        })
        const res = await prodInfoById({ goodsId: prodId })
        console.log(res)
        addLiveProdForm.value.originalPrice = res.data.adminGoodsSkuInputVOS[0].factoryPrice
        addLiveProdForm.value.price = res.data.adminGoodsSkuInputVOS[0].price
    }
    if (addLiveProdForm.value.type === 1) {
        prodListData.value.forEach(element => {
            if (element.name === e) {
                addLiveProdForm.value.url = "https://h5.hnliyue.cn/#/pages/package-user/pages/get-coupons/get-coupons?id=" + element.id
            }
        })
    }
    if (addLiveProdForm.value.type === 2) {
        prodListData.value.forEach(element => {
            if (element.name === e) {
                addLiveProdForm.value.url = "https://h5.hnliyue.cn/#/pages/package-user/pages/exchange-area/exchange-area?id=" + element.id
            }
        })
    }

}

const saveAddLiveProd = () => {
    addLiveProdFormRef.value.validate(async (valid) => {
        if (valid) {
            try {
                let params = {
                    courseId: addLiveProdForm.value.courseId,
                    name: addLiveProdForm.value.name,
                    img: addLiveProdForm.value.img,
                    price: addLiveProdForm.value.price,
                    originalPrice: addLiveProdForm.value.originalPrice,
                    tab: addLiveProdForm.value.tab,
                    url: addLiveProdForm.value.url,
                    putaway: addLiveProdForm.value.putaway,
                    pay: addLiveProdForm.value.pay
                }
                const res = await huanTuoAddLiveProd({ ...params })
                if (res?.code === 0) {
                    ElMessage({
                        showClose: false,
                        message: '添加直播商品成功',
                        type: 'success',
                    })
                    closeAddLiveProdDialog()
                    getHuanTuoLiveList()
                }
            } catch (error) {

            }
        } else {
            return false
        }
    })
}

const closeAddLiveProdDialog = () => {
    addLiveProdDialogVisible.value = false
    clearAddLiveProdForm()
}

const prodTypeChange = (e) => {
    console.log(e)
    prodListData.value = []
    addLiveProdForm.value.name = null
    addLiveProdForm.value.img = null
    addLiveProdForm.value.price = 0.00
    addLiveProdForm.value.originalPrice = 0.00
    addLiveProdForm.value.tab = 2
    addLiveProdForm.value.url = null
    addLiveProdForm.value.putaway = 0
    if (addLiveProdForm.value.type === 0) {
        getProdList()
    }
    if (addLiveProdForm.value.type === 1) {
        getCouponList()
    }
    if (addLiveProdForm.value.type === 2) {
        getGiftList()
    }
}

const clearAddLiveProdForm = () => {
    addLiveProdForm.value = {
        courseId: null,
        type: 0,
        name: null,
        img: null,
        price: 0.00,
        originalPrice: 0.00,
        tab: 2,
        url: null,
        putaway: 0,
        pay: 1,
    }
}

// 生成直播链接
const generateLiveLink = async (e, type) => {
    ElMessage({
        showClose: false,
        message: '成功',
        type: 'success',
    })
    const res = await generateHuanTuoLiveLink({ course_id: e, type: type })
}
const toHuanTuoAdmin = () => {
    window.open('https://console2.talk-fun.com/#/login?pid=64417', '_blank');

}

onMounted(() => {
    getHuanTuoLiveList()
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

<style scoped>
.image-uploader .avatar {
    width: 178px;
    height: 178px;
    display: block;
}
</style>

<style>
.image-uploader .el-upload {
    border: 1px dashed var(--el-border-color);
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    transition: var(--el-transition-duration-fast);
}

.image-uploader .el-upload:hover {
    border-color: var(--el-color-primary);
}

.el-icon.image-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    text-align: center;
}
</style>
