
import request from '@/utils/request.js'
export function getCategories (params) {
    return request({
        url: '/rest/categories/lists',
        method: 'get',
        params
    });
}
export function addCategories (data) {
    return request({
        url: '/rest/categories/add',
        method: 'post',
        data
    });
}
export function categoriesDelet (id) {
    return request({
        url: `/rest/categories/delet/${id}`,
        method: 'post'
    });
}
export function editCategories (data, id) {
    return request({
        url: `/rest/categories/edit/${id}`,
        method: 'post',
        data
    });
}