<template>
  <el-container style="padding-left:30px;padding-right:30px">
    <el-main>
      <el-row style="width:100%" :gutter="20">
        <el-col :span="6" style>
          <div>标题</div>
        </el-col>
        <el-col :span="18">
          <el-input placeholder="请输入内容" v-model="article.title" clearable :readonly="!alterable"></el-input>
        </el-col>
      </el-row>
      <el-row style="width:100%;margin-top:10px;" :gutter="20">
        <el-col :span="6">
          <div>封面</div>
        </el-col>
        <el-col :span="18">
          <img
            v-if="article.cover"
            :src="article.cover"
            style="height:100px;width:100px;cursor:pointer"
            @click="thisUtil.showImage($event.target.src)"
          >
          <el-button
            @click="thisUtil.chooseFile(chosenCover)"
            type="primary"
            icon="el-icon-edit"
            circle
            :style="{display:alterable?'':'none'}"
            size="mini"
            style="margin-left:5px"
          ></el-button>
        </el-col>
      </el-row>

      <el-row style="width:100%;margin-top:10px;" :gutter="20">
        <el-col :span="6">
          <div>介绍图</div>
        </el-col>
        <el-col :span="18">
          <template v-for="(item,index) in article.introPics">
            <span :key="index">
              <img
                :src="item"
                style="height:100px;width:100px;cursor:pointer"
                @click="thisUtil.showImage($event.target.src)"
              >
              <el-button
                @click="article.introPics.splice(index,1)"
                icon="el-icon-close"
                type="danger"
                circle
                :style="{display:alterable?'':'none'}"
                size="mini"
                style="margin-left:5px"
              ></el-button>
              <el-button
                v-if="index < article.introPics.length-1"
                @click="article.introPics[index] = article.introPics.splice(index+1, 1, article.introPics[index])[0]"
                icon="el-icon-sort"
                circle
                :style="{display:alterable?'':'none'}"
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
            :style="{display:alterable?'':'none'}"
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
            :autosize="{ minRows: 2, maxRows: 8}"
            placeholder="请输入内容"
            v-model="article.coverBrief"
          ></el-input>
        </el-col>
      </el-row>

      <el-row style="width:100%;margin-top:10px;" :gutter="20">
        <el-col :span="6">
          <div>类型</div>
        </el-col>
        <el-col :span="18">
          <el-select v-model="article.typeId" :disabled="!alterable" clearable placeholder="请选择">
            <el-option
              v-for="item in jsonDB.articleType.items"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-col>
      </el-row>

      <el-row style="width:100%;margin-top:10px;" :gutter="20">
        <el-col :span="6">
          <div>内容</div>
        </el-col>
        <el-col :span="18">
          <richtexteditor ref="detailEditor" :contenteditable="alterable"></richtexteditor>
        </el-col>
      </el-row>

      <el-row style="width:100%;margin-top:10px;" :gutter="20">
        <el-col :span="6">
          <div>排序号</div>
        </el-col>
        <el-col :span="18">
          <el-input-number
            v-model="article.orderNo"
            step="0.5"
            :disabled="!alterable"
            :min="-1000"
            :max="1000"
            label="描述文字"
          ></el-input-number>
        </el-col>
      </el-row>

      <el-row style="width:100%;margin-top:10px;" :gutter="20">
        <el-col :span="6">
          <div>发布时间</div>
        </el-col>
        <el-col :span="18">{{thoseUtil.formatDate('yyyy-MM-dd hh:mm:ss',new Date(article.addTime))}}</el-col>
      </el-row>

      <el-row style="width:100%;margin-top:10px;" :gutter="20">
        <el-col :span="6">
          <div>修改时间</div>
        </el-col>
        <el-col :span="18">{{thoseUtil.formatDate('yyyy-MM-dd hh:mm:ss',new Date(article.alterTime))}}</el-col>
      </el-row>

      <el-row style="width:100%;margin-top:30px;align:center;" :gutter="20">
        <div :style="{display:other.fff1}">
          <el-button @click="alter" type="primary">修改</el-button>
        </div>
        <div :style="{display:other.fff2}">
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
  props: ["reload"],
  methods: {
    chosenCover(dom) {
      this.theseUtil.uploadFile(dom, url =>
        this.thisUtil.editImage(url, url => (this.article.cover = url))
      );
    },
    chosenIntroPic(dom) {
      this.theseUtil.uploadFile(dom, url =>
        this.thisUtil.editImage(url, url => this.article.introPics.push(url))
      );
    },
    alter() {
      this.other.fff1 = "none";
      this.other.fff2 = "";
      this.alterable = true;
    },
    completeAlter() {
      this.article.detail = this.$refs.detailEditor.getContent();

      this.other.fff1 = "";
      this.other.fff2 = "none";
      this.reload();
    },
    cancelAlter() {
      this.other.fff1 = "";
      this.other.fff2 = "none";
      this.reload();
    }
  },
  data() {
    return {
      other: {
        fff1: "",
        fff2: "none"
      },
      EditImageProps: {
        visible: false,
        imgUrl: "",
        confirm: null,
        cancel: null
      },
      alterable: false,
      article: {
        title: null,
        cover: null,
        typeId: null,
        detail: null,
        coverBrief: null,
        orderNo: null,
        addTime: null,
        alterTime: null,
        introPics: []
      }
    };
  },
  created() {
    this.article = {
      title: null,
      coverBrief: null,
      typeId: null,
      orderNo: null,
      addTime: null,
      alterTime: null,
      cover: null,
      introPics: []
    };
  }
};
</script>

<style>
</style>
