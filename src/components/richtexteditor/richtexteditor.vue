<template>
  <div style="border:1px solid #DCDFE6;border-radius: 5px;width:100%;">
    <div style="padding:5px 5px;width:100%;">
      <el-button
        size="small"
        style="margin-right:10px;"
        @click="fontSizeShow = fontSizeShow == 'none' ? '' : 'none'"
        >字号</el-button
      >
      <div
        :style="{ display: fontSizeShow }"
        style="position:absolute;z-index:9999"
      >
        <el-button size="small" @click="changeFontSize('12px')">12px</el-button>
        <br />
        <el-button size="small" @click="changeFontSize('14px')">14px</el-button>
        <br />
        <el-button size="small" @click="changeFontSize('16px')">16px</el-button>
        <br />
        <el-button size="small" @click="changeFontSize('18px')">18px</el-button>
        <br />
        <el-button size="small" @click="changeFontSize('20px')">20px</el-button>
      </div>
      <el-button
        size="small" @click="aa($refs.colorPicker)"
        >颜色</el-button
      >
      <colorPicker ref="colorPicker"  v-model="color" style="position:absolute;z-index:9999;display: block"/>
      <el-button size="small" @click="addImage">图片</el-button>
      <el-button size="small" @click="addAudio">音频</el-button>
      <el-button size="small" @click="addVideo">视频</el-button>
      <el-button size="small" @click="align('left')">左对齐</el-button>
      <el-button size="small" @click="align('center')">居中</el-button>
      <el-button size="small" @click="align('right')">右对齐</el-button>
      <el-button size="small" @click="addHtml">插入代码</el-button>
    </div>
    <div
      :class="[unitclass]"
      ref="contentContainer"
      @input="input"
      :contenteditable="contenteditable"
      style="border:1px solid #DCDFE6;width:99%;resize:both;overflow:auto;margin:auto;min-height:50px;height:300px"
      :style="{ height: contentHeight }"
    ></div>
      <div style="">当前内部字符数量：{{ richtextSize }}</div>
  </div>
</template>

<script>

export default {
  name: "richtexteditor",
  computed: {},
  data() {
    return {
      color:null,
      fontSizeShow: "none",
      richtextSize: 0,
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
  props: ["contenteditable", "content", "contentHeight"],
  activated() {
    this.refreshPage();
  },
  mounted() {
    this.refreshPage();
  },
  methods: {
    refreshPage() {
      this.$refs.contentContainer.innerHTML = this.content ? this.content : "";
    },
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
    setContent(content) {
      this.$refs.contentContainer.innerHTML = content ? content : "";
      this.changeDone();
    },
    currentEditorCheck() {
      if (
        window.getSelection().anchorNode.classList &&
        window.getSelection().anchorNode.classList.contains(this.unitclass)
      )
        return true;
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
      if (range.toString().length == "") return;
      if (range.toString() == "") return;
      let span = document.createElement("span");
      span.style["font-size"] = size;

      range.surroundContents(span);

      this.changeDone();
    },
    align: function(align) {
      debugger;
      if (!this.contenteditable) return;
      if (!this.currentEditorCheck()) {
        alert("请先选中编辑框");
        return;
      }
      let selection = window.getSelection();
      let range = window.getSelection().getRangeAt(0);
      if (range.toString().length == "") return;
      let div = document.createElement("div");
      div.style["text-align"] = align;

      range.surroundContents(div);
      this.changeDone();
    },

    addImage: function() {
      if (!this.contenteditable) return;
      if (!this.currentEditorCheck()) {
        alert("请先选中编辑框");
        return;
      }
      this.thisUtil.chooseFile(dom => {

        let _this = this;
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

          _this.changeDone();
        });
      });
    },
    addAudio: function() {
      if (!this.contenteditable) return;
      if (!this.currentEditorCheck()) {
        alert("请先选中编辑框");
        return;
      }
      this.thisUtil.chooseFile(dom => {


        let _this = this;
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

          _this.changeDone();
        });
      });
    },
    addVideo: function() {
      if (!this.contenteditable) return;
      if (!this.currentEditorCheck()) {
        alert("请先选中编辑框");
        return;
      }

      this.thisUtil.chooseFile(dom => {

        let _this = this;
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

          _this.changeDone();
        });
      });
    },
    addHtml: function() {
      if (!this.contenteditable) return;
      if (!this.currentEditorCheck()) {
        alert("请先选中编辑框");
        return;
      }
      let s = prompt("请填写代码");
      if (s == "") return;
      // if (s.search(/<\s*script.*?>/ig) != -1) {
      //   alert("无效：禁止包含脚本");
      //   return;
      // }
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

<style></style>