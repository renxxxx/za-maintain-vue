import thoseUtil from "./thoseUtil.js";
import axios from "axios";
import qs from "qs";

export function uploadFile(fileDom, success) {
  axios({
    url: "/oss/file/upload4",
    method: "post",
    params: { project: "zhongan" },
    data: new thoseUtil.ReFormData().append("file", fileDom.files[0]).get(),
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
    success(data.data.url);
  });
}

export function getBigtxt(id, success) {
  if (id)
    axios.get(`/zhongan/other/bigtxt/${id}/${id}`).then(response => {
      success(response.data);
    });
}

export default { uploadFile, getBigtxt };
