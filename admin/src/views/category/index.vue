<template>
    <el-button type="primary" @click="createArticle" class="addBtn">新建</el-button>
    <el-table :data="tableData" style="width: 100%" border >
        <el-table-column prop="name" label="类型名称" width="180" />
        <el-table-column prop="parent.name" label="上级分类" width="300" />
        <el-table-column fixed="right" label="操作" width="120">
        <template #default="scope">
            <el-button link type="primary" size="small" @click="handleEdit(scope.row)">Edit</el-button>
            <el-button link type="primary" size="small" @click="handleDel(scope.row)">删除</el-button>
        </template>
        </el-table-column>
    </el-table>
</template>

<script setup>
import {getCategories, categoriesDelet, categoriesEdit} from '@/api/category'
import { reactive, ref, toRefs } from 'vue';
import { useRouter } from 'vue-router'
const router = useRouter()
let tableData = ref([]);
const createArticle = () =>{
    router.push({
        path: '/category/create'
    })
}
const getLists = () =>{
    getCategories().then(res=>{
        tableData.value = res.data
        console.log('tableData===', tableData)
    })
}
getLists()
const handleDel = (row)=>{
    console.log('==', row)
    categoriesDelet(row._id).then(res=>{
        getLists()
    })
}
const handleEdit = (row)=>{
    router.push({
        path: '/category/create',
        query: {
            id: row._id,
            name: row.name,
            parentId: row.parent._id
        }
    })
}
</script>
<style scoped>
.addBtn{
    margin-bottom: 20px;
}
</style>