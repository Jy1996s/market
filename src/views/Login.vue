<template>
  <div id="login">
    <el-card class="box-card" shadow="never">
      <div slot="header" class="clearfix">
        <h2>
          <i class="el-icon-s-custom" style="padding-right:6px"></i>超市管理系统
        </h2>
      </div>
      <div class="text item">
        <!-- 
        model       : 表单管理的数据对象名称
        status-icon : 是否开启校验结果
        rules	    : 表单验证规则
        ref         : 组件的通用属性,唯一标识,将来可以用this.$refs.名称获取
        label-width	: 表单域标签的宽度
        -->
        <el-form :model="user" status-icon :rules="rules" ref="loginForm" label-width="60px">
          <el-form-item label="账号" prop="username">
            <el-input v-model="user.username"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input
              type="password"
              v-model="user.password"
              autocomplete="off"
              @keyup.enter.native="submitForm"
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-button @click="resetForm">reset</el-button>
            <el-button type="primary" @click="submitForm">login</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-card>
  </div>
  <!------------------END -------------------->
</template>

<!-------------------------- 行为 ---------------------------->
<script>
// 引入接口
import { login } from "@/api/apis";
export default {
  // 数据
  data() {
    return {
      user: {
        username: "Jy",
        password: "666666"
      },
      // 定义表单验证规则
      rules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          {
            min: 2,
            max: 10,
            message: "用户名长度在 2 到 8 个字符",
            trigger: "blur"
          }
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          {
            min: 4,
            max: 10,
            message: "密码长度在 4 到 10 个字符",
            trigger: "blur"
          }
        ]
      } // 规则验证结束 -------------
    }; // 数据结束 -------------
  },
  // 方法
  methods: {
    // 登录事件 -------------
    submitForm() {
      // 保留this
      const _this = this; // vue对象
      // 在此表单 使用 validate() 方法对整个表单进行效验
      // valid 形参为是否效验通过的布尔值
      this.$refs.loginForm.validate(valid => {
        if (!valid) {
          // 表单格式验证失败
          _this.$message.error({
            message: "格式错误",
            center: true,
            duration: 2000
          });
        } else {
          // 表单格式验证通过 发送登录请求
          login(this.$qs.stringify(this.user)).then(result => {
            if (result.success) {
              // 保存 token 到本地
              localStorage.setItem("token", result.token);
              // 成功 提示信息
              _this.$message.success({
                message: result.msg,
                center: true,
                duration: 1000,
              });
              // 跳转到首页
              _this.$router.replace("/home/AccManage");
            } else{
              // 失败 提示信息
              _this.$message.error({
                message: result.msg,
                center: true,
                duration: 1000,
              });
            }
          });
        }
      });
    },
    // 重置事件 -------------
    resetForm() {
      // 在登录表单上 调用重置方法 resetFields()
      this.$refs.loginForm.resetFields();
    }
  } // 方法结束 -----------
};
</script>

<!-------------------------- 样式 ---------------------------->
<style lang="less">
#login {
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background: url("../assets/images/Bg.png") no-repeat;

  .el-card {
    width: 440px;
    height: 300px;
    h2 {
      margin: 0;
      text-align: center;
      font-weight: 500;
    }

    .text {
      padding-right: 26px;

      .el-button {
        width: 152px;
      }
    }
  }
}
</style>
