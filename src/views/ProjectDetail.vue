<template>
  <div class="main-wrapper">
    <el-row>
      <el-col :span="24">
        <div class="header-wrapper"
             :style="{'background-image': 'url('+projData.headPic+')','background-size':'100%','background-repeat':'no-repeat','background':'rgba(0,0,0,0.5)'}">
          <div class="header-content-wrapper">
            <div><span>{{ projData.projName }}</span></div>
            <div class="desc-box"><span>{{ projData.projDesc }}</span></div>
            <div class="btn-box">
              <el-button type="warning" size="small" icon="el-icon-s-flag">跟随</el-button>
              <el-button type="danger" size="small" icon="el-icon-star-on">喜欢</el-button>
            </div>
          </div>
        </div>
      </el-col>
    </el-row>
    <el-row style="background-color: #757575;padding: 5px">
      <el-col :lg="8" :xl="8" class="hidden-sm-and-down" style="display: flex;justify-content: space-between">
        <div style="color: white;text-align: center">
          <div>1230</div>
          <div>浏览次数</div>
        </div>
        <div style="color: white;text-align: center">
          <div>1230</div>
          <div>评论数</div>
        </div>
        <div style="color: white;text-align: center">
          <div>1230</div>
          <div>跟随者</div>
        </div>
        <div style="color: white;text-align: center">
          <div>1230</div>
          <div>喜欢数</div>
        </div>
      </el-col>
      <el-col :xs="24" :sm="24" :md="24" :lg="16" :xl="16">
        233
      </el-col>
    </el-row>
    <el-row style="padding: 10px">
      <el-col :lg="8" :xl="8" class="hidden-sm-and-down" style="display: flex;justify-content: space-between">
        <div style="width: 100%">
          <div style="">
            <el-image
              src="https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png"></el-image>
          </div>
        </div>
      </el-col>
      <el-col :xs="24" :sm="24" :md="24" :lg="16" :xl="16">

      </el-col>
    </el-row>
  </div>
</template>

<script>

import { getByIdApi } from '@/api/opensource'

export default {
  name: 'ProjectDetail',
  data () {
    return {
      projData: {}
    }
  },
  methods: {
    doGetDetail () {
      const params = this.$route.params
      getByIdApi({ projId: params.projId }).then(res => {
        if (res.status) {
          this.projData = res.data
        }
      })
    }
  },
  created () {
    this.doGetDetail()
  }
}
</script>

<style lang="scss" scoped>
.main-wrapper {
  background-color: black;
  height: 100%;

  .header-wrapper {
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    background-color: black;
    padding: 40px;

    .header-content-wrapper {
      font-weight: bold;
      font-size: 40px;
      color: #ffffff;
      max-width: 800px;

      .desc-box {
        margin-top: 20px;
        font-size: 18px;
        font-weight: normal;
      }

      .btn-box {
        margin-top: 20px;
      }
    }
  }

}

</style>
