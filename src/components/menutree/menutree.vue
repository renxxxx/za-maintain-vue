<template>
  <div style="width:100%;overflow: auto;">
    <treemenus :items="itemTree"  :select='select' :currentItemId='currentItemId' :userItemIds='userItemIds'></treemenus>
  </div>
</template>

<script>
import treemenus from "./treemenus.vue";

export default {
  name: "win-menu",
  data() {
    return {
      currentItemId:null,
      userItemIds:[1,3,6,7,4,5],
      itemTree: [
        {
          upId: 0,
          name: "1",
          isOpen: false,
          children: [
            { upId: 1, name: "4", isOpen: false, children: [], id: 4 },
            { upId: 1, name: "5", isOpen: false, children: [], id: 5 }
          ],
          id: 1
        },
        { upId: 0, name: "2", isOpen: false, children: [], id: 2 },
        {
          upId: 0,
          name: "3",
          isOpen: false,
          children: [
            {
              upId: 3,
              name: "6",
              isOpen: false,
              children: [
                { upId: 6, name: "7", isOpen: false, children: [], id: 7 }
              ],
              id: 6
            }
          ],
          id: 3
        }
      ]
    };
  },
  components: { treemenus },
  props: ["tree"],
  methods:{
   select(item){
     this.currentItemId=item.id
     item.isOpen=!item.isOpen
   }
  },
  beforeCreate(){
    alert(JSON.stringify(this.jsonDB.maintainModule.items))
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
