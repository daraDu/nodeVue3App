<template>
    <h2>物品列表</h2>
    <el-button type="primary" @click="handleAdd" class="addBtn">新建</el-button>
    <el-table :data="tableData" style="width: 100%" border >
        <el-table-column prop="name" label="物品名称" width="180" />
        <el-table-column label="物品图片" width="120">
            <template #default="scope">
                <img :src="scope.row.icon"/>
            </template>
        </el-table-column>
        <el-table-column fixed="right" label="操作" width="120">
            <template #default="scope">
                <el-button link type="primary" size="small" @click="handleEdit(scope.row)">Edit</el-button>
                <el-button link type="primary" size="small" @click="handleDel(scope.row)">删除</el-button>
            </template>
        </el-table-column>
    </el-table>
</template>

<script setup>
import {getItems, deletItems} from '@/api/items'
import { reactive, ref, toRefs } from 'vue';
import { useRouter } from 'vue-router'
const router = useRouter()
let tableData = ref([]);
const handleAdd = () =>{
    router.push({
        path: './create'
    })
}
const getLists = () =>{
    getItems().then(res=>{
        tableData.value = res.data
    })
}
getLists()
const handleDel = (row)=>{
    console.log('==', row)
    deletItems(row._id).then(res=>{
        getLists()
    })
}
const handleEdit = (row)=>{
    router.push({
        path: './create',
        query: {
            id: row._id,
            name: row.name
        }
    })
}
</script>
<style scoped>
.addBtn{
    margin-bottom: 20px;
}
</style>