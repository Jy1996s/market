<template>
  <div id="product">
   
    <!-- 卡片容器 -->
    <el-card class="box-card" shadow="never">
      <!-- 卡片头部 -->
      <div slot="header" class="clearfix">
        <h3 class="title">商品管理</h3>
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
          <el-table-column prop="code" label="商品条形码" width="100" align="center"></el-table-column>
          <el-table-column prop="name" label="商品名称" align="center"></el-table-column>
          <el-table-column prop="type" label="所属分类" align="center"></el-table-column>
          <el-table-column prop="m1" label="售价(元)" align="center"></el-table-column>
          <el-table-column prop="m2" label="畅销(元)" align="center"></el-table-column>
          <el-table-column prop="m3" label="市场价(元)" align="center"></el-table-column>
          <el-table-column prop="p" label="库存" align="center"></el-table-column>
          <el-table-column prop="pm" label="库存总额(元)" align="center"></el-table-column>
          <el-table-column prop="vv" label="销售总额(元)" align="center"></el-table-column>
          <el-table-column prop="xx" label="管理" align="center" width="120">
            <el-button size="mini">
              <i class="el-icon-edit"></i>
            </el-button>
            <el-button size="mini" type="danger">
              <i class="el-icon-delete"></i>
            </el-button>
          </el-table-column>
        </el-table>
        <!-- 分页 -->
        <el-pagination background layout="prev, pager, next" :total="1000"></el-pagination>
      </div>
    </el-card>
  </div>
</template>

<script>

export default {
  data() {
    return {
      formInline: {
        type: "",
        name: ""
      },
      tableData: [
        {
          code: "666999333",
          name: "山寨机",
          type: "垃圾",
          m1: "998",
          m2: "898",
          m3: "800",
          p: "283",
          pm: "9884098",
          vv: "13090800"
        },
         {
          code: "3992480FS",
          name: "战斗机",
          type: "飞机",
          m1: "336990",
          m2: "699480",
          m3: "393975",
          p: "223560",
          pm: "573458",
          vv: "9990800"
        },
        {
          code: "GDG8323",
          name: "公鸡",
          type: "畜生",
          m1: "23",
          m2: "30",
          m3: "15",
          p: "99",
          pm: "336",
          vv: "1980"
        },
        {
          code: "7564HSF43",
          name: "妖姬",
          type: "姬姬",
          m1: "90",
          m2: "289",
          m3: "323",
          p: "6960",
          pm: "930890",
          vv: "980909"
        }
      ]
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

 
};
</script>

<style lang="less">
#product,.el-card{
  height: 100%;
}
.el-table {
  border-top: 2px solid #ccc;
}
.el-pagination {
  width: 400px;
  margin: 0 auto;
  padding-top: 20px;
}
</style>