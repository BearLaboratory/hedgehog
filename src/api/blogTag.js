import { createAPI } from '@/utils/request'

export const tagList = data => createAPI('/blogTag/tagList', 'get', data)
