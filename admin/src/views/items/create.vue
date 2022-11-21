<template>
    <h2>新建物品</h2>
    <el-form :model="addFrom" label-width="120px">
        <el-form-item label="名称">
            <el-input v-model="addFrom.name"></el-input>
        </el-form-item>
        <el-form-item label="图标">
            <el-upload
                class="avatar-uploader"
                :action="`${baseURL}/upload`"
                :show-file-list="false"
                :on-success="handleAvatarSuccess"
                :before-upload="beforeAvatarUpload"
            >
                <img v-if="addFrom.icon" :src="addFrom.icon" class="avatar" />
                <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
            </el-upload>
        </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="onSubmit">立即创建</el-button>
            <el-button>取消</el-button>
        </el-form-item>
    </el-form>
</template>

<script setup>
import { Plus } from "@element-plus/icons-vue";
import { baseURL } from "@/utils/request";
import { addItems, editItems } from "../../api/items";
import { ElMessage } from "element-plus";
import { reactive, ref } from "vue";
import { useRouter, useRoute } from "vue-router";
const router = useRouter();
const route = useRoute();
// do not use same name with ref
const addFrom = reactive({
    name: route.query.name ? route.query.name : "",
    icon: route.query.icon ? route.query.icon : "",
});
const handleAvatarSuccess = (res) => {
    console.log("success", res);
    addFrom.icon = res.url;
};
const beforeAvatarUpload = () => {};
const onSubmit = () => {
    let apiNmae = route.query.id ? editItems : addItems;
    console.log("==", addFrom);
    apiNmae(addFrom, route.query.id).then((res) => {
        ElMessage({
            message: "添加成功",
            type: "success",
        });
        router.push({
            path: "./index",
        });
    });
};
</script>
<style scoped>
.avatar-uploader .avatar {
    width: 178px;
    height: 178px;
    display: block;
}
</style>

<style>
.avatar-uploader .el-upload {
    border: 1px dashed var(--el-border-color);
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    transition: var(--el-transition-duration-fast);
}

.avatar-uploader .el-upload:hover {
    border-color: var(--el-color-primary);
}

.el-icon.avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    text-align: center;
}
</style>
