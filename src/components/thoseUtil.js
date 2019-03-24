export function formatDate(fmt, date) {
    var o = {
        "M+": date.getMonth() + 1,     //月份 
        "d+": date.getDate(),     //日 
        "h+": date.getHours(),     //小时 
        "m+": date.getMinutes(),     //分 
        "s+": date.getSeconds(),     //秒 
        "q+": Math.floor((date.getMonth() + 3) / 3), //季度 
        "S": date.getMilliseconds()    //毫秒 
    };
    if (/(y+)/.test(fmt))
        fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
        if (new RegExp("(" + k + ")").test(fmt))
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
}


export function isVideoNamesuffix(name) {
    let n = name.lastIndexOf('.')
    if(n < 0||n==name.length-1)
        return false;
    let ss = name.sub(n+1).toLowerCase();
    if(ss=='avi'||ss=='mp4'||ss=='wmv')
        return true;
    else
        return false;
}

export function isAudioNamesuffix(name) {
    let n = name.lastIndexOf('.')
    if(n < 0||n==name.length-1)
        return false;
    let ss = name.sub(n+1).toLowerCase();
    if(ss=='mp3')
        return true;
    else
        return false;
}
export function isImageNamesuffix(name) {
    let n = name.lastIndexOf('.')
    if(n < 0||n==name.length-1)
        return false;
    let ss = name.sub(n+1).toLowerCase();
    if(ss=='jpg'||ss=='jpeg'||ss=='png')
        return true;
    else
        return false;
}

export function arrToSplit(arr,separator,clearEmpty){
    if (arr == null || arr.length == 0)
        return "";
    if(separator == null || separator == undefined)
        separator=','
    var s=''
    for (var i = 0; i < arr.length; i++) {
        if(clearEmpty)
        {
            if(arr[i]==null||arr[i]==undefined||arr[i].toString() == '')
                contunue;
        }
        else
            s = s+separator+arr[i];
    }
    if (s.length > 0)
        s = s.substring(1);
    return s;
}



export function getImgURL(fileNode) {  
    debugger
    let node = fileNode;
    var imgURL = "";
    try{  
        var file = null;  
        if(node.files && node.files[0] ){  
            file = node.files[0];  
        }else if(node.files && node.files.item(0)) {  
            file = node.files.item(0);  
        }  
        //Firefox 因安全性问题已无法直接通过input[file].value 获取完整的文件路径  
        try{  
            imgURL =  file.getAsDataURL();  
        }catch(e){  
            imgURL = window.URL.createObjectURL(file);  
        }  
    }catch(e){  
        if (node.files && node.files[0]) {  
            var reader = new FileReader();  
            reader.onload = function (eve) {  
                imgURL = eve.target.result;  
            };  
            reader.onloadstart = function (eve) {  
                imgURL = eve.target.result;  
            };  
            
            file = node.files[0];
            reader.readAsDataURL(file);  
        }  
    }  
    return imgURL;  
}  


export function ReFormData (){
    this.fd = new FormData();
    this.append = function(a,b){
        this.fd.append(a,b)
        return this;
    }
    this.get = function(){
        return this.fd;
    }
}


export function findParent(dom,clazz) {  
   if(dom.parentNode.classList.contains(clazz))
        return dom.parentNode;
    else if(dom.parentNode == document.body.parentNode)
        return null;
    else 
       return findParent(dom.parentNode,clazz)
}  
export default {findParent,ReFormData,formatDate,arrToSplit,getImgURL}