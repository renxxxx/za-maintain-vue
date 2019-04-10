<template>
  <div name="mainTab">
    <div name="loginTab" :style="loginTab.style">
      <div>登录</div>
      <div>
        <span>用户名</span>
        <input type="text" v-model="username" />
      </div>
      <div>
        <span>密码</span>
        <input type="password" v-model="password" />
      </div>

      <div>
        <button @click="login">确认</button>
      </div>
      <div>
        <button @click="tabTab('register')">注册</button>
      </div>
    </div>

    <div name="registerTab" :style="registerTab.style">
      <div>注册</div>
      <div>
        <span>用户名</span>
        <input type="text" v-model="username" />
      </div>
      <div>
        <span>密码</span>
        <input type="password" v-model="password" />
      </div>

      <div>
        <button>确认</button>
      </div>
      <div>
        <button @click="tabTab('login')">登录</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "win-login",
  props: {
    action: { default: "login" }
  },
  data() {
    return {
      registerTab: {
        style: {
          display: "none"
        }
      },
      loginTab: {
        style: {
          display: "none"
        }
      },
      username: null,
      password: null
    };
  },
  methods: {
    tabTab(who) {
      if (who == "login") {
        this.loginTab.style.display = "";
        this.registerTab.style.display = "none";
      } else if (who == "register") {
        this.loginTab.style.display = "none";
        this.registerTab.style.display = "";
      }
    },
    login() {
      debugger;
      this.axios
        .post(
          "/portal/maintain/useraction/login",
          this.axios.qs.stringify({
            username: this.username,
            pwd: this.password
          })
        )
        .then(response => {
          let data = response.data;
          if (data.code != 0) {
            this.$message({
              showClose: true,
              message: data.codeMsg,
              type: "warning"
            });
            return;
          }
          let token = data.data.token;
          this.Cookies.set("token", token, {
            expires: 30,
            path: "/portal/maintain"
          });
          this.$store.commit('token',token)
          this.$router.push("/index");
        });
    }
  },
  created() {
    this.tabTab(this.action);
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
[name="mainTab"] {
  width: 100%;
  border: 1px solid black;
  margin: auto;
  width: 15rem;
}
</style>
