import { createAPI } from '@/utils/request'

export const addComment = data => createAPI('/comment/add', 'post', data)
export const commentList = data => createAPI('/comment/commentList', 'get', data)
