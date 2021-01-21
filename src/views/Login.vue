<template>
  <el-container id="app">
    <el-main>
      <div class="box-card">
        <div class="login_left">
          <div class="login_explain">
            <el-avatar
              :size="55"
              style="float: left"
              :src="require('../assets/images/logo.png')"
            >
            </el-avatar>
            <strong
              style="
                line-height: 60px;
                color: white;
                font-family: 幼圆;
                font-size: 30px;
                float: left;
                margin-left: 15px;
              "
            >
              C语言学习系统
            </strong>
            <br style="line-height: 80px" />
            <strong
              style="
                float: left;
                color: white;
                font-size: 25px;
                font-family: 幼圆;
              "
            >
              便捷简易的C语言学习平台</strong
            >
            <br style="line-height: 70px" />
            <strong
              style="
                float: left;
                color: white;
                opacity: 0.7;
                font-size: 15px;
                font-family: 幼圆;
              "
              >开发人员：欧凤玲</strong
            >
            <br style="line-height: 35px" />
            <strong
              style="
                float: left;
                color: white;
                line-height: 25px;
                text-align: justify;
                font-size: 15px;
                font-family: 幼圆;
              "
            >
              本系统是基于Android平台的C语言学习系统，能使同学们随时随地开展C语言学习。
              本系统涵盖C语言各个章节要点的学习并提供在线习题测试帮助同学们更好更快地掌握C语言知识。欢迎下载使用！
            </strong>
            <hr style="position: absolute; bottom: 7%; width: 100%" />
          </div>

          <strong
            style="
              transform: translate(-50%, -50%);
              position: absolute;
              left: 50%;
              top: 90%;
              color: white;
              font-size: 15px;
              font-family: 幼圆;
            "
          >
            C语言学习系统——后台管理</strong
          >
        </div>
        <div class="login_right">
          <div class="login_explain_right">
            <strong
              style="
                line-height: 60px;
                font-family: 黑体;
                font-size: 30px;
                float: left;
                margin-left: 15px;
              "
            >
              欢迎登录
            </strong>
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm">
              <el-form-item prop="userName">
                <el-input
                  v-model="ruleForm.userName"
                  autocomplete="off"
                  class="input_login"
                  style="margin-top:5%;"
                  placeholder="用户名/手机号/邮箱"
                  clearable
                ><i slot="prefix" class="el-input__icon el-icon-user"></i>
                </el-input>
              </el-form-item>
              <el-form-item prop="password">
                <el-input
                  class="input_login"
                  type="password"
                  v-model="ruleForm.password"
                  autocomplete="off"
                  show-password
                  placeholder="请输入密码"
                  clearable
                >
                <i slot="prefix" class="el-input__icon el-icon-lock"></i>
                </el-input>
              </el-form-item>
              <el-form-item>
                <el-button 
                type="primary" 
                style="width:100%;height:50px;margin-top:5%;font-size:20px"
                @click="submitForm('ruleForm')"
                  >登录</el-button
                >
              </el-form-item>
            </el-form>
          </div>
        </div>
      </div>
    </el-main>
    <el-footer>©oufengling 邮箱：2044066152@qq.com</el-footer>
  </el-container>
</template>
<style scoped>
@import "../assets/css/Login.css";
</style>
<script>
export default {
  data() {
    var validateUserName = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("用户名为必填项"));
      }
      callback();
    };
    var validatePassword = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      }
      callback();
    };
    return {
      ruleForm: {
        userName: "",
        password: "",
      },
      rules: {
        userName: [{ validator: validateUserName, trigger: "blur" }],
        password: [{ validator: validatePassword, trigger: "blur" }],
      },
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          // 登陆验证
          const data = require("../../static/data.json");
          const user = data.user;
          let isLogin = false;
          if (this.ruleForm.userName !== "" && this.ruleForm.password !== "") {
            for (var i = 0; i < user.length; i++) {
              if (
                user[i].userName === this.ruleForm.userName &&
                user[i].password === this.ruleForm.password
              ) {
                isLogin = true;
              }
            }
          }
          if (isLogin === true) {
            this.$router.push("/About");
          } else {
            alert("用户名或密码错误");
          }
        } else {
          console.log("提交错误!!");
          return false;
        }
      });
    },
  },
};
</script>