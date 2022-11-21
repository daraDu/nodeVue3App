import request from '@/utils/request.js'


export function login (data) {
    return request({
        url: '/login',
        method: 'post',
        data
    });
}
export function getUsers (params) {
    return request({
        url: '/rest/adminUser/lists',
        method: 'get',
        params
    });
}
export function addUsers (data) {
    return request({
        url: '/rest/adminUser/add',
        method: 'post',
        data
    });
}
export function deletUsers (id) {
    return request({
        url: `/rest/adminUser/delet/${id}`,
        method: 'post'
    });
}
export function editUsers (data, id) {
    return request({
        url: `/rest/adminUser/edit/${id}`,
        method: 'post',
        data
    });
}