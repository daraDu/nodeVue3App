<template>
    <div>
        <input type="file" ref="btnFile" />
        <button @click="uploadFile(0)">上传</button>
    </div>
</template>

<script setup>
import { upphoto, uploadSlice, merge } from "@/api/items";
import { ref } from "vue";
const btnFile = ref(null);
const chunkSize = 1024 * 1024;
const uploadFile = (index) => {
    let file = btnFile.value.files[0];
    let fileNameArr = file.name.split(".");
    let fname = fileNameArr[0];
    let fext = fileNameArr[1];
    let start = index * chunkSize;
    if (start > file.size) {
        handlemerge(file.name);
        return;
    }
    let blob = file.slice(start, start + chunkSize);
    let blobName = `${fname}.${index}.${fext}`;
    let blobFile = new File([blob], blobName);
    let formData = new FormData();
    formData.append("file", blobFile);
    uploadSlice(formData).then((res) => {
        uploadFile(++index);
    });
};
const handlemerge = (name) => {
    merge({ name }).then((res) => {
        console.log(res);
    });
};
</script>
<style lang='scss' scoped>
</style>