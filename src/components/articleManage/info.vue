<template>
  <el-container style="padding-left:30px;padding-right:30px">
    <el-main>
      <el-row style="width:100%" :gutter="20">
        <el-col :span="6" style>
          <div>标题</div>
        </el-col>
        <el-col :span="18">
          <el-input
                  placeholder="最大长度100"
            v-model="item.title"
            clearable
            :readonly="!alterable"
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
            :style="{ display: alterable ? '' : 'none' }"
            size="mini"
            style="margin-left:5px"
          ></el-button>
        </el-col>
      </el-row>

      <el-row style="width:100%;margin-top:10px;" v-show="false" :gutter="20">
        <el-col :span="6">
          <div>介绍图</div>
        </el-col>
        <el-col :span="18">
          <template v-for="(item, index) in item.introPics">
            <span :key="index">
              <img
                :src="item"
                style="height:100px;width:100px;cursor:pointer"
                @click="thisUtil.showImage($event.target.src)"
              />
              <el-button
                @click="item.introPics.splice(index, 1)"
                icon="el-icon-close"
                type="danger"
                circle
                :style="{ display: alterable ? '' : 'none' }"
                size="mini"
                style="margin-left:5px"
              ></el-button>
              <el-button
                v-if="index < item.introPics.length - 1"
                @click="
                  item.introPics[index] = item.introPics.splice(
                    index + 1,
                    1,
                    item.introPics[index]
                  )[0]
                "
                icon="el-icon-sort"
                circle
                :style="{ display: alterable ? '' : 'none' }"
                size="mini"
                style="margin-left:5px"
              ></el-button>
            </span>
          </template>
          <el-button
            @click="thisUtil.chooseFile(chosenIntroPic)"
            type="primary"
            icon="el-icon-plus"
            circle
            :style="{ display: alterable ? '' : 'none' }"
            size="mini"
            style="margin-left:5px"
          ></el-button>
        </el-col>
      </el-row>

      <el-row style="width:100%;margin-top:10px;" :gutter="20">
        <el-col :span="6">
          <div>封面简介</div>
        </el-col>
        <el-col :span="18">
          <el-input
            :readonly="!alterable"
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
            :disabled="!alterable"
            clearable
            placeholder="请选择"
          >
            <el-option
              v-for="item in jsonDB.articleType.items"
              :key="item.itemId"
              :label="item.name"
              :value="item.itemId"
            ></el-option>
          </el-select>
        </el-col>
      </el-row>

      <el-row style="width:100%;margin-top:10px;" :gutter="20">
        <el-col :span="6">
          <div>内容</div>
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
          <div>排序号</div>
        </el-col>
        <el-col :span="18">
          <el-input-number
            v-model="item.orderNo"
            :step=0.5
            :disabled="!alterable"
            :min="-99999"
            :max="99999"
            placeholder="默认9999"
            label="描述文字"
          ></el-input-number>
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
    refreshItem() {
      this.axios
        .post(
          "/zhongan/maintain/articlemanage/item",
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
              this.theseUtil.getBigtxt(this.item.detailBtId,data=>{

                  this.item.detail=data
                this.$refs.detailEditor.setContent(data)
              })


        });
    },
    chosenCover(dom) {
      this.theseUtil.uploadFile(dom, url =>
        this.thisUtil.editImage(url, url => (this.item.cover = url))
      );
    },
    chosenIntroPic(dom) {
      if(this.item.introPics.length>=9)
      {
        this.$message({
          showClose: true,
          message: '图片数量已达上限',
          type: "warning"
        });
        return;
      }
      this.theseUtil.uploadFile(dom, url =>
        this.thisUtil.editImage(url, url => this.item.introPics.push(url))
      );
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
            "/zhongan/maintain/articlemanage/itemalter",
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
          message: '修改成功',
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
