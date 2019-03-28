<template>
  <el-container style="padding-left:30px;padding-right:30px">
    <el-main>
      <el-row style="width:100%" :gutter="20">
        <el-col :span="6" style>
          <div>位码</div>
        </el-col>
        <el-col :span="18">
          {{item.itemCode}}
        </el-col>
      </el-row>
      <el-row style="width:100%" :gutter="20">
        <el-col :span="6" style>
          <div>名称</div>
        </el-col>
        <el-col :span="18">
         {{item.name}}
        </el-col>
      </el-row>
      <el-row style="width:100%;margin-top:10px;" :gutter="20">
        <el-col :span="6">
          <div>简介</div>
        </el-col>
        <el-col :span="18">
          <el-input
                  :readonly="!alterable"
                  type="textarea"
                  :autosize="{ minRows: 2, maxRows: 8 }"
                  placeholder="最大长度100"
                  v-model="item.intro"
          ></el-input>
        </el-col>
      </el-row>

      <el-row style="width:100%;margin-top:10px;" :gutter="20">
        <el-col :span="6">
          <div>简介图</div>
        </el-col>
        <el-col :span="18">
          <img
                  v-if="item.introImg"
                  :src="item.introImg"
                  style="height:100px;width:100px;cursor:pointer"
                  @click="thisUtil.showImage($event.target.src)"
          />
          <el-button
                  @click="thisUtil.chooseFile(chosenIntroImg)"
                  type="primary"
                  icon="el-icon-edit"
                  circle
                  :style="{ display: alterable ? '' : 'none' }"
                  size="mini"
                  style="margin-left:5px"
          ></el-button>
        </el-col>
      </el-row>

      <el-row style="width:100%;margin-top:10px;" :gutter="20">
        <el-col :span="6">
          <div>详情</div>
        </el-col>
        <el-col :span="18">
          <richtexteditor
                  ref="detailEditor"
                  :contenteditable="alterable"
                  :content="item.detail"
          ></richtexteditor>
        </el-col>
      </el-row>

      <el-row style="width:100%;margin-top:10px;" :gutter="20">
        <el-col :span="6">
          <div>添加时间</div>
        </el-col>
        <el-col :span="18">{{
          item.addTime?thoseUtil.formatDate("yyyy-MM-dd hh:mm:ss", new Date(item.addTime)):''
        }}</el-col>
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
  import richtexteditor from "../richtexteditor/richtexteditor.vue";

  export default {
    components: { richtexteditor },
  name: "articleManage_info",
  props: [],
  methods: {
    refreshPage() {
      this.refreshItem();
    },
    chosenIntroImg(dom) {
      this.theseUtil.uploadFile(dom, url =>
              this.thisUtil.editImage(url, url => (this.item.introImg = url))
      );
    },
    refreshItem() {
      this.axios
        .post(
          "/zhongan/maintain/adplacemanage/item",
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
          this.theseUtil.getBigtxt(this.item.detailBtId,data=>{

            this.item.detail=data
            this.$refs.detailEditor.setContent(data)
          })
        });
    },
    alter() {
      this.other.btns1 = "none";
      this.other.btns2 = "";
      this.alterable = true;
    },
    completeAlter() {
      this.item.detail = this.$refs.detailEditor.getContent();
      new Promise(a=> {
        this.axios
          .post(
            "/zhongan/maintain/adplacemanage/itemalter",
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
