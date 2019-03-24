<template>
    <input type="file" ref="chooseInput"  @change="$emit('chosen',$event.target)"/>
</template>
    

<script>
export default {
    name:"chooseFile",
    methods:{
        choose:function(){
            this.$refs.chooseInput.click();
            return this;
        }
    }
    
}
</script>

<style>

</style>
