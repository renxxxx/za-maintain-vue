<template>
  <div style="width:100%;overflow: auto;">
    <treeitems :items="itemTree"  :select='select'  :currentItemId='currentItemId' :visibleItemIds='visibleItemIds'></treeitems>
  </div>
</template>

<script>
import treeitems from "./treeitems.vue";

export default {
  name: "menutree",
  data() {
    return {

    };
  },
  components: { treeitems },
  props: ["itemTree","currentItemId","visibleItemIds"],
  methods:{
   select(item){
     debugger
     this.currentItemId=item.itemId
     item.isOpen=!item.isOpen
     this.$router.push(item.path);
   }
  }
  ,created(){
    console.log("itemTree "+JSON.stringify(this.itemTree))
    console.log("currentItemId "+this.currentItemId)
    console.log("visibleItemIds "+this.visibleItemIds)
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
