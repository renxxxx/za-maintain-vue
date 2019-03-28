import Vue from 'vue'
import imageShow from "./imageShow.vue";
import fileChoose from "./fileChoose.vue";
import imageEdit from "./imageEdit.vue";



export function showImage(imgUrl) {
    var ImageShow = Vue.extend(imageShow);
    var si = new ImageShow({ propsData: { imgUrl } });
    si.$mount();
  }


  export function  chooseFile(choosen) {
    var FileChoose = Vue.extend(fileChoose);
    var cf = new FileChoose();
    cf.$mount()
      .choose()
      .$on("chosen", choosen);
  }

 
  
  export function  editImage(imageUrl,giveMe) {
    var ImageEdit = Vue.extend(imageEdit);
    var ei = new ImageEdit({
      propsData: {
        imgUrl: imageUrl,
        visible: true,
        giveMe
      }
    });
    ei.$mount();
  }



  export default {showImage,chooseFile,editImage}