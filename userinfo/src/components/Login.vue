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

export default {
  components: {
    Group,
    XButton,
    XInput,
    Alert
  },

  methods: {
    login () {
      const data = {
        number: this.number,
        password: this.password
      }
      console.log('data: ', data)
      this.isLoading = true
      this.alertShow = true
      console.log('this.$http: ', this.$http)
      this.$http.post('/api/login', data)
        .then((response) => {
          // success callback
          console.log('success response: ', response)
        }, (response) => {
          // error callback
          console.log('error response: ', response.message)
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
