import thoseUtil from './thoseUtil.js';
import axios from 'axios'
import qs from 'qs'
import ElementUI from 'element-ui';

export function uploadFile(fileDom, success) {
    axios({
        url: "/oss/file/upload",
        method: "post",
        params: { path: "zhongan" },
        data: new thoseUtil.ReFormData()
            .append("file", fileDom.files[0])
            .get(),
        contentType: "multipart/form-data"
    }).then(response => {
        let data = response.data;
        if (data.code != 0) {
            this.$message({
                showClose: true,
                message: data.codeMsg,
                type: "warning"
            });
            return;
        }
        success(data.data.url) 
    })
}

export default { uploadFile }
