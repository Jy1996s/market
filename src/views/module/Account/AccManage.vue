<template>
  <div id="acc">
    <!-- 账号列表 -->
    <el-card class="box-card" shadow="never">
      <!-- 卡片头部 -->
      <div slot="header" class="clearfix">
        <h3 class="title">账号管理</h3>
      </div>
      <!-- 卡片内容 -->
      <div>
        <!-- 行内搜索表单 -->
        <el-form inline :model="searchForm" style="float: right;">
          <el-form-item style="margin-right:20px" label="角色 :">
            <el-select v-model="searchForm.role" placeholder="------- 选择角色 ------">
              <el-option label="所有人" value=""></el-option>
              <el-option label="普通员工" value="2"></el-option>
              <el-option label="超级管理员" value="1"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="用户名称 :">
            <el-input v-model="searchForm.username"></el-input>
          </el-form-item>
          <el-button type="primary" @click="doSearch">查询</el-button>
        </el-form>
        <!-- 账号列表 -->
        <!-- 
          data 数据源 数组格式
          stripe: 隔行换色
        -->
        <el-table :data="tableData" style="width: 100%">
          <el-table-column prop="username" label="用户名"  align="center"></el-table-column>
          <!-- <el-table-column prop="email" label="邮箱" width="180" align="center"></el-table-column> -->
          <el-table-column prop="role" label="角色" :formatter="renderRole" align="center"></el-table-column>
          <el-table-column prop="inputtime" label="录入时间" align="center"></el-table-column>
          <el-table-column label="操作" align="center">
            <template slot-scope="scope">
              <el-button size="mini" @click="handleEdit(scope.row)"><i class="el-icon-edit"></i></el-button>
              <el-button size="mini" type="danger" @click="handleDelete( scope.row.id)"><i class="el-icon-delete"></i></el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </el-card>
    <!-- 编辑用户表单 -->
    <el-dialog title="编辑用户" :visible.sync="dialogFormVisible">
      <el-form :model="editForm">
        <el-form-item label="用户名">
          <el-input v-model="editForm.username" autocomplete="off" disabled></el-input>
        </el-form-item>
        <el-form-item label="权限管理">
          <el-select v-model="editForm.role" placeholder="请选择角色">
            <el-option label="普通员工" value="2"></el-option>
            <el-option label="超级管理员" value="1"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="saveEdit">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
// 引入接口
import { listUser, delUser, editUser } from "@/api/apis.js";
export default {
  data() {
    return {
      searchForm:{username:'',role:''},
      tableData: [{ username: "李白", role: 1, inputtime: "13:20" }],

      dialogFormVisible: false, // 编辑用户表单默认隐藏
      editForm: { id: "", username: "", role: "" }
    };
  },
  // 方法
  methods: {
    // 列格式化函数
    // row    : 行数据对象
    // column : elementUI列组件对象
    // cellValue : 当前列的值
    // index : 索引
    renderRole(row, column, cellValue) {
      if (cellValue === "1") {
        return "超级管理员";
      } else {
        return "普通员工";
      }
    },

    // 搜索 ------------
    doSearch(){
      const _this= this;
      let searchKey = _this.$qs.stringify(_this.searchForm)
      listUser(searchKey)
      .then(data=>{
        _this.tableData = data
      })
            
    },

    // 获取用户列表函数
    showlistUser() {
      // 发送请求
      listUser()
        .then(data => {
          // 把相应结果丢给数据对象
          // 双向绑定完成数据更新
          this.tableData = data;
        })
        .catch(err => {
          alert(err);
        });
    },

    // 编辑用户 ---------------------
    handleEdit(row) {
      // 显示编辑表单
      this.dialogFormVisible = true;
      // 回显数据
      this.editForm = row;
    },
    // 确认修改用户 ------------------
    saveEdit() {
      const _this = this;
      let data = _this.$qs.stringify(_this.editForm);
      // 提交表单 发送请求
      editUser(data).then(result => {
        if (result.success) {
          // 成功消息提示
          this.$message({
            type: "success",
            message: result.msg,
            duration: 1000,
            onClose() {
              // 信息关闭时
              // 隐藏编辑表单
              _this.dialogFormVisible = false;
              // 重新渲染页面
              // 调用显示用户列表函数
              _this.showlistUser();
            }
          });
        } else {
          // 失败消息提示
          this.$message({
            type: "error",
            message: result.msg,
            duration: 1000,
            onClose() {
              _this.dialogFormVisible = false;
              _this.showlistUser();
            }
          });
        }
      });
    },

    // 删除用户 -----------------
    handleDelete(id) {
      const _this =this
      // 调用组件 $confirm 方法询问是否确认删除
      this.$confirm("确认删除?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          // 点击确认时 发送删除请求
          delUser(id).then(result => {
            if (result.success) {
              // 成功消息提示
              this.$message({
                type: "success",
                message: result.msg,
                duration: 1000,
                onClose() {
                  // 信息关闭时
                  // 重新渲染页面
                  // 调用显示用户列表函数
                  _this.showlistUser();
                }
              });
            } else {
              // 失败消息提示
              this.$message({
                type: "error",
                message: result.msg,
                duration: 1000
              });
            }
          });
        })
        .catch(() => {});
    }
  },
  // 视图挂载时
  mounted() {
    // 调用显示用户列表函数
    this.showlistUser();
  }
};
</script>

<style lang="less">
#acc,
.el-card {
  height: 100%;
}
</style>