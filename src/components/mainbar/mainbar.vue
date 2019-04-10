<template>
  <div style="width:100%;padding:15px 0;position:relative;min-width: 500px;">
    
     <h1 style="margin-left:20px;">{{projectTitle}}</h1>
      
      <div style="position:absolute;right:0;bottom:0;">
        <span style="margin-right:3px;vertical-align: middle;"><img style="width:30px;height:30px;cursor: pointer" @click="thisUtil.showImage($event.target.src)" :src="$store.state.userBaseInfo.headimg?$store.state.userBaseInfo.headimg:require(`../../assets/defaultHead.jpg`)"/></span>
        <span style="margin-right:10px;"><a href="#">{{$store.state.userBaseInfo.username+ ($store.state.userBaseInfo.realname?('/' +$store.state.userBaseInfo.realname):'')}}</a></span>
        <span style="margin-right:10px;"><a href="#" @click="logout">退出登录</a></span>
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
     this.Cookies.remove('token',{ path: '/portal/maintain' })
       this.$store.commit('token',null)
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
