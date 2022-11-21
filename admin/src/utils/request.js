import { devConfig, proConfig } from './config'
import axios from 'axios';
import { ElMessage } from 'element-plus'
import router from '../router'
// 根据环境判断
export const baseURL = process.env.NODE_ENV === 'development' ? devConfig.baseUrl : proConfig.baseUrl;

const service = axios.create({
    baseURL,
    timeout: 5000 // 请求超时时间
});
service.interceptors.request.use(response => {
    //   response.headers 
    response.headers.Authorization = localStorage.myAppToken ? `Bearer ${localStorage.myAppToken}` : ''
    console.log('=====response====', response.headers['Content-Type']);
    return response;
})
service.interceptors.response.use(
    response => {
        const code = response.data.code
        if (code == '200' || !code) {
            return response.data
        } else if (code == 401) {
            ElMessage({
                message: response.data.msg,
                type: 'error',
            })
            router.push('/login')
            return
        } else {
            ElMessage({
                message: response.data.msg,
                type: 'error',
            })
            return false
        }
    }
)
export default service;