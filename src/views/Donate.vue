<template>
  <div class="content">
    <div class="desc-box">
      <div class="desc-header-box">
        <span>为什么我需要你的捐助？</span>
      </div>
      <div class="desc-header-body">
        <span>
       {{ whyINeed }}
      </span>
      </div>
      <div class="opensource-desc-box">
        <span>开源项目及进度</span>
        <el-divider><i class="el-icon-menu" style="color: #9E9E9E"></i></el-divider>
        <div class="project-item" v-for="project in projectList" :key="project.id" @click="toDetail(project)">
          <div class="project-item-header">
            <el-avatar shape="square" size="medium"
                       :src="project.headPic"></el-avatar>
            <div class="project-item-desc">
              <span>{{ project.projName }}</span>
            </div>
          </div>
          <div class="project-item-progress">
            <el-progress :text-inside="true" :stroke-width="26" :percentage="project.progress"
                         :color="customColorMethod"></el-progress>
          </div>
        </div>
      </div>
    </div>
    <div class="pay-box">
      <div>
        <div class="pay-item-box">
          <div class="item-header">
            <span>微信捐助</span>
            <span class="sub">微信支付捐助</span>
          </div>
          <img src="../assets/weixin-pay.png" width="200"/>
        </div>

        <div class="pay-item-box margin">
          <div class="item-header">
            <span>支付宝捐助</span>
            <span class="sub">支付宝捐助</span>
          </div>
          <img src="../assets/alipay-pay.jpg" width="200" alt="支付宝捐助"/>
        </div>
      </div>

    </div>
  </div>

</template>

<script>
import { listForDonateApi } from '@/api/opensource'

export default {
  name: 'Donate',
  data () {
    return {
      whyINeed: ' 由于开源项目需要消耗大量时间及精力进行开发，然而不管是开发完成还是开发过程中，我个人是没有任何收入的，为了能促进\n' +
        '        我更好的进行开发，也为了能给大家带来更多更好玩、更实用的东西，在这里厚着脸皮想大家请求对我个人进行捐赠。捐赠不在\n' +
        '        多少，如果你觉我的项目对您有所帮组自己经济又允许那么您可以多捐赠，如果只是鼓励我，那您也可以请我喝一瓶肥宅快乐水\n' +
        '        对于捐赠后的您将获得DIY项目的优先购买权，以及相关资料。',
      projectList: []
    }
  },
  methods: {
    /**
     * 查询捐助也的开源项目集合
     */
    doListForDonate () {
      listForDonateApi().then(res => {
        if (res.status) {
          this.projectList = res.data
        }
      })
    },
    /**
     * 自定义颜色方法，动态计算颜色
     * @param percentage 百分比
     * @returns {string} 颜色值
     */
    customColorMethod (percentage) {
      // 0-20 20-40 40-60 60-80 80-100
      if (percentage < 20) {
        return '#f56c6c'
      } else if (percentage >= 20 && percentage < 40) {
        return '#e6a23c'
      } else if (percentage >= 40 && percentage < 60) {
        return '#6f7ad3'
      } else if (percentage >= 60 && percentage < 80) {
        return '#1989fa'
      } else {
        return '#5cb87a'
      }
    },
    /**
     * 跳转开源项目详情
     * @param project
     */
    toDetail (project) {
      this.$router.push('/projectDetail/' + project.id)
    }
  },
  created () {
    this.doListForDonate()
  }
}
</script>

<style lang="scss" scoped>
.content {
  height: 100%;
  width: 100%;
  display: flex;
  padding-top: 40px;

  .desc-box {
    width: 70%;
    display: flex;
    flex-direction: column;
    text-align: center;

    .desc-header-box {
      font-size: 36px;
      font-weight: bold;
      color: #757575;
    }

    .desc-header-body {
      margin-top: 20px;
      padding-left: 50px;
      padding-right: 50px;
      text-align: left;
      font-size: 18px;
      color: #999999;
    }

    .opensource-desc-box {
      padding: 50px;
      text-align: left;
      font-size: 20px;
      font-weight: bold;
      color: #9E9E9E;

      .project-item {
        cursor: pointer;
        margin-top: 20px;

        .project-item-header {
          display: flex;
          margin-bottom: 10px;
          align-items: center;

          .project-item-desc {
            margin-left: 15px;
            font-size: 16px;

          }
        }
      }
    }
  }

  .pay-box {
    width: 30%;
    color: #9E9E9E;
    font-size: 20px;
    font-weight: bold;
    display: flex;
    justify-content: center;

    .pay-item-box {
      width: 200px;

      .item-header {
        margin-bottom: 15px;
        display: flex;
        justify-content: space-between;
        align-items: center;

        .sub {
          font-size: 10px;
          margin-left: 20px;
        }
      }

    }

    .margin {
      margin-top: 60px;
    }

  }

}

</style>
