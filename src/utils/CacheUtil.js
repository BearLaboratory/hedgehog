/**
 * 将首页信息缓存至sessionStorage
 * @param indexInfo
 */
export function saveIndexInfo (indexInfo) {
  window.sessionStorage.setItem('indexInfo', JSON.stringify(indexInfo))
}

export function getIndexInfo () {
  return JSON.parse(window.sessionStorage.getItem('indexInfo'))
}
