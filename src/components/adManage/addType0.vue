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
          ></el-input>
        </el-col>
      </el-row>
      <el-row style="width:100%;margin-top:10px;" :gutter="20">
        <el-col :span="6">
          <div>封面</div>
        </el-col>
        <el-col :span="18">
          <img
            v-if="item.cover && item.coverImage"
            :src="item.cover"
            style="height:100px;width:100px;cursor:pointer"
            @click="thisUtil.showImage($event.target.src)"
          />
          <video :src="item.cover" controls  v-if="item.cover && item.coverVideo"></video>
          <audio :src="item.cover" controls  v-if="item.cover && item.coverAudio"></audio>
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
          <div>广告语</div>
        </el-col>
        <el-col :span="18">
          <el-input
            type="textarea"
            :autosize="{ minRows: 2, maxRows: 8 }"
            placeholder="最大长度500"
            v-model="item.text"
          ></el-input>
        </el-col>
      </el-row>

      <el-row style="width:100%;margin-top:10px;" :gutter="20">
        <el-col :span="6">
          <div>备注</div>
        </el-col>
        <el-col :span="18">
          <el-input
            type="textarea"
            :autosize="{ minRows: 2, maxRows: 8 }"
            placeholder="最大长度500"
            v-model="item.remark"
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
            :step="0.5"
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
import thoseUtil from "../thoseUtil";

export default {
  components: {},
  name: "articleManage_add",
  props: ["type", "placeCode"],
  methods: {
    refreshPage() {},
    chosenCover(dom) {
      this.theseUtil.uploadFile(dom, url => {
        if (thoseUtil.isImageSuffixName(url)) {
          this.thisUtil.editImage(url, url => (this.item.cover = url));
          this.item.coverImage = true;
        }
        if (thoseUtil.isAudioSuffixName(url)) {
          this.item.cover = url
          this.item.coverAudio = true;
        }
        if (thoseUtil.isVideoSuffixName(url)) {
          this.item.cover = url
          this.item.coverVideo = true;
        }
      });
    },
    addItem() {
      new Promise(a => {
        this.axios
          .post(
            "/zhongan/maintain/admanage/itemadd",
            this.axios.qs.stringify({
              ...this.item,
              type: this.type,
              placeCode: this.placeCode,
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
            } else {
              a();
            }
          });
      }).then(() => {
        this.$message({
          showClose: true,
          message: "添加成功",
          type: "success"
        });
      });
    }
  },
  data() {
    return {
      item: {
        introPics: [],
        cover: null
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
