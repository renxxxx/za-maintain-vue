<template>
  <div
    :class="[unitclass]"
    style="border:1px solid #DCDFE6;border-radius: 5px;resize:both;overflow:auto;height:300px;position:relative;"
  >
    <div style="padding:5px 5px">
      <div>
        <el-button
          size="small"
          style="margin-right:10px;"
          @click="fontSizeShow=fontSizeShow=='none'?'':'none'"
        >字体</el-button>
        <div :style="{display:fontSizeShow}" style="position:absolute;z-index:99999">
          <el-button size="small" @click="changeFontSize('12px')">12px</el-button>
          <br>
          <el-button size="small" @click="changeFontSize('14px')">14px</el-button>
          <br>
          <el-button size="small" @click="changeFontSize('16px')">16px</el-button>
          <br>
          <el-button size="small" @click="changeFontSize('18px')">18px</el-button>
          <br>
          <el-button size="small" @click="changeFontSize('20px')">20px</el-button>
        </div>
        <el-button size="small" @click="addImage">图片</el-button>
        <el-button size="small" @click="addAudio">音频</el-button>
        <el-button size="small" @click="addVideo">视频</el-button>
        <el-button size="small" @click="center">居中</el-button>
        <el-button size="small" @click="addHtml">插入标签</el-button>
      </div>
    </div>
    <div
      ref="contentContainer"
      @input="input"
      :contenteditable="contenteditable"
      style="border-top:1px solid #DCDFE6;border-bottom:1px solid #DCDFE6;position:absolute;top:50px;bottom:20px;width:100%"
    ></div>
    <div style=";position:absolute;bottom:0;">当前内容量：{{richtextSize}}</div>
  </div>
</template>
    

<script>
export default {
  name: "chooseFile",
  data() {
    return {
      fontSizeShow: "none",
      richtextSize: null,
      unitclass:
        "a" +
        Math.random()
          .toString()
          .substr(2),
      fontSizes: [
        { value: "12px", label: "12px" },
        { value: "14px", label: "14px" }
      ],
      fontSizesValue: null
    };
  },
  props: ["contenteditable"],
  methods: {
    input() {
      this.changeDone();
    },
    refreshRichtextSize() {
      this.richtextSize = this.$refs.contentContainer.innerHTML.length;
    },
    changeDone() {
      this.refreshRichtextSize();
    },
    getContent() {
      return this.$refs.contentContainer.innerHTML;
    },
    currentEditorCheck() {
      let aaaa = this.thoseUtil.findParent(
        window.getSelection().anchorNode,
        this.unitclass
      );
      if (aaaa == null) {
        return false;
      }
      return true;
    },
    changeFontSize: function(size) {
      debugger;
      if (!this.contenteditable) return;
      this.fontSizeShow = "none";
      if (!this.currentEditorCheck()) {
        alert("请先选中编辑框");
        return;
      }
      let selection = window.getSelection();
      let range = window.getSelection().getRangeAt(0);
      if (range.toString() == "") return;
      let span = document.createElement("span");
      span.style["font-size"] = size;

      range.surroundContents(span);

      this.changeDone();
    },
    center: function() {
      debugger;
      if (!this.contenteditable) return;
      if (!this.currentEditorCheck()) {
        alert("请先选中编辑框");
        return;
      }
      let selection = window.getSelection();
      let range = window.getSelection().getRangeAt(0);

      let div = document.createElement("div");
      div.style["text-align"] = "center";

      range.surroundContents(div);
      this.changeDone();
    },
    addImage: function() {
      if (!this.contenteditable) return;
      if (!this.currentEditorCheck()) {
        alert("请先选中编辑框");
        return;
      }
      this.thisUtil.chooseFile(function(dom) {
        this.theseUtil.uploadFile(dom, function(url) {
          let selection = window.getSelection();
          let range = window.getSelection().getRangeAt(0);

          let a = document.createElement("a");
          a.href = url;
          a.target = "_blank";

          let img = document.createElement("img");
          img.src = url;
          img.style.width = "100%";

          a.appendChild(img);
          range.insertNode(a);
        });
      });
    },
    addAudio: function() {
      if (!this.contenteditable) return;
      if (!this.currentEditorCheck()) {
        alert("请先选中编辑框");
        return;
      }
      this.thisUtil.chooseFile(function(dom) {
        this.theseUtil.uploadFile(dom, url => {
          let selection = window.getSelection();
          let range = window.getSelection().getRangeAt(0);

          let div = document.createElement("div");
          div.style["text-align"] = "center";

          let audio = document.createElement("audio");
          audio.src = url;
          audio.controls = "controls";
          audio.style.width = "80%";

          div.appendChild(audio);
          range.insertNode(div);
        });
      });
    },
    addVideo: function() {
      if (!this.contenteditable) return;
      if (!this.currentEditorCheck()) {
        alert("请先选中编辑框");
        return;
      }

      this.thisUtil.chooseFile(function(dom) {
        this.theseUtil.uploadFile(dom, url => {
          let selection = window.getSelection();
          let range = window.getSelection().getRangeAt(0);

          let div = document.createElement("div");
          div.style["text-align"] = "center";

          let video = document.createElement("video");
          video.src = url;
          video.controls = "controls";
          video.style.width = "80%";

          div.appendChild(video);
          range.insertNode(div);
        });
      });
    },
    addHtml: function() {
      if (!this.contenteditable) return;
      if (!this.currentEditorCheck()) {
        alert("请先选中编辑框");
        return;
      }
      let s = prompt("请填写标签");
      if (s == "") return;
      if (s.indexOf("<script>")!= -1) {
        alert("无效：禁止脚本");
        return;
      }
      let selection = window.getSelection();
      let range = window.getSelection().getRangeAt(0);

      let div = document.createElement("div");
      div.innerHTML = s;

      range.insertNode(div);

      this.changeDone();
    }
  }
};
</script>

<style>
</style>
