<template>
  <div class="login_container">
    <div class="login_box">
      <div class="avatar_box">
        <img src="../../assets/img/cihcup.png" />
      </div>
      <!--登陆用户名和密码表单-->
      <el-form
        ref="LoginformRef"
        label-width="0px"
        class="login_form"
        :model="Loginform"
        :rules="loginformRules"
      >
        <el-form-item prop="userId">
          <el-input
            prefix-icon="el-icon-s-custom"
            class="form_input"
            v-model="Loginform.userId"
          ></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            prefix-icon="el-icon-unlock"
            class="form_input"
            v-model="Loginform.password"
            type="password"
          ></el-input>
        </el-form-item>
        <el-form-item prop="role">
          <el-radio-group v-model="Loginform.role">
            <el-radio :label="'0'">学生</el-radio>
            <el-radio :label="'1'">导师</el-radio>
            <el-radio :label="'2'">管理员</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item class="lbtn">
          <el-button
            type="primary"
            @click="login"
          >登陆</el-button>
          <el-button
            type="info"
            @click="LoginformRef"
          >重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { async } from "q";
export default {
  data() {
    return {
      Loginform: {
        userId: "",
        role: "",
        password: ""
      },
      loginformRules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          { min: 3, max: 11, message: "长度在 3 到 11 个字符", trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    //表单重置方法
    LoginformRef() {
      //console.log(this)
      this.$refs.LoginformRef.resetFields();
    },
    login() {
      console.log('是否防抖了了');
      //表单的预验证
      this.$refs.LoginformRef.validate(async valid => {
        if (!valid) return;
        //服务器返回值data:res映射
        const { data: res } = await this.$http.post(
          "/v1/user/login",
          this.Loginform
        );
        if (res.success !== true) {
          return this.$message.error(res.msg);
        } else {
          this.$message.success("登陆成功");
          //登陆成功后token值存到setionSTorage中，其他的API接口要在登陆之后才能访问，跳转路由
          window.sessionStorage.setItem("token", res.data.token);
          if (this.Loginform.role == "0") {
            this.$router.push("/student");
          } else if (this.Loginform.role == "1") {
            this.$router.push("/teacher");
          } else {
            this.$router.push("/manager");
          }
        }
      });
    }
  }
};
</script>

<style lang="less" scoped>
.login_container {
  background-image: url("../../assets/img/login.jpg");
  background-size: 100% 100%;
  height: 100%;
  width: 100%;
}

.login_box {
  width: 450px;
  height: 350px;
  background-color: #fff;
  left: 50%;
  top: 50%;
  position: absolute;
  transform: translate(-50%, -50%);
  border-radius: 5px;
  opacity: 0.9;
  box-shadow: 0 0 5px #fff;
}

.avatar_box {
  width: 130px;
  height: 130px;
  position: absolute;
  left: 50%;
  transform: translate(-50%, -50%);
  border: 1px solid #fff;
  border-radius: 50%;
  box-shadow: 0 0 5px #ddd;
  padding: 10px;
  background-color: #fff;
  img {
    width: 100%;
    height: 100%;
    border-radius: 50%;
    background: #eee;
  }
}

.lbtn {
  display: flex;
  justify-content: flex-end;
}

.login_form {
  position: absolute;
  bottom: 0px;
  width: 100%;
  padding: 0 30px;
  box-sizing: border-box;
}

.form_input {
  font-size: 18px;
}
.el-radio-group {
  margin-left: 100px;
}
</style>
