<template>
  <div id="addpro">
    
    <!-- 卡片容器 -->
    <el-card class="box-card"  shadow="never">
      <!-- 卡片头部 -->
      <div slot="header" class="clearfix">
        <h3 class="title">商品管理</h3>
      </div>
      <!-- 卡片内容 -->
      <div>
        <!-- 表单 -->
        <el-form size="mini" style="display:flex;justify-content: space-evenly;">
          <div class="left">
            <el-form-item label="所属分类">
              <el-select v-model="AddFrom.type" placeholder="------- 选择分类 ------">
                <el-option label="一一一" value="1"></el-option>
                <el-option label="二二二" value="2"></el-option>
                <el-option label="三三三" value="3"></el-option>
              </el-select>
            </el-form-item>

            <el-form-item label="商品名称">
              <el-input v-model="AddFrom.name"></el-input>
            </el-form-item>

            <el-form-item label="商品售价">
              <el-input v-model="AddFrom.name"></el-input>
            </el-form-item>

            <el-form-item label="市场价">
              <el-input v-model="AddFrom.name"></el-input>
            </el-form-item>

            <el-form-item label="商品进价">
              <el-input v-model="AddFrom.name"></el-input>
            </el-form-item>
            <el-form-item label="入库数量">
              <el-input v-model="AddFrom.name"></el-input>
            </el-form-item>
          </div>

          <div class="right">
            <el-form-item label="商品重量">
              <el-input v-model="AddFrom.name"></el-input>
            </el-form-item>

            <el-form-item label="商品单位">
              <el-input v-model="AddFrom.name"></el-input>
            </el-form-item>
            <el-form-item label="会员优惠" prop="resource">
              <el-radio-group v-model="AddFrom.name">
                <el-radio label="享受"></el-radio>
                <el-radio label="不享受"></el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="是否促销" prop="resource">
              <el-radio-group v-model="AddFrom.name">
                <el-radio label="启用"></el-radio>
                <el-radio label="禁用"></el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="活动形式" prop="desc">
              <el-input type="textarea" v-model="AddFrom.name" placeholder="不超过200个汉字"></el-input>
              
            </el-form-item>
            
             <el-button type="primary">添加</el-button>
          </div>
        </el-form>
      </div>
    </el-card>
  </div>
</template>

<script>


export default {
  data() {
    return {
      AddFrom: {
        type: "",
        name: ""
      }
    };
  },

 
};
</script>

<style lang="less">
#addpro,.el-card{
  height: 100%;
}
#addpro {
  .el-form{
      height: 600px;
      
  }
}
</style>