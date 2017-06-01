<template>
  <div>
    <div class="vux-demo">
      <h1>绑定教务系统</h1>
    </div>
    <group>
      <x-input title="学号" v-model="number" :required="false" placeholder="请输入您的学号" :show-clear="false" autocapitalize="characters"></x-input>
      <x-input title="密码" v-model="password" :required="false" placeholder="请输入您的教务系统密码" :show-clear="false" autocapitalize="characters" type="password"></x-input>
    </group>

    <div class="box-button">
      <x-button type="primary" @click.native="login" :disabled="isLoading" :show-loading="isLoading">绑定</x-button>
    </div>

    <div>
      <alert v-model="alertShow" :title="alertTitle"> {{ alertContent }}</alert>
    </div>
  </div>
</template>

<script>
import { Group, XButton, XInput, Alert } from 'vux'
// import VueRouter from 'vue-router'

export default {
  components: {
    Group,
    XButton,
    XInput,
    Alert
  },

  methods: {
    login () {
      const self = this
      const data = {
        number: self.number,
        password: self.password
      }
      console.log('data: ', data)
      self.isLoading = true
      // console.log('self.$http: ', self.$http)
      self.$http.post('/api/login', data)
        .then((response) => {
          // success callback
          console.log('success response: ', response)
          const { data } = response
          if (!data.success) {
            self.isLoading = false
            self.alertShow = true
            self.alertContent = data.message
            return false
          }
          self.isLoading = false
          console.log('self.$router: ', self.$router)
          console.log('self.$router.push: ', self.$router.push)
          // 跳转到首页
          self.$router.push('/')
        }, (response) => {
          // error callback
          console.log('error response: ', response.message)
          self.isLoading = false
          self.alertShow = true
          self.alertContent = '绑定教务系统失败，请重试'
          return false
        })
    }
  },

  data () {
    return {
      number: '',
      password: '',
      isLoading: false,
      alertShow: false,
      alertTitle: '绑定失败',
      alertContent: '学号或密码错误'
    }
  }
}
</script>

<style>
.vux-demo {
  margin-top: 30%;
  text-align: center;
}
.logo {
  width: 100px;
  height: 100px
}
.box-button {
  padding: 25px 15px
}
</style>
