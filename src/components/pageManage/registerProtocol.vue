<template>
    <div>
        <a href="/oss/zhongan/page/registerProtocol.html" target="_blank">页面链接</a>
        <richtexteditor
                ref="richtexteditor"
                :contenteditable="alterable"
                contentHeight="500px"
        ></richtexteditor>
        <el-button @click="confirm" v-show="alterable">提交</el-button>
        <el-button @click="alter"  v-show="!alterable">修改</el-button>
    </div>
</template>

<script>
    import richtexteditor from "../richtexteditor/richtexteditor.vue";

    export default {
        components: { richtexteditor },
        props:['url'],
        methods: {
            refreshPage() {
                this.axios.get(`/oss/zhongan/page/registerProtocol.html?x=${new Date().getTime()}`).then(response => {
                    this.$refs.richtexteditor.setContent(response.data);
                })
            },
            alter(){
                this.alterable=true;
            },
            confirm(){
                let richtexteditor = this.$refs.richtexteditor.getContent();
                this.axios
                    .post(
                        `/zhongan/maintain/other/setpage?token=${this.$store.state.token}&filePath=/page/registerProtocol.html`,
                        richtexteditor)
                    .then(response => {
                        let data = response.data;
                        if (data.code != 0) {
                            this.$message({
                                showClose: true,
                                message: data.codeMsg,
                                type: "warning"
                            });
                        } else {
                            this.$message({
                                showClose: true,
                                message: '编辑成功',
                                type: "success"
                            });
                            this.alterable=false
                        }
                    });
            }

        },
        data() {
            return {
                alterable:false,
            };
        },
        created() {
            this.refreshPage()
        },
        activated(){
            this.refreshPage()
        },
    };
</script>

<style scoped>
    .el-input__inner {
        height: 35px !important;
    }
</style>
