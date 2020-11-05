import { createAPI } from '@/utils/request'

export const frontPageApi = data => createAPI('/opensource/frontPage', 'get', data)
export const getByIdApi = data => createAPI('/opensource/getById', 'get', data)
export const listForDonateApi = data => createAPI('/opensource/listForDonate', 'get', data)
