<template>
  <el-container style="padding-left:30px;padding-right:30px">
    <el-main>
      <el-row style="width:100%" :gutter="20">
        <el-col :span="6" style>
          <div>手机</div>
        </el-col>
        <el-col :span="18">
          <el-input
                  placeholder="最大长度32"
                  v-model="item.phone"
                  clearable
          ></el-input>
        </el-col>
      </el-row>
      <el-row style="width:100%" :gutter="20">
        <el-col :span="6" style>
          <div>密码</div>
        </el-col>
        <el-col :span="18">
          <el-input
                  placeholder="最大长度32"
                  v-model="item.pwd"
                  show-password
                  clearable
          ></el-input>
        </el-col>
      </el-row>
      <el-row style="width:100%" :gutter="20">
        <el-col :span="6" style>
          <div>确认密码</div>
        </el-col>
        <el-col :span="18">
          <el-input
                  placeholder="最大长度32"
                  v-model="item.pwdConfirm"
                  show-password
                  clearable
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
          ></el-input>
        </el-col>
      </el-row>

      <el-row style="width:100%" :gutter="20">
        <el-col :span="6" style>
          <div>冻结</div>
        </el-col>
        <el-col :span="18">
          <el-select
                  v-model="item.frozenIf"
                  clearable
          >
            <el-option
                    key='0'
                    label="否"
                    value='0'
            ></el-option>
            <el-option
                    key='1'
                    label="是"
                    value='1'
            ></el-option>
          </el-select>
        </el-col>
      </el-row>

      <el-row style="width:100%" v-if="parseInt(item.frozenIf)" :gutter="20">
        <el-col :span="6" style>
          <div>冻结原因</div>
        </el-col>
        <el-col :span="18">
        <el-input
                placeholder="最大长度100"
                v-model="item.frozenReason"
                clearable
        ></el-input>
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
  components: {  },
  name: "articleManage_add",
  props: [],
  methods: {
    refreshPage() {
    },
    chosenHeadimg(dom) {
      this.theseUtil.uploadFile(dom, url =>
        this.thisUtil.editImage(url, url => (this.item.headimg = url))
      );
    },

    addItem() {
  if(this.item.pwd!=this.item.pwdConfirm){
    this.$message({
      showClose: true,
      message:'两次密码不一致',
      type: "warning"
    });
    return
  }
      new Promise(a=> {
        this.axios
          .post(
            "/zhongan/maintain/clientusermanage/itemadd",
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
      });
    }
  },
  data() {
    return {
      item: {
        frozenIf:'0',
        headimg:null,
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
