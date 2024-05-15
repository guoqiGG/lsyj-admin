<template>
    <el-dialog v-model="reissueRedEnvelopeVisible" title="补发红包" width="400px" @close="close">
        <el-form ref="reissueRedEnvelopeFormRef" :rules="reissueRedEnvelopeRules" :model="reissueRedEnvelopeForm"
            class="demo-form-inline" label-width="100px" :label-position="right">
            <el-form-item label="金额" prop="price">
                <el-input-number controls-position="right" v-model="reissueRedEnvelopeForm.price" placeholder="金额"
                    :precision="2" min="0.01" clearable style="width: 200px;" />
            </el-form-item>
            <el-form-item class="footer">
                <el-button type="primary" @click="reissueRedEnvelopeSave">保存</el-button>
                <el-button @click="close">关闭</el-button>
            </el-form-item>
        </el-form>
    </el-dialog>
</template>
<script setup>
import { reissueRedEnvelope } from "../../api/modules";
import { ref, reactive, defineEmits } from 'vue'
import { ElMessage } from "element-plus";

const props = defineProps({
    reissueRedEnvelopeVisible: { type: Boolean },
    id: { type: Number },
    reissueRedEnvelopeForm: { type: Object },
});
const emit = defineEmits(['closeReissueRedEnvelopeDialog'])
const reissueRedEnvelopeFormRef = ref()
const reissueRedEnvelopeRules = reactive({
    price: [{ required: true, message: '请输入补发金额', trigger: 'blur' }],
})

const reissueRedEnvelopeSave = async () => {
    reissueRedEnvelopeFormRef.value.validate(async (valid) => {
        if (valid) {
            const res = await reissueRedEnvelope({ userId: props.id, ...props.reissueRedEnvelopeForm, typeName: localStorage.getItem('UserInfo') })
            if (res?.code == 0) {
                ElMessage.success('补发成功')
                close()
            }
        } else {
            return false
        }
    })
}
const close = () => {
    emit('closeReissueRedEnvelopeDialog')
}
</script>