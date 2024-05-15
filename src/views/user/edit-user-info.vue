<template>
    <el-dialog v-model="editOrCreateDialogVisible" title="编辑" width="800px" @close="close">
        <el-divider class="divider" content-position="left">用户信息</el-divider>
        <div class="userInfo">
            <el-image :src="userInfo.avatar" style="width: 80px; border-radius: 10px"></el-image>
            <div class="infos">
                <div>用户昵称：{{ userInfo.name }}</div>
                <div>用户手机：{{ userInfo.mobile }}</div>
                <div>注册时间：{{ userInfo.regTime }}</div>
            </div>
            <div class="infos">
                <div>会员等级：{{ userInfo.levelName }}</div>
                <div>青春豆数：{{ userInfo.score }}</div>
            </div>
            <div class="infos">
                <div>团长姓名：{{ userInfo.leaderName || "null" }}</div>
                <div>团长手机：{{ userInfo.leaderMobile || "null" }}</div>
            </div>

        </div>
        <div>
            <div class="infos" style="display: flex;  align-items: center">
                <el-button type="primary" @click="openCouponDialog">送优惠券</el-button>
                <el-button style="margin-left: 10px" type="primary" @click="openGiftDialog">送礼品券</el-button>
                <el-button style="margin-left: 10px" type="primary" @click="openScoreDialog">送青春豆</el-button>
                <el-button style="margin-left: 10px" type="primary" @click="openUserTransferDialog">转移用户</el-button>
                <el-button style="margin-left: 10px" type="primary"
                    @click="openReissueRedEnvelopeDialog">补发红包</el-button>
            </div>
        </div>
        <el-divider class="divider" content-position="left">其他信息</el-divider>
        <el-button type="primary" @click="toUserOrder(userInfo.id)">购物明细</el-button>
        <el-button type="primary" @click="toUserGift(userInfo.id)">礼品卡明细</el-button>
        <el-button type="primary" @click="toUserCompositeGift(userInfo.id)">合成卡明细</el-button>
        <el-button type="primary" @click="toUserCoupon(userInfo.id)">优惠券明细</el-button>
        <el-button type="primary" @click="toUserExchange(userInfo.id)">兑换(青春豆)明细</el-button>
        <el-button type="primary" @click="toUserRedEnvelope(userInfo.id)">红包明细</el-button>
    </el-dialog>
    <send-gift ref="giftFormRef" :userInfo="userInfo" :giftDialogVisible="giftDialogVisible" :giftForm="giftForm"
        @closeGiftDialog="closeGiftDialog"></send-gift>
    <send-coupon ref="couponFormRef" :userInfo="userInfo" :couponDialogVisible="couponDialogVisible"
        :couponForm="couponForm" @closeCouponDialog="closeCouponDialog"></send-coupon>
    <send-score ref="scoreFormRef" :userInfo="userInfo" :scoreDialogVisible="scoreDialogVisible" :scoreForm="scoreForm"
        @closeScoreDialog="closeScoreDialog" @editUserScoreNum="editUserScoreNum"></send-score>
    <user-transfer ref="userTransferFormRef" :id="userInfo.id" :userTransferDialogVisible="userTransferDialogVisible"
        :userTransferForm="userTransferForm" @closeUserTransferDialog="closeUserTransferDialog"></user-transfer>

    <ReissueRedEnvelope ref="reissueRedEnvelopeFormRef" :id="userInfo.id"
        :reissueRedEnvelopeVisible="reissueRedEnvelopeVisible" :reissueRedEnvelopeForm="reissueRedEnvelopeForm"
        @closeReissueRedEnvelopeDialog="closeReissueRedEnvelopeDialog">
    </ReissueRedEnvelope>
</template>
<script setup>
import SendGift from './send-gift.vue'
import SendCoupon from './send-coupon.vue'
import SendScore from './send-score.vue'
import UserTransfer from './userTransfer.vue'
import ReissueRedEnvelope from './reissueRedEnvelope.vue'
import { ref, defineEmits } from 'vue'
import { useRouter } from 'vue-router';
const router = useRouter()
const props = defineProps({
    editOrCreateDialogVisible: { type: Boolean },
    userInfo: { type: Object },
    active: { type: String }
});
const emit = defineEmits(['closeDialog'])
const isChange = ref(false)
const close = () => {
    if (isChange.value) {
        emit('closeDialog', 1)
    } else {
        emit('closeDialog')
    }
    isChange.value = false
}


const giftDialogVisible = ref(false)
const giftFormRef = ref()
const giftForm = ref({ giftId: '', num: '' })

const openGiftDialog = () => {
    giftDialogVisible.value = true
    giftFormRef.value.getGiftList()
}

const closeGiftDialog = () => {
    giftForm.value.num = ''
    giftForm.value.giftId = ''
    giftDialogVisible.value = false
}

const couponDialogVisible = ref(false)
const couponFormRef = ref()
const openCouponDialog = () => {
    couponDialogVisible.value = true
    couponFormRef.value.getCouponList()
}
const couponForm = ref({ couponId: '', num: '' })
const closeCouponDialog = () => {
    couponForm.value.num = ''
    couponDialogVisible.value = false
}

const scoreDialogVisible = ref(false)
const scoreFormRef = ref()
const openScoreDialog = () => {
    scoreDialogVisible.value = true
}
const scoreForm = ref({ num: '' })
const closeScoreDialog = () => {
    scoreForm.value.num = ''
    scoreDialogVisible.value = false
}

const userTransferDialogVisible = ref(false)
const userTransferFormRef = ref()
const openUserTransferDialog = () => {
    userTransferDialogVisible.value = true
}
const userTransferForm = ref({ mobile: null })
const closeUserTransferDialog = () => {
    userTransferForm.value.mobile = null
    userTransferDialogVisible.value = false
}

const reissueRedEnvelopeVisible = ref(false)
const reissueRedEnvelopeFormRef = ref()
const openReissueRedEnvelopeDialog = () => {
    reissueRedEnvelopeVisible.value = true
}

const reissueRedEnvelopeForm = ref({ price: null })
const closeReissueRedEnvelopeDialog = () => {
    reissueRedEnvelopeForm.value.price = null
    reissueRedEnvelopeVisible.value = false
}

// 送豆成功后 虚拟修改用户的豆数量
const editUserScoreNum = () => {
    props.userInfo.score = props.userInfo.score + scoreForm.value.num
    isChange.value = true
}

const toUserOrder = (userId) => {
    router.push({
        path: '/orderList',
        query: {
            userId: userId
        }
    })
}
const toUserGift = (userId) => {
    router.push({
        path: '/userGiftCardList',
        query: {
            userId: userId
        }
    })
}
const toUserCompositeGift = (userId) => {
    router.push({
        path: '/userCompositeCardList',
        query: {
            userId: userId
        }
    })
}
const toUserCoupon = (userId) => {
    router.push({
        path: '/userCouponList',
        query: {
            userId: userId
        }
    })
}
const toUserExchange = (userId) => {
    router.push({
        path: '/exchangeRecord',
        query: {
            userId: userId
        }
    })
}
const toUserRedEnvelope = (userId) => {
    router.push({
        path: '/transferList',
        query: {
            userId: userId
        }
    })
}
</script>
<style lang="scss" scoped>
.infos {
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

.userInfo {
    display: flex;
    flex-direction: row;
    align-items: center;

    .infos {
        margin-left: 50px;
        font-size: 12px;
        text-align: left;
        color: #010101;

        div {
            margin-top: 10px;
            white-space: nowrap;

            &:nth-child(1) {
                margin-top: 0;
            }
        }
    }
}
</style>
