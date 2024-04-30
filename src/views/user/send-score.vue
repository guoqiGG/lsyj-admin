<template>
    <el-dialog v-model="scoreDialogVisible" title="送青春豆" width="500px" @close="close">
        <el-form ref="scoreFormRef" :rules="scoreRules" :model="scoreForm" class="demo-form-inline" label-width="100px"
            :label-position="right">
            <el-form-item label="赠送数量" prop="num">
                <el-input-number v-model="scoreForm.num" placeholder="赠送数量" controls-position="right" clearable
                    style="width: 200px;" min="0" />
            </el-form-item>
            <el-form-item class="footer">
                <el-button type="primary" @click="scoreSave">保存</el-button>
                <el-button @click="close">关闭</el-button>
            </el-form-item>
        </el-form>
    </el-dialog>
</template>
<script setup>
import { userScoreAdd } from "../../api/modules";
import { ref, reactive, defineExpose, defineEmits } from 'vue'
import { ElMessage } from "element-plus";
const props = defineProps({
    scoreDialogVisible: { type: Boolean },
    userInfo: { type: Object },
    scoreForm: { type: Object },
});
const emit = defineEmits(['closeScoreDialog','editUserScoreNum'])
const scoreFormRef = ref()
const scoreRules = reactive({
    num: [{ required: true, message: '赠送青春豆数量不能为空', trigger: 'blur' }],
})

const scoreSave = async () => {
    scoreFormRef.value.validate(async (valid) => {
        if (valid) {
            const res = await userScoreAdd({ userId: props.userInfo.id,  adminName:JSON.parse(localStorage.getItem('UserInfo')), ...props.scoreForm })
            if (res.code == 0) {
                ElMessage.success('赠送成功')
                emit('editUserScoreNum')
                close()
            }
        } else {
            return false
        }
    })
}
const close = () => {
    emit('closeScoreDialog')
}
</script>