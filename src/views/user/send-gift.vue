<template>
    <el-dialog v-model="giftDialogVisible" title="送礼品券" width="500px" @close="close">
        <el-form ref="giftFormRef" :rules="giftRules" :model="giftForm" class="demo-form-inline" label-width="100px"
            :label-position="right">
            <el-form-item label="礼品卡" prop="giftId">
                <el-select v-model="giftForm.giftId" placeholder="请选择礼品卡" clearable filterable style="width: 200px;">
                    <el-option v-for="item in giftListData" :label="item.name" :value="item.id" />
                </el-select>
            </el-form-item>
            <el-form-item label="赠送数量" prop="num">
                <el-input-number v-model="giftForm.num" placeholder="赠送数量" controls-position="right" clearable style="width: 200px;"
                    min="1" />
            </el-form-item>
            <el-form-item class="footer">
                <el-button type="primary" @click="giftSave">保存</el-button>
                <el-button @click="close">关闭</el-button>
            </el-form-item>
        </el-form>
    </el-dialog>
</template>
<script setup>
import { giftList, userGiftAdd } from "../../api/modules";
import { ref, reactive, defineExpose, defineEmits } from 'vue'
const props = defineProps({
    giftDialogVisible: { type: Boolean },
    userInfo: { type: Object },
    giftForm: { type: Object },
});
const emit = defineEmits(['closeGiftDialog'])
const giftFormRef = ref()
const giftRules = reactive({
    giftId: [{ required: true, message: '请选择礼品卡', trigger: 'blur' }],
    num: [{ required: true, message: '赠送数量不能为空', trigger: 'blur' }],
})
const giftListData = ref([])
const getGiftList = async () => {
    const res = await giftList({ pageNo: 1, pageSize: 1000000 })
    giftListData.value = res.data.list
}
const giftSave = async () => {
    giftFormRef.value.validate(async (valid) => {
        if (valid) {
            const res = await userGiftAdd({ userId: props.userInfo.id, type: 1, ...props.giftForm })
            if (res.code == 0) {
                close()
            }
        } else {
            return false
        }
    })
}
const close = () => {
    emit('closeGiftDialog')
}
defineExpose({
    getGiftList
})
</script>