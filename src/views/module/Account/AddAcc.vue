<template>
  <div id="addacc">
    
    <el-card class="box-card"  shadow="never">
      <div slot="header" class="clearfix">
        <h3 class="title">账号管理</h3>
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
          :model="adduser"
          status-icon
          :rules="rules"
          ref="addForm"
          label-width="80px"
          style="width:400px"
        >
          <el-form-item label="账号" prop="username">
            <el-input type="text" v-model="adduser.username" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input type="password" v-model="adduser.password" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="确认密码" prop="checkPass">
            <el-input type="password" v-model="adduser.checkPass" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="角色">
            <el-select v-model="adduser.role" placeholder="--- 请选择角色权限 ---">
              <!-- <el-option label="--请选择--" value=""></el-option> -->
              <el-option label="普通员工" value="2"></el-option>
              <el-option label="超级管理员" value="1"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button>重置</el-button>
            <el-button type="primary" @click="addacc">添加</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-card>
  </div>
</template>

<script>

// 引入接口
import { addacc } from "@/api/apis.js";
export default {
  data() {
    // 缓存全局this
    const _this = this;

    // 自定义验证函数
    // rule 验证规则对象,可以拿到验证函数
    // value输入框的值(验证的核心数据)
    // callback 结果回调函数
    const validatePass = function(rule, value, callback) {
      //   // 正则规则
      const reg = /^[a-zA-z0-9]+$/;

      if (value === "") {
        callback(new Error("密码不能为空!"));
      } else if (value && value.length <= 3) {
        callback(new Error("密码必须不少于4位!"));
      } else if (!reg.test(value)) {
        callback(new Error("密码必须为字母或数字!"));
      } else {
        callback(); // 成功放行
      }
    };

    const validateCheckPass = function(rule, value, callback) {
      if (value === "") {
        callback(new Error("密码不能为空!"));
      } else if (value !== _this.adduser.password) {
        callback(new Error("两次密码不一致!"));
      } else {
        callback(); // 成功放行
      }
    };
    return {
      adduser: {
        username: "",
        password: "",
        checkPass: "",
        role: ""
      },
      // 定义表单验证规则
      rules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          {
            min: 2,
            max: 8,
            message: "用户名长度在 2 到 8 个字符",
            trigger: "blur"
          }
        ],
        password: [{ validator: validatePass, trigger: "blur" }],
        checkPass: [{ validator: validateCheckPass, trigger: "blur" }]
      }
    };
  },
  // 方法
  methods: {
    // 添加用户
    addacc() {
      const _this = this
      // console.log(this.$qs.stringify(this.adduser))
      // 发送请求
      addacc(this.$qs.stringify(this.adduser))
        .then(data => {
          // 跳转到账号管理
          if (data.success) {
            _this.$message.success({
                message: data.msg,
                center: true,
                duration: 1000,
            })
            this.$router.replace("/home/AccManage");
          } else{
            _this.$message.error({
                message: data.msg,
                center: true,
                duration: 1000,
            })
          }
        })
        .catch(err => {
          // console.log(err)
          alert(err);
        });
    }
  },

  
};
</script>

<style lang="less">
#addacc,.el-card{
  height: 100%;
}
</style>