<template>
  <el-container style="padding-left:30px;padding-right:30px">
    <el-main>
      <el-row style="width:100%" :gutter="20">
        <el-col :span="6" style>
          <div>名称</div>
        </el-col>
        <el-col :span="18">
          {{item.name}}
        </el-col>
      </el-row>

      <el-row style="width:100%" :gutter="20">
        <el-col :span="6" style>
          <div>值</div>
        </el-col>
        <el-col :span="18">
          <el-input
                  placeholder="最大长度1024"
                  v-model="item.value"
                  type="textarea"
                  clearable
                  :readonly="!alterable"
          ></el-input>
        </el-col>
      </el-row>
      <el-row style="width:100%" :gutter="20">
        <el-col :span="6" style>
          <div>备注</div>
        </el-col>
        <el-col :span="18">
          <el-input
                  v-model="item.remark"
                  type="textarea"
                  clearable
                  readonly
          ></el-input>
        </el-col>
      </el-row>

      <el-row style="width:100%;margin-top:10px;" :gutter="20">
        <el-col :span="6">
          <div>修改时间</div>
        </el-col>
        <el-col :span="18">{{
          item.alterTime?thoseUtil.formatDate("yyyy-MM-dd hh:mm:ss", new Date(item.alterTime)):''
        }}</el-col>
      </el-row>



      <el-row style="width:100%;margin-top:30px;align:center;" :gutter="20">
        <div :style="{ display: other.btns1 }">
          <el-button @click="alter" type="primary">修改</el-button>
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
  components: {  },
  name: "articleManage_info",
  props: [],
  methods: {
    refreshPage() {
      this.refreshItem();
    },
    refreshItem() {
      this.axios
        .post(
          "/portal/maintain/sysparammanage/item",
          this.axios.qs.stringify({
            itemCode: this.$route.params.itemCode,
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
        });
    },
    alter() {
      this.other.btns1 = "none";
      this.other.btns2 = "";
      this.alterable = true;
    },
    completeAlter() {
      new Promise(a=> {
        this.axios
          .post(
            "/portal/maintain/sysparammanage/itemalter",
            this.axios.qs.stringify({...this.item,token:this.$store.state.token})
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
      }).then(()=> {
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
      item: {}
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
