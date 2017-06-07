<template>
  <div>
    <div class="vux-demo">
      <h1>{{ msg }}</h1>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>

export default {
  data () {
    return {
      msg: 'Hello World!'
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
</style>
