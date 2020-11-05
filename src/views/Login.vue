<template>
  <div class="login-mask">
    <!--电脑端-->
    <router-link to="/">
      <div class="logo-wrapper hidden-sm-and-down">
        <img src="../assets/logo-name.png" alt="Logo">
      </div>
    </router-link>
    <!--电脑端显示-->
    <div class="main-container hidden-sm-and-down">
      <div class="title-box">
        <h4>
          <a :class="activeType==='login'?'active':''" @click="activeType='login'">登录</a>
          <b>·</b>
          <a :class="activeType==='regist'?'active':''" @click="activeType='regist'">注册</a>
        </h4>
      </div>
      <div class="body-box">
        <el-form :model="loginForm" status-icon label-width="0px" v-show="activeType==='login'">
          <el-form-item label="">
            <el-input prefix-icon="el-icon-mobile-phone" placeholder="请输入手机号" v-model="loginForm.phoneNumber"
                      autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="">
            <el-input prefix-icon="el-icon-lock" placeholder="请输入密码" type="password" v-model="loginForm.password"
                      autocomplete="off" show-password></el-input>
          </el-form-item>
          <el-form-item style="padding-top: 20px">
            <el-button type="primary" @click="doLogin" style="width: 100%">登录</el-button>
          </el-form-item>
        </el-form>
        <el-form :model="registForm" status-icon label-width="0px" v-show="activeType==='regist'">
          <el-form-item label="">
            <el-input prefix-icon="el-icon-user-solid" placeholder="请输入昵称" v-model="registForm.nickName"
                      autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="">
            <el-input prefix-icon="el-icon-mobile-phone" placeholder="请输入手机号" v-model="registForm.phoneNumber"
                      autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="">
            <el-input prefix-icon="el-icon-lock" placeholder="请输入密码" type="password" v-model="registForm.password"
                      autocomplete="off" show-password></el-input>
          </el-form-item>
          <el-form-item style="padding-top: 20px">
            <el-button type="success" @click="doRegist" style="width: 100%">注册</el-button>
          </el-form-item>
        </el-form>
        <!--更多登录方式-->
        <div class="more-login-box">
          <el-divider>更多登录方式</el-divider>
          <div style="margin-top: 10px;text-align: center">
            <img src="../assets/wechat.png" height="40" width="40" alt="微信登录" style="cursor: pointer"
                 @click="doWechatLogin"/></div>
        </div>
      </div>
    </div>
    <!--small一下的小屏幕适配-->
    <div class="logo-wrapper-small hidden-md-and-up">
      <img src="../assets/logo-name.png" alt="Logo" height="50" width="100">
    </div>
    <div class="main-container-small hidden-md-and-up">
      <div class="title-box">
        <h4>
          <a :class="activeType==='login'?'active':''" @click="activeType='login'">登录</a>
          <b>·</b>
          <a :class="activeType==='regist'?'active':''" @click="activeType='regist'">注册</a>
        </h4>
      </div>
      <div class="body-box">
        <el-form :model="loginForm" status-icon label-width="0px" v-show="activeType==='login'">
          <el-form-item label="">
            <el-input prefix-icon="el-icon-mobile-phone" placeholder="请输入手机号" v-model="loginForm.phoneNumber"
                      autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="">
            <el-input prefix-icon="el-icon-lock" placeholder="请输入密码" type="password" v-model="loginForm.password"
                      autocomplete="off" show-password></el-input>
          </el-form-item>
          <el-form-item style="padding-top: 20px">
            <el-button type="primary" @click="doLogin" style="width: 100%">登录</el-button>
          </el-form-item>
        </el-form>
        <el-form :model="registForm" status-icon label-width="0px" v-show="activeType==='regist'">
          <el-form-item label="">
            <el-input prefix-icon="el-icon-user-solid" placeholder="请输入昵称" v-model="registForm.nickName"
                      autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="">
            <el-input prefix-icon="el-icon-mobile-phone" placeholder="请输入手机号" v-model="registForm.phoneNumber"
                      autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="">
            <el-input prefix-icon="el-icon-lock" placeholder="请输入密码" type="password" v-model="registForm.password"
                      autocomplete="off" show-password></el-input>
          </el-form-item>
          <el-form-item style="padding-top: 20px">
            <el-button type="success" @click="doRegist" style="width: 100%">注册</el-button>
          </el-form-item>
        </el-form>
        <!--更多登录方式-->
        <div class="more-login-box">
          <el-divider><span style="font-size: 5px">更多登录方式</span></el-divider>
          <div style="margin-top: 10px;text-align: center">
            <img src="../assets/wechat.png" height="40" width="40" alt="微信登录" style="cursor: pointer"
                 @click="doWechatLogin"/></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { loginApi, registApi } from '@/api/customer'
import { mapMutations } from 'vuex'

export default {
  name: 'Login',
  data () {
    return {
      activeType: 'login',
      loginForm: {
        phoneNumber: '',
        password: ''
      },
      registForm: {
        phoneNumber: '',
        password: '',
        nickName: ''
      }
    }
  },
  methods: {
    ...mapMutations(['saveToken']),
    doLogin () {
      // 手动校验参数
      if (this.loginForm.phoneNumber === '' || this.loginForm.password === '') {
        this.$message.warning('手机号密码必填')
      } else {
        loginApi(this.loginForm).then(res => {
          if (res.status) {
            // 登录成功,保存token
            this.saveToken(res.data)
            // 跳回原来的页面
            const params = this.$route.params
            console.log(params)
            if (JSON.stringify(params) === '{}') {
              // 空参数直接跳转主页
              this.$router.push('/')
            } else {
              this.$router.push('/' + params.fromPath)
            }
          } else {
            this.$message.error(res.message)
          }
        })
      }
    },
    doRegist () {
      // 参数手动校验
      if (this.registForm.phoneNumber === '' || this.registForm.password === '' || this.registForm.nickName === '') {
        this.$message.warning('请将信息填写完整')
      } else {
        //
        registApi(this.registForm).then(res => {
          if (res.status) {
            const params = this.$route.params
            console.log(params)
            if (JSON.stringify(params) === '{}') {
              // 空参数直接跳转主页
              this.$router.push('/')
            } else {
              this.$router.push('/' + params.fromPath)
            }
          } else {
            this.$message.error(res.message)
          }
        })
      }
    },
    doWechatLogin () {
      this.$message.success('微信登录暂未开放')
    }
  }
}
</script>

<style lang="scss" scoped>
a {
  cursor: pointer;
  padding: 10px;
  text-decoration: none;
  color: #969696;
  background-color: transparent;
}

b {
  padding: 10px;
}

.active {
  font-weight: 700;
  color: #ea6f5a;
  border-bottom: 2px solid #ea6f5a;
}

.login-mask {
  height: 100%;
  width: 100%;
  background-color: #f1f1f1;

  .logo-wrapper {
    position: absolute;
    top: 56px;
    margin-left: 50px;
  }

  .logo-wrapper-small {
    position: absolute;
    top: 20px;
    margin-left: 20px;
  }

  .main-container {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 400px;
    margin: 60px auto 0;
    padding: 50px 50px 30px;
    background-color: #fff;
    border-radius: 4px;
    box-shadow: 0 0 8px rgba(0, 0, 0, .1);
    vertical-align: middle;
    display: inline-block;

    .title-box {
      padding: 10px;
      display: flex;
      justify-content: center;
      text-align: center;
      color: #969696;
      margin-bottom: 50px;
    }

    .body-box {
      .more-login-box {
        margin-top: 50px;
      }
    }

  }

  .main-container-small {
    position: absolute;
    top: 50%;
    left: 50%;
    width: 65%;
    height: 60%;
    transform: translate(-50%, -50%);
    padding: 40px 40px 20px;
    background-color: #fff;
    border-radius: 4px;
    box-shadow: 0 0 8px rgba(0, 0, 0, .1);
    vertical-align: middle;
    display: inline-block;

    .title-box {
      padding: 10px;
      display: flex;
      justify-content: center;
      text-align: center;
      color: #969696;
    }

    .body-box {
      .more-login-box {
      }
    }

  }
}

</style>
