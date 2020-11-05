import { createAPI } from '@/utils/request'

export const login = data => createAPI('/sysUser/login', 'post', data)
