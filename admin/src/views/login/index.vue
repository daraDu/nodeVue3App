<template>
    <div class="login-container">
        <div class="login">
            <h3>工时系统</h3>
            <el-form :model="info" label-width="120px">
                <el-form-item label="用户名">
                    <el-input v-model="info.name" placeholder="请输入用户名" />
                </el-form-item>
                <el-form-item label="密码">
                    <el-input
                        v-model="info.password"
                        type="password"
                        placeholder="请输入密码"
                        show-password
                    />
                </el-form-item>
                <el-button type="primary" @click="handleLogin" class="submitBtn">登录</el-button>
            </el-form>
        </div>  
    </div>
</template>

<script setup>
import { ref } from "vue";
import {login} from "@/api/user.js"
import { useRouter } from 'vue-router'
const router = useRouter()
let info = ref({
    name: 'admin',
    password: 123456
});
const handleLogin = () => {
    const {name, password} = info.value
    console.log(name, password);
    login({name, password}).then(res=>{
        console.log('===');
        localStorage.setItem('myAppToken', res.token)
        router.push('/')
    })
};
</script>

<style lang="less">
.login-container {
    background-color: #2d3a4b;
    min-height: 100vh;
    position: relative;
    text-align: center;
    h3 {
        padding-bottom: 20px;
    }
    .login {
        width: 520px;
        max-width: 100%;
        padding: 60px 35px;
        background: #fff;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translateX(-50%) translateY(-50%);
    }
    .submitBtn{
        width: 200px;
        height: 40px;
        margin: 20px auto;
    }
}
</style>