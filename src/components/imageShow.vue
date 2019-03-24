<template>
  <el-dialog center="true"  :title="title" width="90%" append-to-body="true" :visible.sync="visible">
    <div style="text-align:center;width:100%">
      <img :src="imgUrl" style="max-width:100%">
    </div>
  </el-dialog>
</template>
    

<script>
export default {
  name: "showImage",
  props: {
    title: { default: "查看图片" },
    visible: { default: true },
    imgUrl: null
  },
  data() {
    return {};
  },
  methods: {}
};
</script>

<style>
</style>
