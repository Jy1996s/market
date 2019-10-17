<template>
  <el-container>
    <!-- 头部 -->
    <el-header>
      <!-- 左侧标题 -->
      <p class="title">
        <i class="el-icon-s-shop"></i>
        超市管理系统
      </p>
      <!-- 右侧用户信息 -->
      <span class="user-info">
        <img src="../assets/images/icon_head.png" alt="head-icon" />
        <span class="username">{{username}}</span>
        <el-button size="mini" type="info" @click="logout" plain>Exit</el-button>
        <!-- <span @click="logout">注销</span> -->
      </span>
    </el-header>
    <el-container>
      <!-- 侧栏和主体 -->
      <el-aside width="200px">
        <!-- 插入侧栏组件 -->
        <my-menu />
      </el-aside>
      <el-container>
      <!-- 内容 -->
      <el-main>
        <router-view/>
      </el-main>
      <!-- 页脚 -->
      
      <el-footer style="line-height:40px;height:40px;color:#909399">
        <p style="text-align: center; margin:0;font-size:14px">©COPYRIGHT 2019 润家超市管理系统</p>
      </el-footer>
      </el-container>
    </el-container>

  </el-container>

</template>

<script>
// 引入侧栏菜单组件
import Menu from "../components/Menu";

// 引入接口
import { getUserName } from "@/api/apis";

export default {
  data() {
    return {
      username:'用户名'
    };
  },
  // 方法 ------------
  methods: {
    logout() {
      // alert('11')
      localStorage.removeItem('token')
      this.$router.replace("/");
    }
  },
  // 页面挂载完毕
  mounted(){
    const $this = this ;
    let token = localStorage.getItem('token')
    
    getUserName(token) // 发送请求 获取用户名
    .then(result=>{
        $this.username = result.username
    })
    .catch(err=>{
      if(err){
        alert(err)
      }
    })

  },
  // 注册组件 -------------
  components: {
    'my-menu':Menu
  }
};
</script>

<style lang="less">
.el-container {
  height: 100%;

  .el-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: rgb(230, 232, 236);
    color: rgb(148, 168, 196);
    padding: 0;
    height: 40px !important;

    .title {
      width: 170px;
      padding-left: 30px;
      height: 100%;
      margin: 0;
      line-height: 40px;
      font-size: 18px;
      background-color: #2E3F56;
    }
    .user-info {
      display: flex;
      align-items: center;

      img {
        height: 26px;
        margin-right: 8px;
      }

      .el-button{
        margin: 0 20px 0 8px
      }
    }

  }

  .el-aside {
    background-color: #d3dce6;
    text-align: center;
    line-height: 200px;
  }

  .el-main {
    // background-color: #eee;
    color: #333;

    .el-card__header{
      background: #EFF1F6;

      .title{
        margin: 0;
        color: rgb(97, 93, 93);
      }
    }
  }
}
</style>