<template>
  <div>
    <WinLogin  :action='action'/>
  </div>
</template>

<script>
import WinLogin from '../../login/login.vue'

export default {
  name: 'page-login',
  components:{
    WinLogin
  },
  props:{
    action:{default:'login'}
  },created(){
  alert($route.path)
    if(this.action=='login'&& this.Cookies.get('token')){
      this.$router.push('/index')
    }
    
  }
  ,methods:{
    
  }
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>


</style>
