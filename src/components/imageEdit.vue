<template>
  <el-dialog
    center="true"
    :title="title"
    width="90%"
    append-to-body="true"
    :visible.sync="visible"
    :before-close="handleClose"
  >
    <div style="text-align:center;width:100%">
      <img :src="imgUrl" style="max-width:100%">
    </div>
    <span slot="footer" class="dialog-footer">
      <el-button @click="visible = false">取 消</el-button>
      <el-button type="primary" @click="confirm()">确 定</el-button>
    </span>
  </el-dialog>
</template>
    

<script>
export default {
  name: "EditImage",
  props: {
    title: { default: "确认图片" },
    visible: { default: true },
    imgUrl: null,
    giveMe: null
  },
  data() {
    return {};
  },
  methods: {
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then(_ => {
          done();
        })
        .catch(_ => {});
    },
    confirm() {
      this.giveMe(this.imgUrl);
      this.visible = false;
    }
  }
};
</script>

<style>
</style>
