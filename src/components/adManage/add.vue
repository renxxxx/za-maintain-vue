<template>
  <el-container style="padding-left:30px;padding-right:30px">
    <el-main>
      <el-row style="width:100%" :gutter="20">
        <el-col :span="6" style>
          <div>标题</div>
        </el-col>
        <el-col :span="18">
          <el-input
                  placeholder="最大长度100，标题是用来给运维人员区分广告的，不会显示在页面上"
                  v-model="title"
                  clearable
          ></el-input>
        </el-col>
      </el-row>

      <el-row style="width:100%;margin-top:10px;" :gutter="20">
        <el-col :span="6">
          <div>类型</div>
        </el-col>
        <el-col :span="18">
          <el-select v-model="type" clearable placeholder="请选择">
            <el-option
              v-for="item in jsonDB.adType.items"
              :key="item.itemId"
              :label="item.name"
              :value="item.itemId"
            ></el-option>
          </el-select>
        </el-col>
      </el-row>

      <el-row style="width:100%;margin-top:10px;" :gutter="20">
        <el-col :span="6">
          <div>位置</div>
        </el-col>
        <el-col :span="18">
          <el-select v-model="placeCode" clearable placeholder="请选择">
            <el-option
              v-for="item in jsonDB.adPlace.items"
              :key="item.itemCode"
              :label="item.name"
              :value="item.itemCode"
            >
              <el-popover
                placement="right"
                v-if="item.introImg"
                trigger="hover"
                title="广告位简介图"
              >
                <img :src="item.introImg" />
                <span
                  slot="reference"
                  style="width:100%;display:inline-block"
                  >{{ item.name }}</span
                >
              </el-popover>
            </el-option>
          </el-select>
        </el-col>
      </el-row>

      <div
        :type="type"
        :placeCode="placeCode"
        :title="title"
        v-if="type == 0"
        :is="'addType0'"
      ></div>
      <div
        :type="type"
        :placeCode="placeCode"
        :title="title"
        v-if="type == 1"
        :is="'addType1'"
      ></div>
      <div
        :type="type"
        :placeCode="placeCode"
        :title="title"
        v-if="type == 2"
        :is="'addType2'"
      ></div>
      <div
        :type="type"
        :placeCode="placeCode"
        :title="title"
        v-if="type == 3"
        :is="'addType3'"
      ></div>
    </el-main>
  </el-container>
</template>

<script>
import addType0 from "./addType0.vue";
import addType1 from "./addType1.vue";
import addType2 from "./addType2.vue";
import addType3 from "./addType3.vue";

export default {
  components: { addType0, addType1, addType2, addType3 },
  name: "articleManage_add",
  props: [],
  data() {
    return {
      placeCode: null,
      type: null,
      title:null,
    };
  },
  methods: {
    refreshPage() {},
    created() {
      this.refreshPage();
    },
    activated() {
      this.refreshPage();
    }
  }
};
</script>

<style></style>
