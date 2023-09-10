<template>
  <div class="container1">
    <el-col
      :span="20"
      :offset="2"
    >
      <el-col :span="12">
        <h1 style="font-size: 20px; color">
          <i class="el-icon-trophy"></i>&emsp;我的赛事
        </h1>
      </el-col>
      <el-col
        :span="12"
        align="right"
      >
        <h1>
          <el-select
            v-model="matchName"
            placeholder="请选择赛事"
            @change="selectOneMatch"
          >
            <el-option
              v-for="item in allUserJoinMatches"
              :key="item.team_id"
              :label="item.m_name"
              :value="item.team_id"
            ></el-option>
          </el-select>
        </h1>
      </el-col>
      <br />
      <br />
      <br />
      <el-divider content-position="center">
        <i class="el-icon-info"></i>
      </el-divider>
      <br />
      <el-tabs
        v-model="activeName"
        @tab-click="handleClick"
        stretch
      >
        <el-tab-pane
          label="队伍信息管理"
          name="first"
        >
          <el-form
            width="100%"
            ref="form"
            :model="form"
            label-width="80px"
          >
            <br />
            <el-form-item label="队伍名称">
              <el-input v-model="form.team_name"></el-input>
            </el-form-item>
            <el-form-item label="队伍要求">
              <el-input
                v-model="form.team_require"
                placeholder="填写加入此队伍的技能要求，用于在赛事广场招募队员！"
              ></el-input>
            </el-form-item>
            <el-form-item>
              <el-button
                type="primary"
                @click="saveTeamInfo()"
              >保存修改</el-button>
            </el-form-item>
          </el-form>
        </el-tab-pane>
        <el-tab-pane
          label="队伍成员管理"
          name="second"
        >
          <el-col
            :span="24"
            align="center"
          >
            <el-button
              type="primary"
              @click="centerDialogVisible = true"
              plain
            >邀请新成员</el-button>
          </el-col>
          <el-table
            :data="teamerInfo"
            style="width: 100%"
          >
            <el-table-column label="队员名称">
              <template slot-scope="scope">
                <span style="margin-left: 10px">{{ scope.row.s_name }}</span>
              </template>
            </el-table-column>
            <el-table-column label="队员联系方式">
              <template slot-scope="scope">
                <span style="margin-left: 10px">{{ scope.row.s_email }}</span>
              </template>
            </el-table-column>
            <el-table-column
              label="操作"
              align="right"
            >
              <template slot-scope="scope">
                <el-button
                  size="mini"
                  type="danger"
                  @click="removeTeamer(scope.row)"
                >移除此成员</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>
        <el-tab-pane
          label="指导老师管理"
          name="third"
        >
          <el-col
            :span="24"
            align="center"
          >
            <el-button
              type="primary"
              @click="findTeacher()"
              plain
            >寻找导师</el-button>
          </el-col>
          <el-table
            :data="teacherInfo"
            style="width: 100%"
          >
            <el-table-column label="导师名称">
              <template slot-scope="scope">
                <span style="margin-left: 10px">{{ scope.row.t_name }}</span>
              </template>
            </el-table-column>
            <el-table-column label="导师联系方式">
              <template slot-scope="scope">
                <span style="margin-left: 10px">{{ scope.row.t_email }}</span>
              </template>
            </el-table-column>
            <el-table-column
              label="操作"
              align="right"
            >
              <template slot-scope="scope">
                <el-button
                  size="mini"
                  type="danger"
                  @click="removeTeacher(scope.row)"
                >移除导师</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>
      </el-tabs>

      <!-- 导师信息陈列抽屉 -->
      <el-drawer
        :visible.sync="findTeacherDrawer"
        direction="rtl"
        size="50%"
      >
        <el-col
          :span="22"
          :offset="1"
        >
          <el-table
            :data="allTeacherInfo"
            style="width: 100%"
          >
            <el-table-column type="expand">
              <template slot-scope="props">
                <el-form
                  label-position="left"
                  inline
                  class="demo-table-expand"
                >
                  <el-form-item label="导师姓名:">
                    <span>{{ props.row.t_name }}</span>
                  </el-form-item>
                  <el-form-item label="专业:">
                    <span>{{ props.row.t_profession }}</span>
                  </el-form-item>
                  <el-form-item label="手机号:">
                    <span>{{ props.row.t_phonenumber }}</span>
                  </el-form-item>
                  <el-form-item label="研究方向:">
                    <span>{{ props.row.t_profession_direction }}</span>
                  </el-form-item>
                  <el-form-item label="邮箱:">
                    <span>{{ props.row.t_email }}</span>
                  </el-form-item>
                  <el-form-item label="简介:">
                    <span>{{ props.row.t_introduction }}</span>
                  </el-form-item>
                </el-form>
              </template>
            </el-table-column>
            <el-table-column
              label="导师姓名"
              prop="t_name"
            ></el-table-column>
            <el-table-column
              label="导师专业"
              prop="t_profession"
            ></el-table-column>
            <el-table-column
              label="导师联系方式"
              prop="t_phonenumber"
            ></el-table-column>
            <el-table-column
              label="操作"
              align="right"
            >
              <template slot-scope="scope">
                <el-button
                  size="mini"
                  type="success"
                  plain
                  @click="inviteTeacher(scope.row)"
                >申请指导</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-col>
      </el-drawer>
      <!-- 邀请新成员对话框 -->
      <el-dialog
        title="添加新成员"
        :visible.sync="centerDialogVisible"
        width="30%"
        center
      >
        <el-input
          v-model="studentId"
          placeholder="请输入学生学号进行添加"
        ></el-input>
        <span
          slot="footer"
          class="dialog-footer"
        >
          <el-button @click="centerDialogVisible = false">取 消</el-button>
          <el-button
            type="primary"
            @click="inviteStudent()"
          >确 定</el-button>
        </span>
      </el-dialog>
    </el-col>
  </div>
</template>
<script>
export default {
  data() {
    return {
      form: {},
      matchName: "",
      globalTeamId: "",
      allUserJoinMatches: [],
      activeName: "first",
      pageInfoMap: Map,
      teamerInfo: [],
      teacherInfo: [],
      centerDialogVisible: false,
      studentId: "",
      findTeacherDrawer: false,
      allTeacherInfo: []
    };
  },
  methods: {
    handleClick(tab, event) {
      if (tab.name === "first") {
        this.getAllUserJoinMatches();
      } else if (tab.name === "second") {
        this.getTeamerInfo();
      } else {
        this.getTeacherInfo();
      }
    },

    selectOneMatch(teamId) {
      this.activeName = "first";
      this.globalTeamId = teamId;
      this.getTeamInfo(teamId);
    },
    // 获取队伍要求和队伍名称
    async getTeamInfo(teamId) {
      const { data: res } = await this.$http.post(
        "/v1/team/user/attribute",
        { teamId },
        {
          responseType: "json",
          headers: {
            Authorization: "Bearer " + window.sessionStorage.getItem("token")
          }
        }
      );
      this.form = res.data;
    },
    // 保存修改的队伍信息
    async saveTeamInfo() {
      this.form.teamId = this.globalTeamId;
      const { data: res } = await this.$http.post(
        "/v1/team/user/update",
        {
          teamId: this.globalTeamId,
          teamName: this.form.team_name,
          teamRequire: this.form.team_require
        },
        {
          responseType: "json",
          headers: {
            Authorization: "Bearer " + window.sessionStorage.getItem("token")
          }
        }
      );
      if (res.success) {
        this.$message({
          message: "队伍信息更新成功！",
          type: "success"
        });
        this.getTeamInfo(this.globalTeamId);
      } else {
        this.$message.error("更新失败，请重试！");
      }
    },
    // 初始化获取赛事管理页面所有管理的赛事
    async getAllUserJoinMatches() {
      const { data: res } = await this.$http.get(
        "/v1/match/user/join",
        {
          responseType: "json",
          headers: {
            Authorization: "Bearer " + window.sessionStorage.getItem("token")
          }
        } // token换成从缓存获取
      );

      // 将初始化返回的数组转换为map，key为team_id
      this.pageInfoMap = new Map();
      this.allUserJoinMatches = res.data.allUserJoinMatches;
      for (let i = 0; i < this.allUserJoinMatches.length; i++) {
        this.pageInfoMap.set(
          this.allUserJoinMatches[i].m_id,
          this.allUserJoinMatches[i]
        );
      }
      const skipMid = window.sessionStorage.getItem("skipmid");
      if (skipMid) {
        let hasInitTeam = this.pageInfoMap.get(skipMid);
        this.matchName = hasInitTeam.m_name;
        this.globalTeamId = hasInitTeam.team_id;
      } else {
        this.matchName = this.allUserJoinMatches[0].m_name;
        this.globalTeamId = this.allUserJoinMatches[0].team_id;
      }
      this.getTeamInfo(this.globalTeamId);
    },

    async getTeamerInfo() {
      const { data: res } = await this.$http.post(
        "/v1/team/member/get",
        { teamId: this.globalTeamId },
        {
          responseType: "json",
          headers: {
            Authorization: "Bearer " + window.sessionStorage.getItem("token")
          }
        } // token换成从缓存获取
      );
      this.teamerInfo = res.data.members.members;
    },

    // 获取导师
    async getTeacherInfo() {
      const { data: res } = await this.$http.post(
        "/v1/team/teacher/get",
        { teamId: this.globalTeamId },
        {
          responseType: "json",
          headers: {
            Authorization: "Bearer " + window.sessionStorage.getItem("token")
          }
        } // token换成从缓存获取
      );
      this.teacherInfo = res.data.teachers;
    },

    async removeTeamer(row) {
      const { data: res } = await this.$http.post(
        "/v1/team/member/del",
        { teamId: this.globalTeamId, personId: row.s_id },
        {
          responseType: "json",
          headers: {
            Authorization: "Bearer " + window.sessionStorage.getItem("token")
          }
        }
      );
      if (res.success) {
        this.$message({
          message: "删除成功！",
          type: "success"
        });
        this.getTeamerInfo();
        this.getTeacherInfo();
      } else {
        this.$message.error("删除失败");
      }
    },
    async removeTeacher(row) {
      const { data: res } = await this.$http.post(
        "/v1/team/member/del",
        { teamId: this.globalTeamId, personId: row.t_id },
        {
          responseType: "json",
          headers: {
            Authorization: "Bearer " + window.sessionStorage.getItem("token")
          }
        }
      );
      if (res.success) {
        this.$message({
          message: "删除成功！",
          type: "success"
        });
        this.getTeamerInfo();
        this.getTeacherInfo();
      } else {
        this.$message.error("删除失败");
      }
    },

    // 邀请学生
    async inviteStudent() {
      if (!this.globalTeamId) {
        this.$message.error("你当前没有队伍，请先参加比赛！");
        return;
      }
      const { data: res } = await this.$http.post(
        "/v1/team/user/invite",
        { teamId: this.globalTeamId, personId: this.studentId },
        {
          responseType: "json",
          headers: {
            Authorization: "Bearer " + window.sessionStorage.getItem("token")
          }
        }
      );
      if (res.success) {
        this.$message({
          message: "邀请成功！",
          type: "success"
        });
      } else {
        this.$message.error(res.msg);
      }
      this.centerDialogVisible = false;
    },

    // 邀请老师
    async inviteTeacher(row) {
      if (!this.globalTeamId) {
        this.$message.error("你当前没有队伍，请先参加比赛！");
        return;
      }
      const { data: res } = await this.$http.post(
        "/v1/team/user/invite",
        { teamId: this.globalTeamId, personId: row.t_id },
        {
          responseType: "json",
          headers: {
            Authorization: "Bearer " + window.sessionStorage.getItem("token")
          }
        }
      );
      if (res.success) {
        this.$message({
          message: "邀请成功！",
          type: "success"
        });
      } else {
        this.$message.error(res.msg);
      }
    },

    // 导师抽屉信息
    async findTeacher() {
      const { data: res } = await this.$http.get("/v1/user/teacher/all", {
        responseType: "json",
        headers: {
          Authorization: "Bearer " + window.sessionStorage.getItem("token")
        }
      });
      this.allTeacherInfo = res.data.teacherInfos;
      this.findTeacherDrawer = true;
    }
  },

  created() {
    this.getAllUserJoinMatches();
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
.demo-table-expand {
  font-size: 0;
}
</style>
