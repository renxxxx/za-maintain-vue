<template>
  <div style>
    <mainbar style="border-bottom:1px solid black;" />
    <menutree
      style="width:15%;border-right:1px solid black;position:absolute;top:115px;bottom:0;overflow:auto;"
      :visibleItemIds="visibleItemIds"
      :itemTree="thoseUtil.lineToTree(jsonDB.maintainModule.items,'itemId','parentId','children')"
      :currentItemId="currentItemId"
    />
    <router-view
      style="padding-top:10px;margin-left:16%;position:absolute;top:115px;bottom:0;overflow:auto;right:0;left:0"
    ></router-view>
  </div>
</template>

<script>
import menutree from "../../menutree/menutree.vue";
import mainbar from "../../mainbar/mainbar.vue";
import thoseUtil from "../../thoseUtil";

export default {
  name: "page-index",
  components: {
    menutree,
    mainbar
  },
  computed:{
    visibleItemIds(){
      return this.$store.state.userBaseInfo?(this.$store.state.userBaseInfo.moduleIds?this.$store.state.userBaseInfo.moduleIds.split(','):[]):[];
    },
    currentItemId(){
      return this.$store.state.userBaseInfo?(this.$store.state.userBaseInfo.moduleIds?this.$store.state.userBaseInfo.moduleIds.split(',')[0]:""):''
    }
  },
  created(){
debugger
    let token = this.Cookies.get("token");
    if(!token){
      this.$router.push('/login')
      return
    }
    this.$store.commit('token',token)
    this.axios
            .post(
                    "/portal/maintain/useraction/loginrefresh",
                    this.axios.qs.stringify({ token })
            )
            .then(response => {
              let data = response.data;
              if (data.code != 0) {
                this.$message({
                  showClose: true,
                  message: data.codeMsg,
                  type: "warning"
                });
                this.Cookies.remove("token",{ path: '/portal/maintain' })
                this.$store.commit('token',null)
                this.$router.push('/login')

                return;
              }

              this.$store.commit("userBaseInfo", data.data);
            });
  },
  beforeCreate() {
    let token = this.Cookies.get("token");
      if (!token) this.$router.push("/login");


  },

  beforeUpdate(){

  },
  provide() {
    return {
      reload: this.reload
    };
  },
  data() {
    return {
      subPage: this.$route.params.subPage
    };
  },
  props: {},
  methods: {


  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
