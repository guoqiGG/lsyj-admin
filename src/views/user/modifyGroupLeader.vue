<template>
    <el-dialog v-model="modifyGroupLeaderVisible" title="修改团长" width="400px" @close="close">
        <el-form ref="modifyGroupLeaderFormRef" :rules="modifyGroupLeaderRules" :model="modifyGroupLeaderForm"
            class="demo-form-inline" label-width="100px" :label-position="right">
            <el-form-item label="选择团长" prop="parentUserId">
                <el-select v-model="modifyGroupLeaderForm.parentUserId" filterable placeholder="请选择团长" clearable
                    @change="change">
                    <el-option v-for="item in leaderListData" :key="item.puid" :label="item.leaderName"
                        :value="item.puid" />
                </el-select>
            </el-form-item>
            <el-form-item class="footer">
                <el-button type="primary" @click="modifyGroupLeaderSave">保存</el-button>
                <el-button @click="close">关闭</el-button>
            </el-form-item>
        </el-form>
    </el-dialog>
</template>
<script setup>
import { modifyGroupLeader, leaderList } from "../../api/modules";
import { ref, reactive, defineEmits } from 'vue'
import { ElMessage } from "element-plus";

const props = defineProps({
    modifyGroupLeaderVisible: { type: Boolean },
    id: { type: Number },
    modifyGroupLeaderForm: { type: Object },
});
const emit = defineEmits(['closeModifyGroupLeaderDialog', 'editUserLeaderInfo'])
const modifyGroupLeaderFormRef = ref()
const modifyGroupLeaderRules = reactive({
    parentUserId: [{ required: true, message: '请选择团长', trigger: 'blur' }],
})

const leaderListData = ref([])
const getLeaderList = async () => {
    const res = await leaderList({ pageNo: 1, pageSize: 1000000 })
    leaderListData.value = res.data.list
}

const leaderInfo = ref({
    leaderName: null,
    leaderMobile: null
})

const change = (e) => {
    leaderListData.value.forEach(element => {
        if (element.puid == e) {
            leaderInfo.value.leaderName = element.leaderName
            leaderInfo.value.leaderMobile = element.leaderMobile
        }
    });
}

const modifyGroupLeaderSave = () => {
    modifyGroupLeaderFormRef.value.validate(async (valid) => {
        if (valid) {
            const res = await modifyGroupLeader({ id: props.id, ...props.modifyGroupLeaderForm })
            if (res?.code == 0) {
                ElMessage.success('修改成功')
                emit('editUserLeaderInfo', leaderInfo.value)
                close()
            }
        } else {
            return false
        }
    })
}
const close = () => {
    leaderInfo.value.leaderName = null
    leaderInfo.value.leaderMobile = null
    emit('closeModifyGroupLeaderDialog')

}
defineExpose({
    getLeaderList
})
</script>