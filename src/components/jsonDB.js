import axios from 'axios'
import qs from 'qs'
axios.qs = qs;
import jQuery from 'jquery'

let maintainModule = {
    get items() {
        if (!this._items || this._items.length == 0) {
            this.refresh();
        }
        return this._items
    },
    set items(items) { this._items = items },
    refresh() {
    debugger
        let _this = this;
        jQuery.ajax({
            url:"/zhongan/maintain/maintainmodulemanage/items",
            method:"post",
            data:{ ps: 1000 },
            async:false,
            success(data){
                if (data.code != 0) {
                    this.$message({
                        showClose: true,
                        message: data.codeMsg,
                        type: "warning"
                    });
                    return;
                }
                _this.items = data.data.items
            }
        })
    }
}

let articleType = {
    get items() {
        if (!this._items || this._items.length == 0) {
            this.refresh();
        }
        return this._items;
    },
    set items(items) { this._items = items },
    refresh() {
        this.items = [
            { key: 1, label: '新闻资讯', value: 1 },
            { key: 2, label: '视频中心', value: 2 },
        ]
    }
}

let jsonDB = { articleType, maintainModule }
export default { ...jsonDB }
