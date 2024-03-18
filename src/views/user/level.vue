<template>
    <el-card>
        <el-table v-loading="loading" :data="userLevelListData" style="width: 100%">
            <el-table-column prop="levelName" label="等级" />
            <el-table-column prop="levelAmount" label="所需金额" align="center" />
            <el-table-column label="等级边框" align="center">
                <template #default="scope">
                    <el-image  :src="scope.row.url" />
                </template>
            </el-table-column>
            <el-table-column prop="updateTime" label="更新时间" align="center" />
            <el-table-column prop="createTime" label="创建时间" align="center" />
        </el-table>
    </el-card>
</template>
<script setup>
import { onMounted, ref } from "vue";
import { userLevelList } from "../../api/modules";

const loading = ref(false)
let userLevelListData = ref([])
const getUserLevelList = async () => {
    loading.value = true
    const res = await userLevelList()
    loading.value = false
    userLevelListData.value = res.data
}

onMounted(() => {
    getUserLevelList()
})
</script>
<style lang="scss" scoped>
.el-image {
    border-radius: 50%;
    width: 60px;
    height: 60px;
}

.info {
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
</style>