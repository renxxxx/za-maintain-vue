<template>
  <div>
    <el-row>
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
      :default-sort="{ prop: 'itemCode', order: 'ascending' }"
      @sort-change="sortChange"
    >
      <el-table-column
        fixed
        prop="itemCode"
        sortable="custom"
        label="位码"
        width="100"
        show-overflow-tooltip
      ></el-table-column>
      <el-table-column
        prop="name"
        sortable="custom"
        label="名称"
        width="150"
        show-overflow-tooltip
        ><template v-slot="rowData">
          <span
            v-html="thoseUtil.strongKeyword(rowData.row.name, tableQuery.kw)"
            :title="rowData.row.name"
          ></span>
        </template>
      </el-table-column>
      <el-table-column prop="introImg" label="简介图" width="80" align="center">
        <template v-slot="rowData">
          <img :src="rowData.row.introImg" v-if="rowData.row.introImg" style="height:30px;width:30px;cursor:pointer"
               @click="thisUtil.showImage($event.target.src)"/>
        </template>
      </el-table-column>
      <el-table-column
        prop="intro"
        label="简介"
        width="150"
        show-overflow-tooltip
        ><template v-slot="rowData">
          <span
            :title="rowData.row.intro"
          >{{rowData.row.intro}}</span>
        </template>
      </el-table-column>

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
      <el-table-column label="操作" width="100">
        <template v-slot="scope">
          <el-button
            @click="$router.push(`/adPlaceManage/info/${scope.row.itemCode}`)"
            type="text"
            size="small"
            >查看</el-button
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
  name: "articleTypeManage",
  methods: {
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
      this.sorts = [];
      this.orders = [];
      if (params.prop) {
        this.sorts.push(params.prop);
        this.orders.push(params.order == "ascending" ? "asc" : "desc");
      } else {
        this.sorts.push("itemCode");
        this.orders.push("asc");
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
      return cellValue
        ? this.thoseUtil.formatDate("yyyy-MM-dd hh:mm:ss", new Date(cellValue))
        : "";
    },
    loadRemoteData() {
      var queryObj = {
        ...this.tableQuery,
        pn: this.currentPage,
        ps: this.pageSize,
        token: this.$store.state.token,
        sorts: this.thoseUtil.arrToSplit(this.sorts),
        orders: this.thoseUtil.arrToSplit(this.orders)
      };

      this.axios
        .post(
          "/zhongan/maintain/adplacemanage/items",
          this.axios.qs.stringify(queryObj)
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
        kw: null
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
