<template>
  <div>
    <el-row>
      <el-button  @click="$router.push('/articleManage/add')">新建</el-button>
      <el-button @click="query">查询</el-button>
    </el-row>

    <el-form style="margin-top:10px;" :inline="true" class="demo-form-inline">
      <el-form-item label="关键字:">
        <el-input
          placeholder="请输入关键字"
          v-model="tableQuery.kw"
          clearable
        ></el-input>
      </el-form-item>
      <el-form-item label="添加时间始:">
        <el-date-picker
          v-model="tableQuery.addTimeStart"
          type="datetime"
          placeholder="选择日期时间"
        ></el-date-picker>
      </el-form-item>
      <el-form-item label="添加时间止:">
        <el-date-picker
          v-model="tableQuery.addTimeEnd"
          type="datetime"
          placeholder="选择日期时间"
        ></el-date-picker>
      </el-form-item>
      <el-form-item label="文章类型:">
        <el-select v-model="tableQuery.typeId" clearable placeholder="请选择">
          <el-option
                  v-for="item in jsonDB.articleType.items"
                  :key="item.itemId"
                  :label="item.name"
                  :value="item.itemId"
          ></el-option>
        </el-select>
      </el-form-item>
    </el-form>

    <el-table
      :cell-style="cellStyle"
      :header-cell-style="headerCellStyle"
      @row-dblclick="rowDblclick"
      @row-click="rowClick"
      :current-row-key="currentRowKey"
      :data="dataItems"
      height="400"
      border
      highlight-current-row
      :default-sort="{ prop: 'addTime', order: 'descending' }"
      @sort-change="sortChange"
    >
      <el-table-column
        fixed
        prop="itemId"
        label="ID"
        width="100"
        show-overflow-tooltip
      >
        <template v-slot="rowData" >
          {{'...'+rowData.row.itemId.substr(rowData.row.itemId.length - 6)}}
        </template>
      </el-table-column>
      <el-table-column
        prop="title"
        sortable="custom"
        label="标题"
        width="150"
        show-overflow-tooltip
      ><template v-slot="rowData" >
          <span v-html="thoseUtil.strongKeyword(rowData.row.title,tableQuery.kw)" :title="rowData.row.title"></span>
      </template>
      </el-table-column>
      <el-table-column prop="cover" label="封面" width="80" align="center">
        <template v-slot="rowData">
          <img :src="rowData.row.cover" style="height:30px;width:30px;cursor:pointer"
               @click="thisUtil.showImage($event.target.src)"/>
        </template>
      </el-table-column>
      <el-table-column
        prop="typeName"
        label="类型"
        sortable="custom"
        width="120"
        align="center"
        show-overflow-tooltip
      ></el-table-column>
      <el-table-column
        prop="orderNo"
        label="排序号"
        sortable="custom"
        width="120"
        align="right"
        show-overflow-tooltip
      ></el-table-column>
      <el-table-column
        prop="addTime"
        label="添加时间"
        sortable="custom"
        width="160"
        align="center"
        :formatter="formatterTime"
      ></el-table-column>
      <el-table-column
        prop="alterTime"
        label="修改时间"
        sortable="custom"
        width="160"
        align="center"
        :formatter="formatterTime"
      ></el-table-column>
      <el-table-column label="操作" width="200">
        <template v-slot="scope">
          <el-button
            @click="$router.push(`/articleManage/info/${scope.row.itemId}`)"
            type="text"
            size="small"
            >查看</el-button
          >
          <el-button
                  type="text"
                  size="small"
                  @click="$message(`请复制: ${scope.row.itemId}`)"
          >复制ID
          </el-button
          >
          <el-button
                  @click="itemDel(`${scope.row.itemId}`)"
                  type="text"
                  size="small"
          >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>

    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-sizes="[20, 40, 60, 100]"
      :page-size="pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="totalCount"
    ></el-pagination>
  </div>
</template>

<script>
export default {
  name: "articleManage",
  methods: {
    itemDel(itemId) {
      this.axios
              .post(
                      "/zhongan/maintain/articlemanage/itemdel",
                      this.axios.qs.stringify({itemId, token: this.$store.state.token})
              )
              .then(response => {
                let data = response.data;
                if (data.code != 0) {
                  this.$message({
                    showClose: true,
                    message: data.codeMsg,
                    type: "warning"
                  });
                  return;
                }
                this.$message({
                  showClose: true,
                  message: '删除成功',
                  type: "success"
                });
              });

    },
    query() {
      this.loadRemoteData();
    },
    cellStyle() {
      return {
        padding: "8px 0"
      };
    },
    sortChange(params) {
      debugger;
      this.sorts=[]
      this.orders=[]
      if (params.prop) {
        this.sorts.push(params.prop);
        this.orders.push(params.order == "ascending" ? "asc" : "desc");
      }else{
        this.sorts.push('addTime')
        this.orders.push('desc')
      }
      this.loadRemoteData();
    },
    headerCellStyle() {
      return {
        padding: "8px 0"
      };
    },
    handleSizeChange(val) {
      this.pageSize = val;
      this.loadRemoteData();
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.loadRemoteData();
    },
    rowClick(row, column, event) {},
    rowDblclick(row, column, event) {},
    formatterTime(row, column, cellValue, index) {
      return this.thoseUtil.formatDate(
        "yyyy-MM-dd hh:mm:ss",
        new Date(cellValue)
      );
    },


    loadRemoteData() {
      debugger;
      var queryObj = {
        ...this.tableQuery,
        pn: this.currentPage,
        ps: this.pageSize,
        token: sessionStorage.getItem("token"),
        sorts: this.thoseUtil.arrToSplit(this.sorts),
        orders: this.thoseUtil.arrToSplit(this.orders)
      };
      if (queryObj.addTimeStart)
        queryObj["addTimeStart"] = queryObj.addTimeStart.getTime();
      if (queryObj.addTimeEnd)
        queryObj["addTimeEnd"] = queryObj.addTimeEnd.getTime();

      this.axios
        .post(
          "/zhongan/maintain/articlemanage/items",
                this.axios.qs.stringify({...queryObj,token: this.$store.state.token})
        )
        .then(response => {
          let data = response.data;
          if (data.code != 0) {
            this.$message({
              showClose: true,
              message: data.codeMsg,
              type: "warning"
            });
            return;
          }
          this.dataItems = data.data.items;
          this.totalCount = data.data.sum.totalCount;
        });
    }
  },
  data() {
    return {
      alerts: [],
      tableQuery: {
        kw: null,
        addTimeStart: null,
        alterTimeStart: null
      },
      pageSize: 20,
      currentPage: 1,
      currentRowKey: null,
      dataItems: null,
      totalCount: 0,
      sorts: [],
      orders: []
    };
  },
  created() {}
};
</script>

<style scoped>
.el-input__inner {
  height: 35px !important;
}
</style>
