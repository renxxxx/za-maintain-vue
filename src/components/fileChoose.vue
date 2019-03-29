<template>
    <input type="file" ref="chooseInput"   @change="change($event)"/>
</template>
    

<script>
export default {
    name:"chooseFile",
    props:['maxSize'],
    methods:{
        choose:function(){
            this.$refs.chooseInput.click();
            return this;
        },
        change:function(ev){
            if(this.maxSize && ev.target.files[0].size > this.maxSize)
            {
                alert(`文件最大${parseInt(this.maxSize/1024/1024)}M`)
                return
            }
            this.$emit('chosen',ev.target)
            return this;
        }
    }
    
}
</script>

<style>

</style>
