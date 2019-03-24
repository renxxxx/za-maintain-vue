<template>
  <ul  style="padding-left:10px;margin:0;margin-left:10px;">
    <li  style="cursor:pointer" v-for="(item,index) in items"  v-if="userItemIds.indexOf(item.id) > -1" :key="index" >
      <p @click.self="select(item)" style="margin:0" :class="{'active':currentItemId==item.id}">{{item.name}}</p>
      <div v-show="item.isOpen">
        <treemenus :items="item.children" :select='select' :currentItemId='currentItemId' :userItemIds='userItemIds'></treemenus>
      </div>
    </li>
  </ul>
</template>

<script>
export default { 
  name: "treemenus",
  props: ["items","select","currentItemId","userItemIds"],
  data(){
    return {
     
    }
  }
}; 
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.active{
  color:red;
}
</style>
