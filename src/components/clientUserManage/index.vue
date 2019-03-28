<template>
  <div>
    <el-row>
      <el-button  @click="$router.push('/clientUserManage/add')">新建</el-button>
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
      <el-form-item label="注册时间始:">
        <el-date-picker
          v-model="tableQuery.addTimeStart"
          type="datetime"
          placeholder="选择日期时间"
        ></el-date-picker>
      </el-form-item>
      <el-form-item label="注册时间止:">
        <el-date-picker
          v-model="tableQuery.addTimeEnd"
          type="datetime"
          placeholder="选择日期时间"
        ></el-date-picker>
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

      @sort-change="sortChange"
    >
      <el-table-column
        fixed
        prop="itemId"
        label="ID"
        width="100"
        show-overflow-tooltip
        :formatter="formatterId"
      ></el-table-column>
      <el-table-column prop="headimg" label="头像" width="80" align="center">
        <template v-slot="rowData">
          <img :src="rowData.row.headimg" v-if="rowData.row.headimg" style="height:30px;width:30px;cursor:pointer"
               @click="thisUtil.showImage($event.target.src)"/>
        </template>
      </el-table-column>
      <el-table-column
              prop="realname"
              sortable="custom"
              label="姓名"
              width="150"
              show-overflow-tooltip
      ><template v-slot="rowData" >
        <span v-html="thoseUtil.strongKeyword(rowData.row.realname,tableQuery.kw)" :title="rowData.row.realname"></span>
      </template>
      </el-table-column>
      <el-table-column
              prop="phone"
              sortable="custom"
              label="手机"
              width="150"
              show-overflow-tooltip
      ><template v-slot="rowData" >
        <span v-html="thoseUtil.strongKeyword(rowData.row.phone,tableQuery.kw)" :title="rowData.row.phone"></span>
      </template>
      </el-table-column>
      <el-table-column
              prop="frozenIf"
              label="冻结"
              sortable="custom"
              width="110"
              align="center"
              show-overflow-tooltip
      >
        <template v-slot="rowData">
          {{rowData.row.frozenIf?'是':'否'}}
        </template>
      </el-table-column>

      <el-table-column
        prop="registerTime"
        label="注册时间"
        sortable="custom"
        width="160"
        align="center"
        :formatter="formatterTime"
      ></el-table-column>
      <el-table-column
        prop="lastAliveTime"
        label="最后活跃时间"
        sortable="custom"
        width="160"
        align="center"
        :formatter="formatterTime"
      ></el-table-column>
      <el-table-column label="操作" width="200">
        <template v-slot="scope">
          <el-button
            @click="$router.push(`/clientUserManage/info/${scope.row.itemId}`)"
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
    refreshPage(){
      this.loadRemoteData();
    },
    itemDel(itemId) {
      this.axios
              .post(
                      "/zhongan/maintain/clientusermanage/itemdel",
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
        this.sorts.push('registerTime')
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
    formatterId(row, column, cellValue, index) {
      return cellValue.substr(cellValue.length - 6);
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
          "/zhongan/maintain/clientusermanage/items",
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
        alterTimeStart: null,
        moduleId: null,
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
  created() {
    this.refreshPage()
  }
};
</script>

<style scoped>
.el-input__inner {
  height: 35px !important;
}
</style>
