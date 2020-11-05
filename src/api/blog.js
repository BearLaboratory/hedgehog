import { createAPI } from '@/utils/request'

export const page = data => createAPI('/blog/page', 'get', data)
export const new10 = data => createAPI('/blog/new10', 'get', data)
export const top10 = data => createAPI('/blog/top10', 'get', data)
export const getById = data => createAPI('/blog/getById', 'get', data)
export const likeBlog = data => createAPI('/blog/likeBlog', 'post', data)
export const getIsLikeApi = data => createAPI('/blog/getIsLike', 'get', data)
