<template>
  <div class="chapter">
    <div class="chapter-container">
      <div class="handle-box">
        <el-select
          v-model="query.id"
          placeholder="条件"
          class="handle-select mr10"
        >
          <el-option key="1" label="标题" value="标题"></el-option>
          <el-option key="2" label="内容编号" value="内容编号"></el-option>
        </el-select>
        <el-input
          v-model="query.name"
          placeholder="请输入关键词"
          class="handle-input mr10"
        ></el-input>
        <el-button type="primary" icon="el-icon-search" @click="handleSearch"
          >搜索</el-button
        >
        <el-button
          type="primary"
          icon="el-icon-plus"
          class="handle-del mr10"
          @click="addChapter"
          >新增</el-button
        >
        <el-button
          type="primary"
          icon="el-icon-delete"
          class="handle-del mr10"
          @click="delAllSelection"
          >批量删除</el-button
        >
      </div>
      <!-- 表格内容 -->
      <el-table
        :data="chapterList.slice((currentPage-1)*pageNum,currentPage*pageNum)"
        border
        height="370"
        class="table"
        ref="multipleTable"
        header-cell-class-name="table-header"
        @selection-change="handleSelectionChange"
      >
        <el-table-column
          type="selection"
          width="80"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="id"
          label="内容编号"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="title"
          label="标题"
          align="center"
        ></el-table-column>
        <!-- 表格操作 -->
        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <el-button
              type="primary"
              icon="el-icon-edit"
              @click="handleEdit(scope.$index, scope.row)"
              >编辑</el-button
            >
            <el-button
              type="primary"
              icon="el-icon-delete"
              @click="handleDelete(scope.$index, scope.row)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页 -->
      <div class="pagination">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-sizes="[5, 10, 15, 20]"
          :page-size="pageNum"
          layout="total, sizes, prev, pager, next, jumper"
          :total="totalCount"
        >
        </el-pagination>
      </div>
    </div>

    <!-- 编辑弹出框 -->
    <el-dialog title="编辑章节" :visible.sync="editVisible" width="30%">
      <el-form ref="form" :model="form" label-width="70px">
        <el-form-item label="内容编号">
          <el-input v-model="form.id"></el-input>
        </el-form-item>
        <el-form-item label="标题">
          <el-input v-model="form.title"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="editVisible = false">取 消</el-button>
        <el-button type="primary" @click="saveEdit">确 定</el-button>
      </span>
    </el-dialog>

    <!-- 新增弹出框 -->
    <el-dialog :visible.sync="addVisible" width="65%">
        <span slot="title" class="chapter-add" >新增章节</span>
      <el-form ref="form" :model="addForm" label-width="70px">
        <el-form-item label="内容编号">
          <el-input v-model="addForm.id"></el-input>
        </el-form-item>
        <el-form-item label="标题">
          <el-input v-model="addForm.title"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="editVisible = false">取 消</el-button>
        <el-button type="primary" @click="saveEdit">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      query: {
        title: "",
        id: "",
        pageIndex: 1,
        pageSize: 10,
      },
      chapterList: [],
      multipleSelection: [],//多选
      delList: [],//删除列表
      editVisible: false,//编辑弹窗是否可见
      addVisible:false,//添加弹窗是否可见
      form: {},//编辑表单
      addForm:{},//新增表单
      idx: -1,
      id: -1,
      totalCount:1,//总条数
      currentPage:1,//当前页
      pageNum:5,//每页显示数据条数
      listData:[]//临时存放的chapterList表数据
    };
  },
  created() {
    this.getData();
  },
  methods: {
    // 触发搜索按钮
    handleSearch() {
      this.$set(this.query, "pageIndex", 1);
      //this.getData();
    },
    // 删除操作
    handleDelete(index, row) {
      // 二次确认删除
      this.$confirm("确定要删除吗？", "提示", {
        type: "warning",
      })
        .then(() => {
          this.$message.success("删除成功");
          this.chapterList.splice(index, 1);
        })
        .catch(() => {});
    },
    // 多选操作
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    delAllSelection() {
      const length = this.multipleSelection.length;
      let str = "";
      this.delList = this.delList.concat(this.multipleSelection);
      for (let i = 0; i < length; i++) {
        str += this.multipleSelection[i].name + " ";
      }
      this.$message.error(`删除了${str}`);
      this.multipleSelection = [];
    },
    // 编辑操作
    handleEdit(index, row) {
      this.idx = index;
      this.form = row;
      this.editVisible = true;
    },
    // 保存编辑
    saveEdit() {
      this.editVisible = false;
      this.$message.success(`修改第 ${this.idx + 1} 行成功`);
      this.$set(this.chapterList, this.idx, this.form);
    },
    addChapter(){
      this.addVisible = true;
    },
    //获取数据
    getData(){
      var that = this;
      const data = require("../../static/data.json");
      that.chapterList = data.chapterList;
      that.totalCount=data.chapterList.length;
    },
    //操作每页显示条数
    handleSizeChange(val) {
      this.pageNum=val;
    },
    //操作当前页
    handleCurrentChange(val) {
      this.currentPage=val;
    },
  },
};
</script>
<style scoped>
.chapter {
  background-color: white;
  height: 550px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 5px;
}
.chapter-container {
  width: 95%;
}
.pagination {
  text-align: right;
  margin-top: 15px;
}
.chapter-add{
  background-color: #409EFF;
}
.handle-box {
  margin-bottom: 20px;
}
.handle-select {
  width: 120px;
}
.handle-input {
  width: 300px;
  display: inline-block;
}
.table {
  width: 100%;
  font-size: 14px;
}
.red {
  color: #ff0000;
}
.mr10 {
  margin-right: 10px;
}
.table-td-thumb {
  display: block;
  margin: auto;
  width: 40px;
  height: 40px;
}
</style>