<template>
  <div class="container">
    <el-card>
      <el-button type="primary" @click="dialogVisible = true">添加成员</el-button>
      <el-table :data="tableData" style="width: 80%" border>
        <el-table-column prop="user_real_name" label="姓名" width="200"></el-table-column>
        <el-table-column prop="roleString" label="角色" width="280"></el-table-column>
        <el-table-column prop="address" label="操作">
          <template slot-scope="scope">
            <el-button size="mini" type="danger" @click="handleDelete(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 添加成员弹出对话框 -->
      <el-dialog title="添加成员" :visible.sync="dialogVisible" width="30%">
        <el-form ref="form" :model="addform" label-width="80px">
          <el-form-item label="名称">
            <el-input v-model="addform.realName"></el-input>
          </el-form-item>
          <el-form-item label="角色">
            <el-input v-model="addform.role"></el-input>
          </el-form-item>
          <el-form-item label="ID">
            <el-input v-model="addform.userId"></el-input>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="AddSubmit()">确 定</el-button>
        </span>
      </el-dialog>
    </el-card>
  </div>
</template>
<script>
export default {
  data() {
    return {
      tableData: [],
      dialogVisible: false,
      addform: {
        userId: "",
        role: "",
        realName: ""
      }
    };
  },
  created() {
    this.getMemberInfo();
  },
  methods: {
    async getMemberInfo() {
      const { data: res } = await this.$http.get("/v1/admin/user/all", {
        headers: {
          Authorization: "Bearer " + window.sessionStorage.getItem("token")
        }
      }); //token换成从缓存获取);
      if (res.success == true) {
        this.tableData = res.data.allUsers;
        for (let i = 0; i < this.tableData.length; i++) {
          if (this.tableData[i].user_role == 0) {
            this.tableData[i].roleString = "学生";
          } else if (this.tableData[i].user_role == 1) {
            this.tableData[i].roleString = "导师";
          } else {
            this.tableData[i].roleString = "管理员";
          }
        }
      } else {
        return;
      }
    },
    //删除用户
    async handleDelete(row) {
      const { data: res } = await this.$http.post(
        "/v1/admin/user/del",
        {
          userId: row.user_id,
          role: `${row.user_role}`
        },{
            headers: {
            Authorization: "Bearer " + window.sessionStorage.getItem("token")
          }
        }
      );
      if(res.success){
        this.$message.success(res.msg)
      }
      this.getMemberInfo();
    },
    //添加成员
    async AddSubmit() {
      const { data: res } = await this.$http.post(
        "/v1/admin/user/add",
        this.addform,
        {
          headers: {
            Authorization: "Bearer " + window.sessionStorage.getItem("token")
          }
        }
      );
      this.dialogVisible = false;
      this.getMemberInfo();
    }
  }
};
</script>
<style scoped lang="less">
.el-card {
  width: 80%;
}
.el-table {
  margin-top: 20px;
  margin-left: 20px;
  font-size: 18px;
}
.el-button {
  margin-left: 20px;
}
.container {
  background-color: aliceblue;
  margin-top: 0px;
  padding: 40px 0 0 40px;
}
</style>
