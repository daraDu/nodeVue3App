<template>
  <h2> 新建分类 </h2>
  <el-form :model="category" label-width="120px">
    <el-form-item label="父级分类">
      <el-select v-model="category.parent" placeholder="请选择父级分类">
        <el-option :label="item.name" :value="item._id" v-for="item in parentOptions" :key="item.id"/>
      </el-select>
    </el-form-item> 
    <el-form-item label="名称">
      <el-input v-model="category.name"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="onSubmit">立即创建</el-button>
      <el-button>取消</el-button>
    </el-form-item>
  </el-form>
</template>

<script setup>
import {addCategories, editCategories, getCategories} from '../../api/category'
import { ElMessage } from 'element-plus'
import { reactive, ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
const router = useRouter()
const route = useRoute()
console.log('route===', route)
// do not use same name with ref
const category = reactive({
  name: route.query.name ? route.query.name : '',
  parent: route.query.parentId ? route.query.parentId : ''
})
const parentOptions = ref([])
/* const handleEdit = (row)=>{
    console.log('==', row)
    categoriesEdit(row._id).then(res=>{
        getLists()
    })
} */
const getParents = () =>{
    getCategories().then(res=>{
        parentOptions.value = res.data
    })
}
getParents()
const onSubmit = () => {
  let apiNmae = route.query.id ? editCategories : addCategories
  console.log('==', category);
  apiNmae( category, route.query.id ).then(res=>{
      ElMessage({
         message: '添加成功',
        type: 'success',
      })
      router.push({
        path: '/category/index'
      })
    })
}
</script>
