<template>
  <div class="container1">
    <el-col :span="20" :offset="2">
      <h1 style="font-size: 20px; color">
        <i class="el-icon-user-solid"></i>&emsp;个人信息
      </h1>
      <el-divider content-position="right">
        <i class="el-icon-info"></i>
      </el-divider>
      <el-form width="100%" ref="form" :model="form" label-width="80px">
        <br />
        <el-form-item label="姓名">
          <el-input v-model="form.s_name"></el-input>
        </el-form-item>
        <el-form-item label="性别">
          <el-radio-group v-model="form.s_gender">
            <el-radio label="男"></el-radio>
            <el-radio label="女"></el-radio>
            <el-radio label="未知"></el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="邮箱">
          <el-input v-model="form.s_email" placeholder="您还未填写邮箱！"></el-input>
        </el-form-item>
        <el-form-item label="手机号">
          <el-input v-model="form.s_phonenumber" placeholder="您还未填写手机号！"></el-input>
        </el-form-item>
        <el-form-item label="专业">
          <el-input v-model="form.s_profession" placeholder="您还未填写专业！"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="saveInfo()" :loading="loading">保存修改</el-button>
          <el-button type="danger" @click="dialogFormVisible = true">修改密码</el-button>
        </el-form-item>
      </el-form>
    </el-col>

    <!--重置密码-->
    <!-- Form -->
    <el-dialog title="修改密码" :visible.sync="dialogFormVisible" center width="35%">
      <el-form
        :model="ruleForm"
        status-icon
        :rules="rules"
        ref="ruleForm"
        label-width="140px"
        class="demo-ruleForm"
      >
        <el-form-item label="请输入原密码：" prop="oldPassword">
          <el-input type="password" v-model="ruleForm.oldPassword" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="请输入新密码：" prop="newPassword">
          <el-input type="password" v-model="ruleForm.newPassword" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="请确认新密码：" prop="newPasswordAagin">
          <el-input type="password" v-model="ruleForm.newPasswordAagin" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取消</el-button>
        <el-button type="primary" @click="resetPassword('ruleForm')" :loading="passwordLoding">确定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {},
      ruleForm: {
        oldPassword: "",
        newPassword: "",
        newPasswordAagin: ""
      },
      dialogTableVisible: false,
      dialogFormVisible: false,
      loading: false,
      passwordLoding: false,
      rules: {
        oldPassword: [
          { required: true, message: "请填写原密码", trigger: "blur" }
        ],
        newPassword: [
          { required: true, message: "新密码不能为空", trigger: "blur" }
        ],
        newPasswordAagin: [
          { required: true, message: "请确认新密码", trigger: "blur" }
        ]
      }
    };
  },

  created() {
    this.getInforData();
  },
  methods: {
    async getInforData() {
      const { data: res } = await this.$http.get(
        "/v1/user/info",
        {
          responseType: "json",
          headers: {
            Authorization: "Bearer " + window.sessionStorage.getItem("token")
          }
        } //token换成从缓存获取
      );
      if (res.success == true) {
        this.form = res.data.user;
      } else {
        return;
      }
    },
    async saveInfo() {
      this.loading = true;
      const { data: res } = await this.$http.post(
        "/v1/user/info/update",
        this.form,
        {
          responseType: "json",
          headers: {
            Authorization: "Bearer " + window.sessionStorage.getItem("token")
          }
        }
      );
      if (res.success) {
        this.loading = false;
        this.$message({
          message: "修改成功！",
          type: "success"
        });
        this.getInforData();
      } else {
        this.loading = false;
        this.$message.error("修改失败，请重试！");
      }
    },
    async resetPassword(formName) {
      this.passwordLoding = true;
      if (
        this.ruleForm.oldPassword === "" ||
        this.ruleForm.newPassword === "" ||
        this.ruleForm.newPasswordAagin === ""
      ) {
        this.passwordLoding = false;
        this.$message({
          showClose: true,
          message: "请将表单填写完整！"
        });
        return;
      }
      if (this.ruleForm.newPassword !== this.ruleForm.newPasswordAagin) {
        this.passwordLoding = false;
        this.$message({
          showClose: true,
          message: "新密码两次输入不一致，请核对！"
        });
        return;
      }
      const { data: res } = await this.$http.post(
        "/v1/user/info/password/reset",
        this.ruleForm,
        {
          responseType: "json",
          headers: {
            Authorization: "Bearer " + window.sessionStorage.getItem("token")
          }
        }
      );
      if (res.success) {
        this.passwordLoding = false;
        this.dialogFormVisible = false;
        this.$message({
          message: "密码重置成功！",
          type: "success"
        });
        this.getInforData();
      } else {
        this.passwordLoding = false;
        this.dialogFormVisible = false;
        this.$message.error(res.msg);
      }
    }
  }
};
</script>
<style scoped lang="less">
.container1 {
  padding-top: 40px;
  width: 100%;
  height: 100%;
  display: flex;
}
</style>
