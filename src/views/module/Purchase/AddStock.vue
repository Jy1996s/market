<template>
  <div class="acc-manage">
    
    <el-card class="box-card"  shadow="never">
      <div slot="header" class="clearfix">
        <h3 class="title">添加库存</h3>
      </div>
      <div class="text item">
        <!-- 
        model       : 表单管理的数据对象名称
        status-icon : 是否开启校验结果
        rules	      : 表单验证规则
        ref         : 组件的通用属性,唯一标识,将来可以用this.$refs.名称获取
        label-width	: 表单域标签的宽度
        -->
        <el-form
          :model="addstock"
          status-icon
          :rules="rules"
          ref="addForm"
          label-width="80px"
          style="width:420px"
        >
          <el-form-item label="商品条形码" prop="acc">
            <el-input type="text" v-model="addstock.barcode" autocomplete="off"></el-input>
          </el-form-item>

          <el-form-item label="数量" prop="acc">
            <el-input type="text" v-model="addstock.num" autocomplete="off"></el-input>
          </el-form-item>

          <el-form-item label="进价" prop="acc">
            <el-input type="text" v-model="addstock.price" autocomplete="off"></el-input>
          </el-form-item>

          <el-form-item>
            <el-button>重置</el-button>
            <el-button type="primary" @click="add">添加</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-card>
  </div>
</template>

<script>

// 引入接口
import {addstock} from '@/api/apis.js'

export default {
  data() {
    return {
      addstock: {
        barcode: "",
        num: "",
        price: ""
      },
      rules:{

      }
    };
  },
  // 方法
  methods: {
    add(){
      addstock(this.$qs.stringify(this.addstock))
      .then(data => {
        alert(data.msg)
        if(data.success){
          this.$router.replace("/home/Stock");
        }
      })
      .catch(err => {
        alert(err)
      })
    }
  },

 
};
</script>

<style lang="less">

</style>