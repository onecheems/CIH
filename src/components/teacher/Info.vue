<template>
  <div class="container1">
    <div class="cont">
      <img class="img1" src="../../assets/img/infor_img.jpg" />
      <div class="text">
        <p class="title">个人信息</p>
        <p class="name">
          <i class="el-icon-user-solid"></i> 姓名：
          <span>{{teacherData.t_name}}</span>
        </p>
        <p class="email">
          <i class="el-icon-s-promotion"></i> 邮箱：
          <span>{{teacherData.t_email}}</span>
        </p>
        <p class="email">
          <i class="el-icon-s-flag"></i> 专业：
          <span>{{teacherData.t_profession}}</span>
        </p>
        <p class="email">
          <i class="el-icon-phone"></i> 联系电话：
          <span>{{teacherData.t_phonenumber}}</span>
        </p>
        <p class="email">
          <i class="el-icon-s-opportunity"></i> 研究方向：
          <span>{{teacherData.t_profession_direction}}</span>
        </p>
        <p class="email">
          <i class="el-icon-s-order"></i> 基本介绍：
          <span>{{teacherData.t_introduction}}</span>
        </p>
        <div class="btn">
          <el-button type="primary" icon="el-icon-edit" @click="EditTeacherData()">编辑信息</el-button>
          <el-button type="success" icon="el-icon-delete" @click="EditPassword">修改密码</el-button>
        </div>
      </div>
    </div>
    <div>
      <img class="img2" src="../../assets/img/infor_img2.jpg" />
    </div>
    <!-- 点击编辑信息的对话框-->
    <el-dialog title="个人信息" :visible.sync="dialogFormVisible">
      <el-form :model="Editform">
        <el-form-item label="邮箱" label-width="80px">
          <el-input v-model="Editform.t_email" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="专业" label-width="80px">
          <el-input v-model="Editform.t_profession" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="联系电话" label-width="80px">
          <el-input v-model="Editform.t_phonenumber" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="研究方向" label-width="80px">
          <el-input v-model="Editform.t_profession_direction" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="介绍" label-width="80px">
          <el-input v-model="Editform.t_introduction" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="EditSubmit">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 点击修改密码的对话框 -->
    <el-dialog title="修改密码" :visible.sync="dialogPasswordVisible">
      <el-form :model="Editpassword">
        <el-form-item label="请输入新密码" label-width="130px">
          <el-input v-model="Editpassword.password" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogPasswordVisible= false">取 消</el-button>
        <el-button type="primary" @click="EditPasswordSubmit()">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
export default {
  data() {
    return {
      teacherData: {},
      dialogFormVisible: false,
      Editform: {},
      dialogPasswordVisible: false,
      Editpassword: {
        password: ""
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
        this.teacherData = res.data.user;
      } else {
        return;
      }
    },
    //修改信息
    EditTeacherData() {
      this.dialogFormVisible = true;
      this.Editform = this.teacherData;
    },

    async EditSubmit() {
      const { data: res } = await this.$http.post(
        "/v1/user/info/update",
        this.Editform,
        {
          responseType: "json",
          headers: {
            Authorization: "Bearer " + window.sessionStorage.getItem("token")
          }
        }
      );
      if (res.success) {
        this.$message.success("提交成功");
      } else {
        return this.$message.danger("提交失败");
      }
      this.getInforData();

      this.dialogFormVisible = false;
    },



    //修改密码
    EditPassword() {
      this.dialogPasswordVisible = true;
    },

    //确定修改
    async EditPasswordSubmit() {
      const { data: res } = await this.$http.post(
        "/v1/user/info/password/reset",
        this.Editpassword,
        {
          responseType: "json",
          headers: {
            Authorization: "Bearer " + window.sessionStorage.getItem("token")
          }
        }
      );
      if (res.success) {
        this.$message.success("修改成功");
      } else {
       return  this.$message.danger("失败")
      }
      this.getInforData();
      this.dialogPasswordVisible = false;
    }
  }
};
</script>
<style scoped lang="less">
.container1 {
  margin-top: 0px;
  width: 100%;
  height: 100%;
  background-color: rgb(247, 247, 248);
  //background-image: url('../../assets/img/infor_background.jpg');
  display: flex;
}
.img1 {
  width: 100%;
  height: 100%;
}
.img2 {
  width: 500px;
  height: 410px;
  margin-left: 0px;
  margin-top: 80px;
}
.cont {
  position: relative;
  margin-top: 40px;
  margin-left: 250px;
  width: 750px;
  height: 550px;
}
.text {
  position: absolute;
  top: 10px;
  left: 50px;
  font-size: 16px;
  color: rgb(71, 69, 66);
  .title {
    font-size: 30px;
    margin-left: 160px;
    color: rgb(43, 40, 39);
  }
  .name {
    margin-top: 40px;
  }
  .email {
    margin-top: 20px;
  }
  .btn {
    margin-top: 60px;
    margin-left: 30px;
  }
  span {
    color: rgb(128, 127, 126);
    font-style: oblique;
    font-size: 17px;
    letter-spacing: 2px;
  }
}
.el-input {
  width: 70%;
  margin-left: 10px;
}
</style>
