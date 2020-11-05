<template>
  <div class="content">
    <div class="background-img"
         :style="{'backgroundImage': 'url(' + indexInfo.backgroundImg + ')','background-size':'100% 100%'}"
    ></div>
    <div class="index-box">
      <el-row>
        <el-col :span="24">
          <div class="index-slogan">
            <span>{{ indexInfo.slogan }}</span>
          </div>
          <div class="index-time">
            <span>{{ date }}</span>
            <span class="index-time-time">{{ time }}</span>
          </div>
          <div class="index-search-box">
            <el-input v-model="keyword" placeholder="请输入搜索内容..." clearable @keyup.enter.native="doSearch"
                      class="local-input" ref="indexInput"></el-input>
            <el-button slot="append" type="primary" @click="doSearch">搜索</el-button>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import { getIndexInfo } from '@/utils/CacheUtil'

export default {
  name: 'Index',
  data () {
    return {
      indexInfo: {},
      backgroundImage: '',
      slogan: '',
      date: '',
      time: '',
      keyword: '',
      indexData: {}
    }
  },
  methods: {
    doSearch () {
      if (this.keyword.trim() !== '') {
        this.$router.push({
          path: '/search',
          query: { keyword: this.keyword.trim() }
        })
      }
    },
    getDate () {
      const date = new Date()
      const seperator1 = '-'
      const year = date.getFullYear()
      let month = date.getMonth() + 1
      let strDate = date.getDate()
      if (month >= 1 && month <= 9) {
        month = '0' + month
      }
      if (strDate >= 0 && strDate <= 9) {
        strDate = '0' + strDate
      }
      this.date = year + seperator1 + month + seperator1 + strDate
    },
    getTime () {
      const date = new Date()
      const hours = date.getHours()
      const minutes = date.getMinutes()
      const realH = hours < 10 ? '0' + hours : hours
      const realM = minutes < 10 ? '0' + minutes : minutes
      this.time = realH + ':' + realM
      var that = this
      this.timmer = setInterval(() => {
        const date = new Date()
        const hours = date.getHours()
        const minutes = date.getMinutes()
        const realH = hours < 10 ? '0' + hours : hours
        const realM = minutes < 10 ? '0' + minutes : minutes
        that.time = realH + ':' + realM
      }, 1000)
    },
    doGetIndex () {
      this.indexInfo = getIndexInfo()
      console.log(this.indexInfo)
    }
  },
  created () {
    // 获取时间
    this.getDate()
    // 获取时间
    this.getTime()
    this.doGetIndex()
  },
  mounted () {
    this.$refs.indexInput.focus()
  },
  beforeDestroy () {
    if (this.timmer) {
      clearInterval(this.timmer)
    }
  }
}
</script>

<style lang="scss" scoped>
.content {
  height: 100%;
  width: 100%;
  overflow: hidden;
  background-color: #D3D3D3;

  .background-img {
    height: 100%;
    width: 100%;
    background-size: 100% auto;
    background-repeat: no-repeat;
    filter: blur(5px);
    transform: scale(1.1);
  }

}

.index-box {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;

  .index-slogan {
    font-size: 40px;
    font-weight: bold;
    color: #FFFFFF;
  }

  .index-time {
    margin-top: 50px;
    display: flex;
    flex-direction: column;
    font-weight: bold;
    font-size: 40px;
    color: #EEEEEE;

    .index-time-time {
      font-size: 100px;
      padding: 0;
      color: #FFFFFF;
    }
  }

  .index-search-box {
    margin-top: 60px;
    display: flex;
    justify-content: center;
    text-align: center;

    .el-button {
      border-left: 0;
      width: 120px;
      border-radius: 0 5px 5px 0;
    }

  }
}

</style>
<style>
.local-input .el-input__inner {
  border-right: none;
  border-radius: 5px 0 0 5px;
}
</style>
