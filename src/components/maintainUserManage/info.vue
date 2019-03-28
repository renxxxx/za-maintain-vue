<template>
  <el-container style="padding-left:30px;padding-right:30px">
    <el-main>
      <el-row style="width:100%" :gutter="20">
        <el-col :span="6" style>
          <div>用户名</div>
        </el-col>
        <el-col :span="18">
          <el-input
            placeholder="最大长度32"
            v-model="item.username"
            clearable
            :readonly="!alterable"
          ></el-input>
        </el-col>
      </el-row>
      <el-row style="width:100%" :gutter="20">
        <el-col :span="6" style>
          <div>姓名</div>
        </el-col>
        <el-col :span="18">
          <el-input
            placeholder="最大长度32"
            v-model="item.realname"
            clearable
            :readonly="!alterable"
          ></el-input>
        </el-col>
      </el-row>
      <el-row style="width:100%" :gutter="20">
        <el-col :span="6" style>
          <div>手机</div>
        </el-col>
        <el-col :span="18">
          <el-input
            placeholder="最大长度32"
            v-model="item.phone"
            clearable
            :readonly="!alterable"
          ></el-input>
        </el-col>
      </el-row>
      <el-row style="width:100%;margin-top:10px;" :gutter="20">
        <el-col :span="6">
          <div>头像</div>
        </el-col>
        <el-col :span="18">
          <img
            v-if="item.headimg"
            :src="item.headimg"
            style="height:100px;width:100px;cursor:pointer"
            @click="thisUtil.showImage($event.target.src)"
          />
          <el-button
            @click="thisUtil.chooseFile(chosenHeadimg)"
            type="primary"
            icon="el-icon-edit"
            circle
            :style="{ display: alterable ? '' : 'none' }"
            size="mini"
            style="margin-left:5px"
          ></el-button>
        </el-col>
      </el-row>

      <el-row style="width:100%" :gutter="20">
        <el-col :span="6" style>
          <div>电子邮箱</div>
        </el-col>
        <el-col :span="18">
          <el-input
            placeholder="最大长度500"
            v-model="item.email"
            clearable
            :readonly="!alterable"
          ></el-input>
        </el-col>
      </el-row>

      <el-row style="width:100%" :gutter="20">
        <el-col :span="6" style>
          <div>冻结</div>
        </el-col>
        <el-col :span="18">
          {{ item.frozenIf ? "是" : "否" }}
        </el-col>
      </el-row>

      <el-row style="width:100%" v-if="item.frozenIf" :gutter="20">
        <el-col :span="6" style>
          <div>冻结原因</div>
        </el-col>
        <el-col :span="18">
          {{ item.frozenReason }}
        </el-col>
      </el-row>

      <el-row style="width:100%;margin-top:10px;" :gutter="20">
        <el-col :span="6">
          <div>模块</div>
        </el-col>
        <el-col :span="18">
          <el-select
            v-model="item.moduleIds"
            :disabled="!alterable"
            clearable
            multiple
            placeholder="请选择"
          >
            <el-option
              v-for="item in jsonDB.maintainModule.itemsLineTree"
              :key="item.itemId"
              :label="thoseUtil.strRepeat('-', item.level) + item.name"
              :value="item.itemId"
            >
              {{ thoseUtil.strRepeat("-", item.level) + item.name }}
            </el-option>
          </el-select>
        </el-col>
      </el-row>

      <el-row style="width:100%;margin-top:10px;" :gutter="20">
        <el-col :span="6">
          <div>注册时间</div>
        </el-col>
        <el-col :span="18">{{
          item.registerTime
            ? thoseUtil.formatDate(
                "yyyy-MM-dd hh:mm:ss",
                new Date(item.registerTime)
              )
            : ""
        }}</el-col>
      </el-row>

      <el-row style="width:100%;margin-top:10px;" :gutter="20">
        <el-col :span="6">
          <div>最后活跃时间</div>
        </el-col>
        <el-col :span="18">{{
          item.lastAliveTime
            ? thoseUtil.formatDate(
                "yyyy-MM-dd hh:mm:ss",
                new Date(item.lastAliveTime)
              )
            : ""
        }}</el-col>
      </el-row>

      <el-row style="width:100%;margin-top:30px;align:center;" :gutter="20">
        <div :style="{ display: other.btns1 }">
          <el-button @click="alter" type="primary">修改</el-button>
          <el-button @click="alterPwd" type="primary">修改密码</el-button>
          <el-button @click="freeze" v-if="!item.frozenIf" type="primary"
            >冻结</el-button
          >
          <el-button @click="unfreeze" v-if="item.frozenIf" type="primary"
            >解冻</el-button
          >
        </div>
        <div :style="{ display: other.btns2 }">
          <el-button @click="cancelAlter" type="primary">取消</el-button>
          <el-button @click="completeAlter" type="primary">完成</el-button>
        </div>
      </el-row>
    </el-main>
  </el-container>
</template>

<script>
export default {
  components: {},
  name: "articleManage_info",
  props: [],
  methods: {
    refreshPage() {
      this.refreshItem();
    },
    refreshItem() {
      this.axios
        .post(
          "/zhongan/maintain/maintainusermanage/item",
          this.axios.qs.stringify({
            itemId: this.$route.params.itemId,
            token: this.$store.state.token
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
          this.item = data.data;
          this.item.moduleIds = this.item.moduleIds.split(",");
        });
    },
    chosenHeadimg(dom) {
      this.theseUtil.uploadFile(dom, url =>
        this.thisUtil.editImage(url, url => (this.item.headimg = url))
      );
    },

    alter() {
      this.other.btns1 = "none";
      this.other.btns2 = "";
      this.alterable = true;
    },
    alterPwd() {
      let _this = this;
      let pwd, pwdc;
      this.$prompt("请输入新密码", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        inputType:'password',
      })
        .then(({ value }) => {
          debugger;
          pwd = value;
          this
                  .$prompt("请确认密码", "提示", {
                    confirmButtonText: "确定",
                    cancelButtonText: "取消",
                    inputType:'password',
                  })
                  .then(({ value }) => {
                    debugger;
                    pwdc = value;
                    if (pwd != pwdc) {
                      this.$message({
                        type: "info",
                        message: "两次密码不一致"
                      });
                      return;
                    }
                    if(!pwd){
                      this.$message({
                        showClose: true,
                        message: '请输入新密码',
                        type: "warning"
                      });
                      return;
                    }
                    this.axios
                            .post(
                                    "/zhongan/maintain/maintainusermanage/itemalter",
                                    this.axios.qs.stringify({
                                      itemId:this.item.itemId,
                                      pwd,
                                      token: this.$store.state.token
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
                              } else {
                                this.$message({
                                  showClose: true,
                                  message: '修改成功',
                                  type: "success"
                                });
                              }
                            });
                  })
                  .catch(() => {
                    this.$message({
                      type: "info",
                      message: "取消输入"
                    });
                  });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "取消输入"
          });
        });

    },
    freeze() {
      this.$prompt("请输入冻结原因", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
      })
              .then(({ value }) => {
                this.axios
                        .post(
                                "/zhongan/maintain/maintainusermanage/itemalter",
                                this.axios.qs.stringify({
                                  itemId:this.item.itemId,
                                  frozenIf:1,
                                  frozenReason:value,
                                  token: this.$store.state.token
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
                          } else {
                            this.$message({
                              showClose: true,
                              message: '已冻结',
                              type: "success"
                            });
                            this.refreshPage();
                          }
                        });
              })
              .catch(() => {
                this.$message({
                  type: "info",
                  message: "取消输入"
                });
              });

    }, unfreeze() {
      this.axios
              .post(
                      "/zhongan/maintain/maintainusermanage/itemalter",
                      this.axios.qs.stringify({
                        itemId:this.item.itemId,
                        frozenIf:0,
                        token: this.$store.state.token
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
                } else {
                  this.$message({
                    showClose: true,
                    message: '已解冻',
                    type: "success"
                  });
                  this.refreshPage();
                }
              });
    },
    completeAlter() {
      new Promise(a => {
        this.axios
          .post(
            "/zhongan/maintain/maintainusermanage/itemalter",
            this.axios.qs.stringify({
              ...this.item,
              moduleIds: this.item.moduleIds.toString(),
              token: this.$store.state.token
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
            } else {
              a();
            }
          });
      }).then(() => {
        this.$message({
          showClose: true,
          message: "修改成功",
          type: "success"
        });
        this.other.btns1 = "";
        this.other.btns2 = "none";
        this.alterable = false;
        this.refreshPage();
      });
    },
    cancelAlter() {
      this.other.btns1 = "";
      this.other.btns2 = "none";
      this.alterable = false;
      this.refreshPage();
    }
  },
  data() {
    return {
      other: {
        btns1: "",
        btns2: "none"
      },

      alterable: false,
      item: {},
      alteredPwd: null
    };
  },
  created() {
    this.refreshPage();
  },
  activated() {
    this.refreshPage();
  }
};
</script>

<style></style>
