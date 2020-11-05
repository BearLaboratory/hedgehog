import { createAPI } from '@/utils/request'

export const loginApi = data => createAPI('/customer/login', 'post', data)
export const registApi = data => createAPI('/customer/regist', 'post', data)
