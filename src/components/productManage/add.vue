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
          <div>封面</div>
        </el-col>
        <el-col :span="18">
          <img
            v-if="item.cover"
            :src="item.cover"
            style="height:100px;width:100px;cursor:pointer"
            @click="thisUtil.showImage($event.target.src)"
          />
          <el-button
            @click="thisUtil.chooseFile(chosenCover)"
            type="primary"
            icon="el-icon-edit"
            circle
            size="mini"
            style="margin-left:5px"
          ></el-button>
        </el-col>
      </el-row>

      <el-row style="width:100%;margin-top:10px;" :gutter="20">
        <el-col :span="6">
          <div>内容</div>
        </el-col>
        <el-col :span="18">
          <richtexteditor
                  ref="detailEditor"
                  :contenteditable="true"
                  :content="item.detail"
          ></richtexteditor>
        </el-col>
      </el-row>


      <el-row style="width:100%;margin-top:10px;" :gutter="20">
        <el-col :span="6">
          <div>封面简介</div>
        </el-col>
        <el-col :span="18">
          <el-input
            type="textarea"
            :autosize="{ minRows: 2, maxRows: 8 }"
            placeholder="最大长度500"
            v-model="item.coverBrief"
          ></el-input>
        </el-col>
      </el-row>

      <el-row style="width:100%;margin-top:10px;" :gutter="20">
        <el-col :span="6">
          <div>类型</div>
        </el-col>
        <el-col :span="18">
          <el-select
            v-model="item.typeId"
            clearable
            placeholder="请选择"
          >
            <el-option
              v-for="item in jsonDB.productType.items"
              :key="item.itemId"
              :label="item.name"
              :value="item.itemId"
            ></el-option>
          </el-select>
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
  import richtexteditor from "../richtexteditor/richtexteditor.vue";

  export default {
    components: { richtexteditor },
  name: "articleManage_add",
  props: [],
  methods: {
    refreshPage() {
    },
    chosenCover(dom) {
      this.theseUtil.uploadFile(dom, url =>
        this.thisUtil.editImage(url, url => (this.item.cover = url))
      );
    },
    addItem() {
      this.item.detail = this.$refs.detailEditor.getContent();
      new Promise(a=> {
        this.axios
          .post(
            "/portal/maintain/productmanage/itemadd",
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
        detailPic:null,
        cover:null,
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
