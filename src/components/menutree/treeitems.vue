<template>
  <ul style="padding-left:10px;margin:0;margin-left:10px;">
    <li
      style="cursor:pointer"
      v-for="(item, index) in items"
      v-if="visibleItemIds.indexOf(item.itemId.toString()) > -1"
      :key="index"
    >
      <p
        @click.self="select(item)"
        style="margin:0"
        :class="{ active: currentItemId == item.itemId }"
      >
        {{ item.name }}
      </p>
      <div v-show="!!item.isOpen">
        <treeitems
          :items="item.children"
          :select="select"
          :currentItemId="currentItemId"
          :visibleItemIds="visibleItemIds"
        ></treeitems>
      </div>
    </li>
  </ul>
</template>

<script>
export default {
  name: "treeitems",

  props: ["items", "select", "currentItemId", "visibleItemIds"],
  data() {
    return {};
  },
  created() {
    this.sortItems();
  },
  methods: {
    sortItems() {
      this.items.sort(function(a, b) {
        return a.orderNo - b.orderNo;
      });
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.active {
  color: red;
}
</style>
