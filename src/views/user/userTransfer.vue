<template>
    <el-dialog v-model="userTransferDialogVisible" title="送青春豆" width="500px" @close="close">
        <el-form ref="userTransferFormRef" :rules="userTransferRules" :model="userTransferForm" class="demo-form-inline"
            label-width="100px" :label-position="right">
            <el-form-item label="手机号" prop="mobile">
                <el-input v-model="userTransferForm.mobile" placeholder="手机号" clearable />
            </el-form-item>
            <el-form-item class="footer">
                <el-button type="primary" @click="userTransferSave">保存</el-button>
                <el-button @click="close">关闭</el-button>
            </el-form-item>
        </el-form>
    </el-dialog>
</template>
<script setup>
import { userTransfer } from "../../api/modules";
import { ref, reactive, defineExpose, defineEmits } from 'vue'
import { ElMessage } from "element-plus";
import { checkPhoneNumber } from "../../utils/index"
const props = defineProps({
    userTransferDialogVisible: { type: Boolean },
    id: { type: Number },
    userTransferForm: { type: Object },
});
const emit = defineEmits(['closeUserTransferDialog'])
const userTransferFormRef = ref()
const userTransferRules = reactive({
    mobile: [{ required: true, message: '请输入要转移的手机号', trigger: 'blur' }],
})

const userTransferSave = async () => {
    if (!checkPhoneNumber) {
        ElMessage.error('手机号格式不争取')
        return
    }
    userTransferFormRef.value.validate(async (valid) => {
        if (valid) {
            const res = await userTransfer({ id: props.id, ...props.userTransferForm })
            if (res?.code == 0) {
                ElMessage.success('转移成功')
                close()
            }
        } else {
            return false
        }
    })
}
const close = () => {
    emit('closeUserTransferDialog')
}
</script>