<template>
  <div class="login_container">
    <div class="login_box">
      <div class="avatar_box">
        <img src="../assets/foods.jpg" alt />
      </div>
      <el-form
        :rules="loginFormRules"
        ref="loginFormRef"
        label-width="80px"
        class="login_form"
        :model="loginform"
      >
        <el-form-item label="用户名" prop="username">
          <el-input prefix-icon="el-icon-user" v-model="loginform.username"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input type="password" prefix-icon="el-icon-goods" v-model="loginform.password"></el-input>
        </el-form-item>
        <el-form-item class="btns">
          <el-button type="primary" @click="login">登录</el-button>
          <el-button type="info" @click="resetLoginForm">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>>
<script>
export default {
  data() {
    return {
      loginform: {
        username: "admin",
        password: "admin888"
      },
      loginFormRules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          { min: 2, max: 10, message: "长度在 2 到 10 个字符", trigger: "blur" }
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { min: 6, max: 15, message: "长度在 6 到 15 个字符", trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    resetLoginForm() {
      this.$refs.loginFormRef.resetFields();
    },
    login() {
      this.$refs.loginFormRef.validate(valid => {
        if (!valid) return;
        this.axios
          .post("http://127.0.0.1:8888/api/private/v1/login", this.loginform)
          .then(response => {
            console.log(response);
          });
        // this.$message.success("登录成功");
        // this.$message.error("登录失败");
        //1.将登录之后的token，保存到客户端的seesionStorage中
        //1.1 项目中出了的登录之外的其他接口，必须在登录之后才能访问
        //1.2 token只应在当前网站打开期间生效，所以将token保存在seesionStorage中
        // window.sessionStorage.setItem("token", response.data.token);
        //2.通过编程式导航跳转到后台主页，路由地址式/home
        // this.$router.push("/home");
      });
    }
  }
};
</script>>
<style lang="less" scoped>
.login_container {
  background-color: #2b4b6b;
  height: 100%;
}
.login_box {
  width: 450px;
  height: 300px;
  background-color: #fff;
  border-radius: 3px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  .avatar_box {
    height: 130px;
    width: 130px;
    border: 1px solid #eee;
    border-radius: 50%;
    padding: 10px;
    box-shadow: 0 0 10px #ddd;
    position: absolute;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: #fff;
    img {
      width: 100%;
      height: 100%;
      border-radius: 50%;
      background-color: #eee;
    }
  }
}
.login_form {
  position: absolute;
  bottom: 0;
  width: 100%;
  padding: 0 20px;
  box-sizing: border-box;
}
.btns {
  display: flex;
  justify-content: flex-end;
}
</style>