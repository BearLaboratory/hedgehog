<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>

import { getToken } from '@/utils/TokenUtil'
import { mapMutations, mapState } from 'vuex'

export default {
  name: 'app',
  methods: {
    ...mapMutations(['saveToken']),
    loadToken () {
      const token = getToken()
      this.saveToken(token)
      window.addEventListener('beforeunload', e => {
        // window.sessionStorage.setItem('token', this.token)
      })
    }
  },
  computed: {
    ...mapState(['token'])
  },
  created () {
    // 页面加载是将sessionstorage中的token放到vuex,在页面卸载前写入sessionstorage
    this.loadToken()
  }
}
</script>

<style>
@import './assets/global.css';

::-webkit-scrollbar {
  width: 0;
  height: 5px;
  background-color: #ffffff;
}

/* 滚动槽 */
::-webkit-scrollbar-track {
  border-radius: 10px;
}

::-webkit-scrollbar-thumb {
  background-color: #bfc1c4;
}
</style>
