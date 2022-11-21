
import request from '@/utils/request.js'
export function getItems(params) {
    return request({
        url: '/rest/items/lists',
        method: 'get',
        params
    });
}
export function addItems(data) {
    return request({
        url: '/rest/items/add',
        method: 'post',
        data
    });
}
export function deletItems(id) {
    return request({
        url: `/rest/items/delet/${id}`,
        method: 'post'
    });
}
export function editItems(data, id) {
    return request({
        url: `/rest/items/edit/${id}`,
        method: 'post',
        data
    });
}
export function upphoto(data) {
    return request({
        url: '/upload',
        headers: { 'Content-Type': 'multipart/form-data' },
        method: 'post',
        data
    });
}
export function upphotoMultipart(data) {
    return request({
        url: '/uploadMultipart',
        headers: { 'Content-Type': 'multipart/form-data' },
        method: 'post',
        data
    });
}
export function uploadSlice(data) {
    return request({
        url: '/uploadSlice',
        headers: { 'Content-Type': 'multipart/form-data' },
        method: 'post',
        data
    });
}
export function merge(data) {
    return request({
        url: '/merge',
        method: 'post',
        data
    });
}