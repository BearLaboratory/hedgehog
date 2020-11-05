export function getToken () {
  return window.sessionStorage.getItem('token')
}

export function saveUToken (utoken) {
  window.sessionStorage.setItem('utoken', utoken)
}

export function clearUToken () {
  window.sessionStorage.removeItem('utoken')
}
