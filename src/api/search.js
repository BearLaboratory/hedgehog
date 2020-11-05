import { createAPI } from '@/utils/request'

export const doSearchApi = data => createAPI('/search/doSearch', 'get', data)
