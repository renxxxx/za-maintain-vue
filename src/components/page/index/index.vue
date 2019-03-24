<template>
  <div style>
    <mainbar style="border-bottom:1px solid black;"/>
    <menutree
      style="width:15%;border-right:1px solid black;position:absolute;top:115px;bottom:0;overflow:auto;"
    />
    <router-view
      style="padding-top:10px;margin-left:16%;position:absolute;top:115px;bottom:0;overflow:auto;right:0;left:0"
    ></router-view>
  </div>
</template>

<script>
import menutree from "../../menutree/menutree.vue";
import mainbar from "../../mainbar/mainbar.vue";

export default {
  name: "page-index",
  components: {
    menutree,
    mainbar
  },
  beforeCreate() {
    if (!this.Cookies.get("token"))
      this.$router.push("/login");
  },
  provide() {
    return {
      reload: this.reload
    };
  },
  //   watch:{
  //       '$route': function (to, from) {
  //         this.subPage=this.$route.params.subPage
  // 　　}
  //   },
  data() {
    return {
      refresh: true,
      subPage: this.$route.params.subPage
    };
  },
  props: {},
  methods: {
    reload() {
      this.refresh = false;
      this.$nextTick(() => {
        this.refresh = true;
      });
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
