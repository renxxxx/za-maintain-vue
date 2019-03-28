<template>
  <el-container style="padding-left:30px;padding-right:30px">
    <el-main>
      <el-row style="width:100%" :gutter="20">
        <el-col :span="6" style>
          <div>名称</div>
        </el-col>
        <el-col :span="18">
          <el-input
                  placeholder="最大长度100"
            v-model="item.name"
            clearable
          ></el-input>
        </el-col>
      </el-row>
      <el-row style="width:100%;margin-top:10px;" :gutter="20">
        <el-col :span="6">
          <div>排序号</div>
        </el-col>
        <el-col :span="18">
          <el-input-number
            v-model="item.orderNo"
            :step=0.5
            :min="-99999"
            :max="99999"
            placeholder="默认9999"
          ></el-input-number>
        </el-col>
      </el-row>

      <el-row style="width:100%;margin-top:30px;align:center;" :gutter="20">
        <div>
          <el-button @click="addItem" type="primary">确认</el-button>
        </div>
      </el-row>
    </el-main>
  </el-container>
</template>

<script>

export default {
  name: "articleManage_add",
  props: [],
  methods: {
    refreshPage() {
    },
    addItem() {

      new Promise(a=> {
        this.axios
          .post(
            "/zhongan/maintain/producttypemanage/itemadd",
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

        this.$message({
          showClose: true,
          message: '添加成功',
          type: "success"
        });
        this.jsonDB.productType.refresh()
      });
    }
  },
  data() {
    return {
      item: {

      }
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
