import { createAPI } from '@/utils/request'

export const typeList = data => createAPI('/blogType/typeList', 'get', data)
