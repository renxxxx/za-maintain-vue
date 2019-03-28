import axios from "axios";
import qs from "qs";
axios.qs = qs;
import jQuery from "jquery";
import ElementUI from "element-ui";
import Cookies from "js-cookie";
import thoseUtil from "./thoseUtil.js";

let maintainModule = {
  _itemsTree: [],
  _itemsLineTree: [],
  _items:[],
  get itemsTree() {
    if (!this._itemsTree || this._itemsTree.length == 0) {
      this._itemsTree = thoseUtil.lineToTree(this.items,'itemId','parentId','children')
    }
    return this._itemsTree;
  },
  get itemsLineTree() {
    debugger
    if (!this._itemsLineTree || this._itemsLineTree.length == 0) {
      this._itemsLineTree = thoseUtil.toLineTreeArray(this.itemsTree,'itemId','parentId','children',1)
    }
    return this._itemsLineTree;
  },
  get items() {
    if (!this._items || this._items.length == 0) {
      this.refresh();
    }
    return this._items;
  },
  set items(items) {
    this._items = items;
  },
  refresh() {
    let _this = this;
    jQuery.ajax({
      url: "/zhongan/maintain/maintainmodulemanage/items",
      method: "post",
      data: { ps: 1000 },
      async: false,
      success(data) {
        if (data.code != 0) {
          ElementUI.Message({
            showClose: true,
            message: data.codeMsg,
            type: "warning"
          });
          return;
        }

        _this._items = data.data.items;
        for (let item of _this._items)
          if (item.itemId == 1) item.path = "/articleManage/index";
          else if (item.itemId == 2) item.path = "/articleTypeManage/index";
          else if (item.itemId == 3) item.path = "/productTypeManage/index";
          else if (item.itemId == 4) item.path = "/productManage/index";
          else if (item.itemId == 5) item.path = "/adPlaceManage/index";
          else if (item.itemId == 6) item.path = "/adManage/index";
          else if (item.itemId == 7) item.path = "/maintainModuleManage/index";
          else if (item.itemId == 8) item.path = "/maintainUserManage/index";
      }
    });
    return _this._items;
  }
};

let articleType = {
  get items() {
    if (!this._items || this._items.length == 0) {
      this.refresh();
    }
    return this._items;
  },
  set items(items) {
    this._items = items;
  },
  refresh() {
    let _this = this;
    jQuery.ajax({
      url: "/zhongan/maintain/articletypemanage/items",
      method: "post",
      data: { ps: 1000, token: Cookies.get("token") },
      async: false,
      success(data) {
        if (data.code != 0) {
          ElementUI.Message({
            showClose: true,
            message: data.codeMsg,
            type: "warning"
          });
          return;
        }
        _this._items = data.data.items;
      }
    });
    return _this._items;
  }
};

let productType = {
  get items() {
    if (!this._items || this._items.length == 0) {
      this.refresh();
    }
    return this._items;
  },
  set items(items) {
    this._items = items;
  },
  refresh() {
    let _this = this;
    jQuery.ajax({
      url: "/zhongan/maintain/producttypemanage/items",
      method: "post",
      data: { ps: 1000, token: Cookies.get("token") },
      async: false,
      success(data) {
        if (data.code != 0) {
          ElementUI.Message({
            showClose: true,
            message: data.codeMsg,
            type: "warning"
          });
          return;
        }
        _this._items = data.data.items;
      }
    });
    return _this._items;
  }
};

let adType = {
  itemsMap: null,
  item(id) {
    return this.itemsMap[id];
  },
  get items() {
    if (!this._items || this._items.length == 0) {
      this.refresh();
    }
    return this._items;
  },
  set items(items) {
    this._items = items;
  },
  refresh() {
    let _this = this;
    _this.items = [
      { itemId: 0, name: "纯展示" },
      { itemId: 1, name: "网页广告" },
      { itemId: 2, name: "文章广告" },
      { itemId: 3, name: "产品广告" }
    ];
    _this.itemsMap = {};
    for (let item of _this.items) {
      _this.itemsMap[item.itemId] = item;
    }
    return _this._items;
  }
};

let adPlace = {
  itemsMap: null,
  get items() {
    if (!this._items || this._items.length == 0) {
      this.refresh();
    }
    return this._items;
  },
  set items(items) {
    this._items = items;
  },
  item(id) {
    return this.itemsMap[id];
  },
  refresh() {
    let _this = this;
    jQuery.ajax({
      url: "/zhongan/maintain/adplacemanage/items",
      method: "post",
      data: { ps: 1000, token: Cookies.get("token") },
      async: false,
      success(data) {
        if (data.code != 0) {
          ElementUI.Message({
            showClose: true,
            message: data.codeMsg,
            type: "warning"
          });
          return;
        }
        _this._items = data.data.items;
        _this.itemsMap = {};
        for (let item of _this.items) {
          _this.itemsMap[item.itemCode] = item;
        }
      }
    });
    return _this._items;
  }
};
let jsonDB = { adType, adPlace, articleType, maintainModule, productType };
export default { ...jsonDB };
