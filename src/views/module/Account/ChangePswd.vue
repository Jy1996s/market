<template>
  <div id="changePass">
    <el-card class="box-card" shadow="never">
      <!-- 标题 -->
      <div slot="header" class="clearfix">
        <h3 class="title">修改密码</h3>
      </div>
      <!-- 密码修改表单 -->
      <el-form
        :model="user"
        :rules="rules"
        ref="changePass"
        label-width="100px"
        style="width:400px"
      >
        <el-form-item label="原密码" prop="password">
          <el-input type="text" v-model="user.password"></el-input>
        </el-form-item>
        <el-form-item label="新密码" prop="newPwd">
          <el-input type="password" v-model="user.newPwd"></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="checkPwd">
          <el-input type="password" v-model="user.checkPwd"></el-input>
        </el-form-item>

        <el-form-item>
          <el-button @click="resetForm">重置</el-button>
          <el-button type="primary" @click="submitForm">确认</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>
<script>
// 引入接口
import { changePwd } from "@/api/apis";
export default {
  data() {
    // 缓存全局this
    const _this = this;

    // 自定义验证函数
    // rule 验证规则对象,可以拿到验证函数
    // value输入框的值(验证的核心数据)
    // callback 结果回调函数
    const validatePwd = function(rule, value, callback) {
      //   // 正则规则
      const reg = /^[a-zA-z0-9]+$/;

      if (value === "") {
        callback(new Error("密码不能为空!"));
      } else if (value.length < 4 || value.length > 9) {
        callback(new Error("密码长度在 4 到 10 个字符!"));
      } else if (!reg.test(value)) {
        callback(new Error("密码必须为字母或数字!"));
      } else {
        callback(); // 成功放行
      }
    };

    const validateCheckPwd = function(rule, value, callback) {
      if (value === "") {
        callback(new Error("密码不能为空!"));
      } else if (value !== _this.user.newPwd) {
        callback(new Error("两次密码不一致!"));
      } else {
        callback(); // 成功放行
      }
    };

    return {
      user: {
        password: "",
        newPwd: "",
        checkPwd: ""
      },
      //   规则制定
      rules: {
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          {
            min: 4,
            max: 10,
            message: "密码长度在 4 到 10 个字符",
            trigger: "blur"
          }
        ],
        newPwd: [
          { validator: validatePwd, trigger: "blur" }
        ],
        checkPwd: [
          { validator: validateCheckPwd, trigger: "blur" }
        ]
      }
    };
  },

  //   方法
  methods: {
    resetForm() {},
    submitForm() {
      // 保留this
      let _this = this
      // 获取参数并转换
      let data = _this.$qs.stringify({
        token:localStorage.getItem('token'),
        password:_this.user.password,
        newPwd:_this.user.newPwd
      })
      // 发送请求
      changePwd(data)
      .then(result=>{
        alert(result.msg)
        if(result.success){
          // 如果成功 跳转到登录页面
          _this.$router.replace('/login')
        }
      })
      .catch(err=>{
        alert(err)
      })
    }
  }
};
</script>
<style lang="less">
#changePass,
.el-card {
  height: 100%;
}
</style>