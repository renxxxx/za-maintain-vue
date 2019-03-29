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
            v-if="item.cover &&item.coverImage"
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
            :style="{ display: alterable ? '' : 'none' }"
            size="mini"
            style="margin-left:5px"
          ></el-button>
        </el-col>
      </el-row>

      <el-row style="width:100%;margin-top:10px;" :gutter="20">
        <el-col :span="6">
          <div>类型</div>
        </el-col>
        <el-col :span="18">
          {{ jsonDB.adType.item(item.type).name }}
        </el-col>
      </el-row>

      <el-row style="width:100%;margin-top:10px;" :gutter="20">
        <el-col :span="6">
          <div>位置</div>
        </el-col>
        <el-col :span="18">
          <el-tag>
            <el-popover  placement="right" trigger="hover" title="广告位简介图">
              <img :src="jsonDB.adPlace.item(item.placeCode).introImg"  />
              <span slot="reference">{{
                jsonDB.adPlace.item(item.placeCode).name
              }}</span>
            </el-popover>
          </el-tag>
        </el-col>
      </el-row>

      <el-row style="width:100%;margin-top:10px;" v-if="item.text" :gutter="20">
        <el-col :span="6">
          <div>广告语</div>
        </el-col>
        <el-col :span="18">
          <el-input
            :readonly="!alterable"
            type="textarea"
            :autosize="{ minRows: 2, maxRows: 8 }"
            placeholder="最大长度500"
            v-model="item.text"
          ></el-input>
        </el-col>
      </el-row>

      <el-row
        style="width:100%;margin-top:10px;"
        v-if="item.text1"
        :gutter="20"
      >
        <el-col :span="6">
          <div>广告语1</div>
        </el-col>
        <el-col :span="18">
          <el-input
            :readonly="!alterable"
            type="textarea"
            :autosize="{ minRows: 2, maxRows: 8 }"
            placeholder="最大长度500"
            v-model="item.text1"
          ></el-input>
        </el-col>
      </el-row>

      <el-row style="width:100%;margin-top:10px;" v-if="item.text" :gutter="20">
        <el-col :span="6">
          <div>链接</div>
        </el-col>
        <el-col :span="18">
          <el-input
                  :readonly="!alterable"
                  placeholder="最大长度500"
                  v-model="item.link"
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
          item.addTime
            ? thoseUtil.formatDate(
                "yyyy-MM-dd hh:mm:ss",
                new Date(item.addTime)
              )
            : ""
        }}</el-col>
      </el-row>

      <el-row style="width:100%;margin-top:10px;" :gutter="20">
        <el-col :span="6">
          <div>修改时间</div>
        </el-col>
        <el-col :span="18">{{
          item.alterTime
            ? thoseUtil.formatDate(
                "yyyy-MM-dd hh:mm:ss",
                new Date(item.alterTime)
              )
            : ""
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
export default {
  components: {},
  name: "articleManage_info",
  props: [],
  methods: {
    refreshPage() {
      this.refreshItem();
    },
    refreshItem() {
      this.axios
        .post(
          "/zhongan/maintain/admanage/item",
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
          if(this.thoseUtil.isImageSuffixName(this.item.cover))
            this.item.coverImage=true;
          else  if(this.thoseUtil.isVideoSuffixName(this.item.cover))
            this.item.coverVideo=true;
          else  if(this.thoseUtil.isAudioSuffixName(this.item.cover))
            this.item.coverAudio=true;
        });
    },
    chosenCover(dom) {
      this.theseUtil.uploadFile(dom, url =>
        this.thisUtil.editImage(url, url => (this.item.cover = url))
      );
    },
    alter() {
      this.other.btns1 = "none";
      this.other.btns2 = "";
      this.alterable = true;
    },
    completeAlter() {
      new Promise(a => {
        this.axios
          .post(
            "/zhongan/maintain/admanage/itemalter",
            this.axios.qs.stringify({
              ...this.item,
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
          message: "修改成功",
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
