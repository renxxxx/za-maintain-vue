<template>
  <div
    name="richtexteditor"
    style="border:1px solid #DCDFE6;border-radius: 5px;width:100%;"
  >
    <div style="padding:5px 5px;width:100%;">
      <el-button
        size="small"
        style="margin-right:10px;"
        @click="fontSizeShow = fontSizeShow == 'none' ? '' : 'none'"
        >字号</el-button
      >
      <div
        ref="fontSizes"
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
      <el-button size="small" @click="undo" icon="el-icon-arrow-left"></el-button>
      <el-button size="small" @click="redo" icon="el-icon-arrow-right"></el-button>
      <el-color-picker
        v-model="color"
        show-alpha
        size="small"
        style="top: 12px;margin-left:10px;"
      ></el-color-picker>
      <el-button size="small" @click="changeColor" style="">变色</el-button>
      <el-button size="small" @click="align('left')">左对齐</el-button>
      <el-button size="small" @click="align('center')">居中</el-button>
      <el-button size="small" @click="align('right')">右对齐</el-button>
      <el-button size="small" @click="addImage" style="margin-left:10px;"
        >图片</el-button
      >
      <el-button size="small" @click="addAudio">音频</el-button>
      <el-button size="small" @click="addVideo">视频</el-button>
      <el-button size="small" @click="addHyperlink">插入超链接</el-button>
      <el-button size="small" @click="addHtml">插入代码</el-button>
      <el-button size="small" @click="clear" >清空</el-button>
    </div>
    <div
      :class="[unitclass]"
      ref="contentContainer"
      @input="input"
      :contenteditable="contenteditable"
      style="border:1px solid #DCDFE6;width:99%;resize:both;overflow:auto;margin:auto;min-height:50px;height:300px;word-wrap:break-word"
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
      mu:null,
      widthEditor: {
        show: false,
        style: {
          top: null,
          left: null
        }
      },
      color: "rgba(0, 0, 0, 1)",
      fontSizeShow: "none",
      richtextSize: 0,
      unitclass:
        "a" +
        Math.random()
          .toString()
          .substr(2)
    };
  },
  props: ["contenteditable", "content", "contentHeight"],
  activated() {


    this.refreshPage();
  },
  mounted() {
    this.mu = new nono.MutationJs(this.$refs.contentContainer);
    this.refreshPage();
  },
  created() {

  },
  methods: {
    clear(){
      this.$refs.contentContainer.innerHTML =  "";
      this.changeDone();
    },
    undo(){
      if (!this.contenteditable) return;
      this.mu.undo()
      this.changeDone();
    },
    redo(){
      if (!this.contenteditable) return;
      this.mu.redo()
      this.changeDone();
    },
    changeColor() {
      debugger;
      if (!this.contenteditable) return;
      if (!this.currentEditorCheck()) {
        alert("请先选中编辑框");
        return;
      }
      let selection = window.getSelection();
      let range = window.getSelection().getRangeAt(0);
      if (range.toString() == "") {
        alert("变色步骤：1选择颜色>2选取文本>3点击变色");
        return;
      }

      if (range.endContainer != range.startContainer) {
        alert("只能选择相同样式的文本");
        return;
      }
      let span = document.createElement("span");
      span.style["color"] = this.color;

      range.surroundContents(span);
      range.selectNodeContents(span);
      this.changeDone();
    },
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
      if (range.endContainer != range.startContainer) {
        alert("只能选择相同样式的文本");
        return;
      }
      let span = document.createElement("span");
      span.style["font-size"] = size;

      range.surroundContents(span);
      range.selectNodeContents(span);
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
      let start = range.startContainer;
      let end = range.endContainer;
      if (start != end) {
        alert("只能选择相同样式的文本");
        return;
      }

      let div = document.createElement("div");
      div.style["text-align"] = align;
      range.surroundContents(div);
      range.selectNodeContents(div);

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

          let span1 = document.createElement("span");
          span1.innerHTML = "&nbsp;";
          let span2 = document.createElement("span");
          span2.innerHTML = "&nbsp;";

          let a = document.createElement("a");
          a.href = url;
          a.target = "_blank";

          let img = document.createElement("img");
          img.src = url;
          img.style.width = "100%";

          a.appendChild(img);
          range.insertNode(span1);
          range.insertNode(a);
          range.insertNode(span2);

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

          let span1 = document.createElement("span");
          span1.innerHTML = "&nbsp;";
          let span2 = document.createElement("span");
          span2.innerHTML = "&nbsp;";

          let div = document.createElement("div");
          div.style["text-align"] = "center";

          let audio = document.createElement("audio");
          audio.src = url;
          audio.controls = "controls";
          audio.style.width = "80%";

          div.appendChild(audio);
          range.insertNode(span1);
          range.insertNode(div);
          range.insertNode(span2);

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

          let span1 = document.createElement("span");
          span1.innerHTML = "&nbsp;";
          let span2 = document.createElement("span");
          span2.innerHTML = "&nbsp;";

          let div = document.createElement("div");
          div.style["text-align"] = "center";

          let video = document.createElement("video");
          video.src = url;
          video.controls = "controls";
          video.style.width = "80%";

          div.appendChild(video);
          range.insertNode(span1);
          range.insertNode(div);
          range.insertNode(span2);

          _this.changeDone();
        });
      });
    },

    addHyperlink: function() {
      if (!this.contenteditable) return;
      if (!this.currentEditorCheck()) {
        alert("请先选中编辑框");
        return;
      }
      let selection = window.getSelection();
      let range = window.getSelection().getRangeAt(0);
      let start = range.startContainer;
      let end = range.endContainer;
      if (start != end) {
        alert("只能选择相同样式的文本");
        return;
      }
      let s = prompt("输入超链接");
      if (s == "") return;

      if(s.search(/^(http|https):\/\//ig) != 0 )
        s='http://'+s


      let a = document.createElement("a");
      a.href = s;
  a.target="_blank"
      range.surroundContents(a);

      this.changeDone();
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
      s=s.replace(/http:/ig, "")
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
