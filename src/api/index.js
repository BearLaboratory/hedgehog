import { createAPI } from '@/utils/request'

export const indexInfoApi = data => createAPI('/index/indexInfo', 'get', data)
