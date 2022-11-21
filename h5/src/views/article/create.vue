<template>
  <el-form :model="article" label-width="120px">
    <el-form-item label="项目标题">
      <el-input v-model="article.title"></el-input>
    </el-form-item>
    <el-form-item label="项目内容">
      <el-input type="textarea" v-model="article.body"></el-input>
    </el-form-item>
    <el-form-item label="项目类别">
      <el-radio-group v-model="article.type">
        <el-radio label="11"></el-radio>
        <el-radio label="22"></el-radio>
        <el-radio label="33"></el-radio>
        <el-radio label="44"></el-radio>
      </el-radio-group>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="onSubmit">立即创建</el-button>
      <el-button>取消</el-button>
    </el-form-item>
  </el-form>
</template>

<script lang="ts" setup>
import { reactive } from 'vue'

// do not use same name with ref
const article = reactive({
  title: '',
  body: '',
  type: '',
})

const onSubmit = () => {
  console.log('submit!')
}
</script>
