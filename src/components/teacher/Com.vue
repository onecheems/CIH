<template>
  <div class="container">
    <el-col :span="21">
      <el-button type="primary" @click="AddCom()">创建赛事</el-button>
      <el-table :data="allTeacherMatches" stripe style="width: 100%" height="400">
        <el-table-column type="index"></el-table-column>
        <el-table-column prop="m_name" label="名称" width="120px"></el-table-column>
        <el-table-column prop="m_sort" label="级别" width="60px"></el-table-column>
        <el-table-column prop="m_organizer" label="主办方" width="80px"></el-table-column>
        <el-table-column prop="m_start_time" label="开始日期"></el-table-column>
        <el-table-column prop="m_end_time" label="结束日期"></el-table-column>
        <el-table-column prop="m_contact_person" label="官网" width="120px">
          <template slot-scope="scope">
            <el-button class="addr" size="mini" type="warning" plain>
              <a :href="scope.row.m_url" target="_Blank">官方地址</a>
            </el-button>
          </template>
        </el-table-column>
        <el-table-column prop="m_tag" label="类别" width="80px"></el-table-column>
        <el-table-column prop="m_max_person" label="最大参赛人数" width="70px"></el-table-column>
        <el-table-column prop="m_introduction" label="赛事介绍"></el-table-column>
        <el-table-column prop="m_introduction" label="操作" width="110px">
          <template slot-scope="scope">
            <el-button class="addr" size="mini" type="success" @click="EditTeacherCom(scope.row)">修改</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 创建赛事对话框 -->
      <el-dialog title="创建比赛" :visible.sync="dialogFormVisible">
        <el-form :model="AddComform">
          <el-form-item label="名称" label-width="80px">
            <el-input v-model="AddComform.m_name" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="级别" label-width="80px">
            <el-input v-model="AddComform.m_sort" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="主办方" label-width="80px">
            <el-input v-model="AddComform.m_organizer" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="基本介绍" label-width="80px">
            <el-input v-model="AddComform.m_introduction" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="官方网址" label-width="80px">
            <el-input v-model="AddComform.m_url" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="类别" label-width="80px">
            <el-input v-model="AddComform.m_tag" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="最大参赛人数" label-width="120px">
            <el-input v-model="AddComform.m_max_person" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="开始时间" label-width="80px">
            <el-input v-model="AddComform.m_start_time" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="结束时间" label-width="80px">
            <el-input v-model="AddComform.m_end_time" autocomplete="off"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="AddSubmit()">确 定</el-button>
        </div>
      </el-dialog>

      <!-- 修改赛事对话框 -->
      <el-dialog title="修改比赛" :visible.sync="dialogEditVisible">
        <el-form :model="EditComform">
          <el-form-item label="名称" label-width="80px">
            <el-input v-model="EditComform.m_name" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="级别" label-width="80px">
            <el-input v-model="EditComform.m_sort" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="主办方" label-width="80px">
            <el-input v-model="EditComform.m_organizer" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="基本介绍" label-width="80px">
            <el-input v-model="EditComform.m_introduction" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="官方网址" label-width="80px">
            <el-input v-model="EditComform.m_url" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="类别" label-width="80px">
            <el-input v-model="EditComform.m_tag" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="最大参赛人数" label-width="120px">
            <el-input v-model="EditComform.m_max_person" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="开始时间" label-width="80px">
            <el-input v-model="EditComform.m_start_time" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="结束时间" label-width="80px">
            <el-input v-model="EditComform.m_end_time" autocomplete="off"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogEditVisible = false">取 消</el-button>
          <el-button type="primary" @click="EditSubmit()">确 定</el-button>
        </div>
      </el-dialog>
    </el-col>
  </div>
</template>
<script>
export default {
  data() {
    return {
      allTeacherMatches: [],
      dialogFormVisible: false,
      dialogEditVisible: false,
      AddComform: {},
      EditComform: {}
    };
  },
  created() {
    this.getallTeacherMatches();
  },
  methods: {
    //获取赛事列表信息
    async getallTeacherMatches() {
      const { data: res } = await this.$http.get("/v1/match/info/teacher/all", {
        headers: {
          Authorization: "Bearer " + window.sessionStorage.getItem("token")
        }
      });
      if (res.success) {
        this.allTeacherMatches = res.data.allTeacherMatches;
      }
    },
    //提交创建赛事
    AddCom() {
      this.dialogFormVisible = true;
    },
    async AddSubmit() {
      const { data: res } = await this.$http.post(
        "/v1/match/create",
        this.AddComform,
        {
          headers: {
            Authorization: "Bearer " + window.sessionStorage.getItem("token")
          }
        }
      );
      if (res.success) {
        this.$message.success("创建成功");
        this.getallTeacherMatches();
      } else {
        return this.$message.danger("创建失败");
      }
      this.dialogFormVisible = false;
    },
    //修改赛事
    EditTeacherCom(row) {
      this.dialogEditVisible = true;
      this.EditComform = row;
    },
  async  EditSubmit() {
      const { data: res } =await this.$http.post(
        "/v1/match/update",
        this.EditComform,
        {
          headers: {
            Authorization: "Bearer " + window.sessionStorage.getItem("token")
          }
        }
      );
      if(res.success){
        this.$message.success('修改成功');
      this.getallTeacherMatches();

      }
      else{
        return this.$message.danger(修改失败)
      };
       this.dialogEditVisible = false;


    }
  }
};
</script>
<style scoped lang="less">
.container {
  margin: 0 10px 10px 0;
  width: 100%;
  height: 100%;

  padding: 25px 0 0 25px;
  background-color: rgb(255, 249, 241);
}

.el-table {
  margin-top: 10px;
  height: 100%;
}

a:-webkit-any-link {
  color: rgb(182, 17, 174);
  cursor: pointer;
  text-decoration: none;
  &:hover {
    color: #fff;
  }
}
</style>
