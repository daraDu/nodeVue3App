<template>
    <el-container style="height: 100vh; border: 1px solid #eee">
        <el-aside width="200px" style="background-color: rgb(238, 241, 246)">
            <el-menu :default-active="activeIndex" unique-opened router>
                <el-sub-menu index="1">
                    <template #title>
                        <el-icon><Document /></el-icon>
                        <span> 内容管理 </span>
                    </template>
                    <el-menu-item-group title="分类">
                        <el-menu-item index="/category/index"
                            >分类列表</el-menu-item
                        >
                        <el-menu-item index="/category/create"
                            >创建分类</el-menu-item
                        >
                    </el-menu-item-group>
                    <el-menu-item-group title="物品">
                        <el-menu-item index="/items/index"
                            >物品列表</el-menu-item
                        >
                        <el-menu-item index="/items/create"
                            >创建物品</el-menu-item
                        >
                    </el-menu-item-group>
                </el-sub-menu>
                <el-sub-menu index="2">
                    <template #title>
                        <el-icon><Document /></el-icon>
                        <span> 运营管理 </span>
                    </template>
                    <el-menu-item-group title="账户">
                        <el-menu-item index="/users/index"
                            >账户列表</el-menu-item
                        >
                        <el-menu-item index="/users/create"
                            >创建账户</el-menu-item
                        >
                    </el-menu-item-group>
                </el-sub-menu>
                <el-sub-menu index="3">
                    <template #title>
                        <el-icon><Document /></el-icon>
                        <span> 上传 </span>
                    </template>
                    <el-menu-item-group title="上传">
                        <el-menu-item index="/upload/index">上传</el-menu-item>
                    </el-menu-item-group>
                </el-sub-menu>
            </el-menu>
        </el-aside>
        <el-container>
            <el-header
                style="
                    text-align: right;
                    font-size: 16px;
                    background-color: rgb(238, 241, 246);
                "
            >
                <div class="flxed">
                    <el-dropdown>
                        <span class="el-dropdown-link">
                            <el-icon :size="20"><Setting /></el-icon>
                        </span>
                        <template #dropdown>
                            <el-dropdown-menu>
                                <el-dropdown-item>退出登录</el-dropdown-item>
                                <el-dropdown-item> 清空缓存 </el-dropdown-item>
                            </el-dropdown-menu>
                        </template>
                    </el-dropdown>
                    <span style="margin-left: 10px">admin</span>
                </div>
            </el-header>
            <el-main>
                <router-view />
            </el-main>
        </el-container>
    </el-container>
</template>

<script setup lang="ts">
import {
    Document,
    Menu as IconMenu,
    Location,
    Setting,
} from "@element-plus/icons-vue";
import { computed } from "@vue/runtime-core";
import { useRouter, useRoute } from "vue-router";
const router = useRouter();
const route = useRoute();
const handleOpen = (key: string, keyPath: string[]) => {
    console.log(key, keyPath);
};
const handleClose = (key: string, keyPath: string[]) => {
    console.log(key, keyPath);
};

const activeIndex = computed(() => {
    return route.path;
});
</script>
<style scoped>
.flxed {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    height: 100%;
}
</style>