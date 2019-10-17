<template>
  <div>
    
    <!-- 卡片容器 -->
    <el-card class="box-card"  shadow="never">
      <!-- 卡片头部 -->
      <div slot="header" class="clearfix">
        <h3 class="title">库存管理</h3>
      </div>
      <!-- 卡片内容 -->
      <div>
        <!-- 行内搜索表单 -->
        <el-form :inline="true" :model="formInline" style="float: right;">
          <el-form-item style="margin-right:20px" label="类型 :">
            <el-select v-model="formInline.type" placeholder="------- 选择分类 ------">
              <el-option label="一一一" value="1"></el-option>
              <el-option label="二二二" value="2"></el-option>
              <el-option label="三三三" value="3"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="商品名称 :">
            <el-input v-model="formInline.name"></el-input>
          </el-form-item>

          <el-button type="primary">查询</el-button>
        </el-form>

        <!-- 商品列表 -->
        <!-- 
          data 数据源 数组格式
          stripe: 隔行换色
        -->
        <el-table :data="tableData" stripe style="width: 100%">
          <el-table-column prop="barcode" label="商品条形码"  align="center"></el-table-column>
          <!-- <el-table-column  label="商品名称" align="center"></el-table-column> -->

          <el-table-column prop="price" label="进价(元)" align="center"></el-table-column>
          <!-- <el-table-column  label="入库" align="center"></el-table-column> -->

          <el-table-column prop="num" label="库存" align="center"></el-table-column>
          <!-- <el-table-column  label="已售" align="center"></el-table-column> -->

          <el-table-column label="管理" align="center">
            <el-button size="mini"><i class="el-icon-edit"></i></el-button>
            <el-button size="mini" type="danger"><i class="el-icon-delete"></i></el-button>
          </el-table-column>
        </el-table>
        <!-- 分页 -->
        <el-pagination background layout="prev, pager, next" :total="1000"></el-pagination>
      </div>
    </el-card>
  </div>
</template>

<script>

// 引入接口
import { stock } from "@/api/apis.js";
export default {
  data() {
    return {
      formInline: {
        type: "",
        name: ""
      },
      tableData: [{ barcode: "666933", num: "93", price: 998.98 }]
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
      if (cellValue === 1) {
        return "普通员工";
      } else {
        return "超级管理员";
      }
    }
  },
  mounted() {
    stock()
      .then(data => {
        // console.log(data);
        this.tableData = data
      })
      .catch(err => {
        alert(err);
      });
  },

 
};
</script>

<style lang="less">
.el-table {
  border-top: 2px solid #ccc;
}
.el-pagination {
  width: 400px;
  margin: 0 auto;
  padding-top: 20px;
}
</style>