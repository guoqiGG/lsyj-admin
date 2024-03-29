<template>
    <el-dialog v-model="couponDialogVisible" title="送优惠券" width="70%" @close="close">
        <el-form ref="couponFormRef" :rules="couponRules" :model="couponForm" class="demo-form-inline"
            label-width="100px" :label-position="right">
            <el-form-item label="优惠券" prop="couponId">
                <el-select v-model="couponForm.couponId" placeholder="请选择优惠券" clearable filterable
                    style="width: 200px;">
                    <el-option v-for="item in couponListData" :label="item.name" :value="item.id" />
                </el-select>
            </el-form-item>
            <el-form-item label="赠送数量" prop="num">
                <el-input-number v-model="couponForm.num" placeholder="赠送数量" controls-position="right" clearable
                    style="width: 200px;" min="1" />
            </el-form-item>
            <el-form-item class="footer">
                <el-button type="primary" @click="couponSave">保存</el-button>
                <el-button @click="close">关闭</el-button>
            </el-form-item>
        </el-form>
    </el-dialog>
</template>
<script setup>
import { couponList, userCouponAdd } from "@/api/modules";
import { ref, reactive, defineExpose, defineEmits } from "vue";
const props = defineProps({
    couponDialogVisible: { type: Boolean },
    userInfo: { type: Object },
    couponForm: { type: Object },
});
const emit = defineEmits(["closeCouponDialog"]);
const couponFormRef = ref();
const couponRules = reactive({
    couponId: [{ required: true, message: "请选择优惠券", trigger: "blur" }],
    num: [{ required: true, message: "赠送数量不能为空", trigger: "blur" }],
});
const couponListData = ref([]);
const getCouponList = async () => {
    const res = await couponList({ pageNo: 1, pageSize: 1000000, status: 1 });
    couponListData.value = res.data.list;
};
const couponSave = async () => {
    couponFormRef.value.validate(async (valid) => {
        if (valid) {
            const res = await userCouponAdd({
                userId: props.userInfo.id,
                type: 1,
                ...props.couponForm,
            });
            if (res.code == 0) {
                close();
            }
        } else {
            return false;
        }
    });
};
const close = () => {
    emit("closeCouponDialog");
};
defineExpose({
    getCouponList,
});
</script>
