<template>
  <el-container>
    <el-header>
      <el-menu
        class="hidden-sm-and-down"
        :default-active="activePath"
        mode="horizontal"
        background-color="#000000"
        text-color="#909399"
        active-text-color="#ffffff"
      >
        <el-menu-item class="logo-box">
          <el-image :src="indexInfo.logoUrl" fit="scale-down" style="width:100px;height: 50px"></el-image>
        </el-menu-item>
        <el-menu-item index="index" @click="handleSelect('index')">主页</el-menu-item>
        <el-menu-item index="blog" @click="handleSelect('blog')">博客</el-menu-item>
        <!--        <el-menu-item index="video" @click="handleSelect('video')">视频</el-menu-item>-->
        <el-menu-item index="opensource" @click="handleSelect('opensource')">开源项目</el-menu-item>
        <el-menu-item index="donate" @click="handleSelect('donate')">捐助</el-menu-item>
      </el-menu>
      <el-menu
        class="hidden-md-and-up"
        mode="horizontal"
        background-color="#000000"
        text-color="#909399"
        active-text-color="#ffffff"
      >
        <el-menu-item>
          <i class="el-icon-menu" style="color: white;font-size: 25px" @click="sideMenuShow= !sideMenuShow"></i>
        </el-menu-item>

      </el-menu>

      <el-drawer
        size="50%"
        class="hidden-lg-and-up"
        :visible.sync="sideMenuShow"
        :with-header="false">
        <el-menu
          class="hidden-lg-and-up"
          :default-active="activePath"
          background-color="#000000"
          text-color="#909399"
          active-text-color="#ffffff"
        >
          <el-menu-item class="logo-box">
            <el-avatar shape="square" :size="50" :src="indexInfo.logoUrl"></el-avatar>
          </el-menu-item>
          <el-menu-item index="index" @click="handleSelect('index')">主页</el-menu-item>
          <el-menu-item index="blog" @click="handleSelect('blog')">博客</el-menu-item>
          <el-menu-item index="video" @click="handleSelect('video')">视频</el-menu-item>
          <el-menu-item index="opensource" @click="handleSelect('opensource')">开源项目</el-menu-item>
          <el-menu-item index="donate" @click="handleSelect('donate')">捐助</el-menu-item>
        </el-menu>
      </el-drawer>
      <div class="header-search-box hidden-sm-and-down" v-show="activePath!=='index'&&activePath!=='donate'">
        <el-input placeholder="请输入内容" v-model="keyword" @keyup.enter.native="doSeach"></el-input>
        <el-button type="primary" @click="doSeach">搜索</el-button>
      </div>
    </el-header>
    <el-main>
      <router-view/>
    </el-main>
  </el-container>
</template>

<script>
import 'element-ui/lib/theme-chalk/display.css'
import { indexInfoApi } from '@/api'
import { saveIndexInfo } from '@/utils/CacheUtil'

export default {
  name: 'FrontLayout',
  data () {
    return {
      indexInfo: {},
      activePath: '',
      keyword: '',
      sideMenuShow: false
    }
  },
  methods: {
    handleSelect (ac) {
      this.activePath = ac
      window.sessionStorage.setItem('activePath', ac)
      this.$router.push('/' + ac)
    },
    doSeach () {
      if (this.keyword.trim() !== '') {
        this.$router.push({
          path: '/search',
          query: { keyword: this.keyword }
        })
      }
    },
    doIndexInfo () {
      indexInfoApi().then(res => {
        if (res.status) {
          this.indexInfo = res.data
          saveIndexInfo(res.data)
        }
      })
    }
  },
  created () {
    this.doIndexInfo()
    const x = window.sessionStorage.getItem('activePath')
    this.activePath = (x == null ? 'index' : x)
  }
}
</script>

<style lang="scss" scoped>
.el-container {
  height: 100%;

  .el-header {
    padding: 0;
    background-color: #000000;
    display: flex;
    justify-content: space-between;

    .el-menu {
      border-bottom: 0;

      .logo-box {
        padding-left: 20px;
        padding-right: 30px;
        display: flex;
        align-items: center;
        cursor: inherit;
      }

      .el-menu {
        border-right: none;

      }
    }

    .header-search-box {
      display: flex;
      justify-content: center;
      align-items: center;
      padding-right: 20px;

      .el-button {
        margin-left: 5px;
      }
    }
  }

  .el-main {
    padding: 0;
  }

}

</style>
<style>
.el-drawer__body {
  background-color: black;

}

</style>
