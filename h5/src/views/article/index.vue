<template>
    <el-button type="primary" @click="createArticle" class="addBtn">新建</el-button>
    <el-table :data="tableData" style="width: 100%" border >
        <el-table-column prop="date" label="Date" width="180" />
        <el-table-column prop="name" label="Name" width="180" />
        <el-table-column prop="address" label="Address" />
    </el-table>
</template>

<script lang='ts' setup>
import { useRouter } from 'vue-router'
const router = useRouter()
const tableData = [
    {
        date: "2016-05-03",
        name: "Tom",
        address: "No. 189, Grove St, Los Angeles",
    },
    {
        date: "2016-05-02",
        name: "Tom",
        address: "No. 189, Grove St, Los Angeles",
    },
    {
        date: "2016-05-04",
        name: "Tom",
        address: "No. 189, Grove St, Los Angeles",
    },
    {
        date: "2016-05-01",
        name: "Tom",
        address: "No. 189, Grove St, Los Angeles",
    },
];
const createArticle = () =>{
    router.push({
        path: '/article/create'
    })
}
</script>
<style scoped>
.addBtn{
    margin-bottom: 20px;
}
</style>