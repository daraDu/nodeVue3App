<template>
    <div class="common-layout">
        <el-container style="height: 94vh; border: 1px solid #eee">
            <el-aside
                width="200px"
                style="background-color: rgb(238, 241, 246)"
            >
                <el-menu :default-active="activeIndex" unique-opened router>
                    <el-sub-menu index="1">
                        <template #title>
                            <el-icon><Document /></el-icon>
                            <span> 项目管理 </span> 
                        </template>
                        <el-menu-item-group>
                            <el-menu-item index="/article/index"
                                >项目列表</el-menu-item
                            >
                            <el-menu-item index="/article/create"
                                >创建项目</el-menu-item
                            >
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
    </div>
</template>

<script setup lang="ts">
import {
    Document,
    Menu as IconMenu,
    Location,
    Setting,
} from "@element-plus/icons-vue";
import { computed } from "@vue/runtime-core";
import {useRouter, useRoute} from 'vue-router'
const router = useRouter()
const route = useRoute()
const handleOpen = (key: string, keyPath: string[]) => {
    console.log(key, keyPath);
};
const handleClose = (key: string, keyPath: string[]) => {
    console.log(key, keyPath);
};

const activeIndex = computed(()=>{
    return route.path
})
</script>
<style scoped>
.flxed {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    height: 100%;
}
</style>