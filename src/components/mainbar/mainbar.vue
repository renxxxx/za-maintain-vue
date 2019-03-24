<template>
  <div style="width:100%;padding:15px 0;position:relative;min-width: 500px;">
    
     <h1 style="margin-left:20px;">撒地方撒打飞机哦萨基佛的</h1>
      
      <div style="position:absolute;right:0;bottom:0;">
        <span style="margin-right:3px;vertical-align: middle;"><img style="width:30px;height:30px;" src="../../assets/defaultHead.jpg"/></span>
        <span style="margin-right:10px;"><a href="#">jack</a></span>
        <span style="margin-right:10px;"><a @click="logout">退出登录</a></span>
      </div>
       
        
      
  </div>
</template>

<script>
export default {
  name: "win-topbar",
  data() {
    return {
     
    };
  },
  props: {
    
  },
  methods: {
   logout(){
     debugger
     this.Cookies.remove('token',{ path: '/zhongan/maintain' })
     this.$router.push('/login')
   }
  },
  created() {
   
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>


</style>
