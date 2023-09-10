<template>
  <div class="compete">
    <el-card>
      <div class="com_header">
        <div class="title">最新赛事</div>
        <img
          src="../../assets/img/广播.png"
          alt
        />
        <div class="marquee_box">
          <ul
            class="marquee_list"
            :class="{marquee_top:animate}"
          >
            <li v-for="(item,index) in marqueeList">{{item.name}}</li>
          </ul>
        </div>
      </div>

      <el-table
        :data="tableData"
        stripe
        :highlight-current-row="true"
        row-key="m_id"
      >
        <el-table-column type="expand">
          <template slot-scope="scope">
            <!-- 展开队伍信息 -->
            <div class="expand">
              <div class="expand_title">组队信息</div>
              <el-table
                :data="scope.row.teamData.teams"
                border
                style="width: 90%"
              >
                <el-table-column
                  type="index"
                  label="编号"
                  width="80"
                  align="center"
                ></el-table-column>
                <el-table-column
                  prop="team_name"
                  label="队伍名称"
                  align="center"
                ></el-table-column>
                <el-table-column
                  prop="team_require"
                  label="队伍要求"
                  align="center"
                ></el-table-column>
                <el-table-column
                  prop="team_current_person_number"
                  label="队伍当前人数"
                  align="center"
                ></el-table-column>

                <el-table-column
                  prop
                  label="是否加入"
                  align="center"
                >
                  <template slot-scope="team">
                    <el-tooltip
                      class="item"
                      effect="dark"
                      content="请登录后进行组队哦"
                      placement="top-start"
                    >
                      <el-button
                        size="mini"
                        type="primary"
                        @click="applyJoin(team.row.team_id)"
                      >申请加入</el-button>
                    </el-tooltip>
                  </template>

                </el-table-column>

              </el-table>
            </div>
          </template>
        </el-table-column>

        <el-table-column
          label="赛事名称"
          prop="m_name"
          width="250"
        ></el-table-column>
        <el-table-column
          label="主办单位"
          prop="m_organizer"
        ></el-table-column>
        <el-table-column label="官方地址">
          <template slot-scope="scope">
            <el-button
              class="addr"
              size="mini"
              type="warning"
              plain
            >
              <a
                :href="scope.row.m_url"
                target="_Blank"
              >官方地址</a>
            </el-button>
          </template>
        </el-table-column>
        <el-table-column
          label="详细信息"
          prop="desc"
        >
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="success"
              plain
              @click="Detail(scope.row.m_id)"
            >详细信息</el-button>
          </template>
        </el-table-column>
        <el-table-column label="参加比赛">
          <template slot-scope="scope">
            <el-tooltip
              class="item"
              effect="dark"
              content="积极参与哦！"
              placement="right"
            >
              <el-button
                size="mini"
                type="primary"
                plain
                @click="joinToBat(scope.row.m_id)"
              >参加比赛</el-button>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>

      <!-- 点击详细信息后弹出对话框 -->
      <el-dialog
        title="详细信息"
        :visible.sync="dialogVisible"
        :data="DetailData"
        width="30%"
      >
        <el-form
          ref="form"
          label-width="135px"
        >
          <el-form-item
            label="赛事名称："
            align="right"
          >
            <div
              plain
              style="text-align: left"
            >{{DetailData.m_name}}</div>
          </el-form-item>
          <el-form-item label="赛事级别：">
            <div
              plain
              style="text-align: left"
            >{{DetailData.m_sort}}</div>
          </el-form-item>
          <el-form-item label="举办单位：">
            <div
              plain
              style="text-align: left"
            >{{DetailData.m_organizer}}</div>
          </el-form-item>
          <el-form-item label="赛事起止时间：">
            <div
              plain
              style="text-align: left"
            >{{DetailData.m_time}}</div>
          </el-form-item>
          <el-form-item label="赛事发布人：">
            <div
              plain
              style="text-align: left"
            >{{DetailData.m_contact_person}}</div>
          </el-form-item>
          <el-form-item label="赛事类别：">
            <div
              plain
              style="text-align: left"
            >{{DetailData.m_tag}}</div>
          </el-form-item>
          <el-form-item label="赛事简介：">
            <div
              plain
              style="text-align: left"
            >{{DetailData.m_introduction}}</div>
          </el-form-item>
          <el-form-item label="赛事网站：">
            <div
              plain
              style="text-align: left"
            >{{DetailData.m_url}}</div>
          </el-form-item>
          <el-form-item label="最大组队人数：">
            <div
              plain
              style="text-align: left"
            >{{DetailData.m_max_person}}</div>
          </el-form-item>
        </el-form>
        <el-divider>
          <i class="el-icon-info"></i>
        </el-divider>

        <span
          slot="footer"
          class="dialog-footer"
          align="center"
        >
          <el-button
            type="primary"
            @click="dialogVisible = false"
            icon="el-icon-s-opportunity"
            plain
          >我已了解</el-button>
        </span>
      </el-dialog>

      <!-- 申请入队-->
      <el-dialog
        title="申请入队"
        :visible.sync="centerDialogVisible"
        width="30%"
        center
      >
        <el-input
          type="textarea"
          :rows="6"
          placeholder="请输入你的入队自我介绍"
          v-model="userIntroduction"
        >
        </el-input>
        <span
          slot="footer"
          class="dialog-footer"
        >
          <el-button @click="centerDialogVisible = false">取 消</el-button>
          <el-button
            type="primary"
            @click="apply()"
          >发起申请</el-button>
        </span>
      </el-dialog>
    </el-card>

  </div>
</template>

<script>
export default {
  data() {
    return {
      dialogVisible: false,

      animate: false,

      marqueeList: [
        {
          name: "在各类竞赛中有多名同学组队成功"
        },

        {
          name: "赛出佳绩，赛出自我！"
        },

        {
          name: "我校在各类大赛中表现优异"
        },

        {
          name: "快来找到队伍加入他们吧~~~~"
        },
        {
          name: "团队协作就是力量"
        },

        {
          name: "快来找到队伍加入他们吧"
        }
      ],

      tableData: [],
      DetailData: {},
      TeamData: [],
      props: [],
      centerDialogVisible: false,
      userIntroduction: "",
      globalTeamId: ""
    };
  },

  created() {
    // 页面显示
    setInterval(this.showMarquee, 1500);

    this.getTableData();
  },
  methods: {
    async getTableData() {
      const { data: res } = await this.$http.get("/v1/match/info/basic");
      this.tableData = res.data.basicMatches;
    },
    async Detail(id) {
      this.dialogVisible = true;
      const { data: res } = await this.$http.post("/v1/match/info/detail", {
        mId: id
      });
      this.DetailData = res.data;
    },
    showMarquee: function() {
      this.animate = true;

      setTimeout(() => {
        this.marqueeList.push(this.marqueeList[0]);

        this.marqueeList.shift();

        this.animate = false;
      }, 600);
    },
    async getTeamData(row) {
      const { data: res } = await this.$http.post("/v1/team/match/all", {
        mId: row.m_id
      });

      this.TeamData = res.data;
    },

    // 点击申请加入队伍按钮
    async applyJoin(teamId) {
      this.globalTeamId = teamId;
      this.centerDialogVisible = true;
      const token = window.sessionStorage.getItem("token");
      if (!token) {
        this.$message.error("你还没有登录，请先登录！");
        this.centerDialogVisible = false;
      }
    },

    async apply() {
      this.centerDialogVisible = false;
      const { data: res } = await this.$http.post(
        "/v1/team/user/apply",
        {
          teamId: this.globalTeamId,
          introduction: this.userIntroduction
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
          message: "请求发送成功",
          type: "success"
        });
      } else {
        this.$message.error(res.msg);
      }
      this.centerDialogVisible = false;
    },

    // 参加比赛
    async joinToBat(mId) {
      const token = window.sessionStorage.getItem("token");
      if (!token) {
        this.$message.error("你还没有登录，请先登录！");
        return;
      }
      const { data: res } = await this.$http.post(
        "/v1/team/user/add",
        {
          mId: mId
        },
        {
          responseType: "json",
          headers: {
            Authorization: "Bearer " + window.sessionStorage.getItem("token")
          }
        }
      );
      if (res.success) {
        window.sessionStorage.setItem("skipmid", mId);
        this.$router.push("/studentCom");
        this.$message({
          message: "队伍创建成功！",
          type: "success"
        });
      } else {
        this.$message.error(res.msg);
      }
    }
  }
};
</script>

<style scoped lang="less">
.title {
  font-size: 24px;
  color: rgb(94, 94, 90);
  letter-spacing: 5px;
  font-weight: 540;
}
.el-table {
  width: 100%;
  margin: 50px auto;
  font-size: 18px;
}
.compete {
  padding: 20px;
}
.el-card {
  width: 75%;
  margin: 0px auto;
  padding-bottom: 30px;
}

a:-webkit-any-link {
  color: rgb(182, 17, 174);
  cursor: pointer;
  text-decoration: none;
  &:hover {
    color: #fff;
  }
}
ul li {
  list-style: none;
}
.com_header {
  display: flex;
  img {
    width: 30px;
    height: 30px;
    margin: 0 10px 0 30px;
  }
}

.marquee_box {
  display: block;

  position: relative;

  width: 35%;
  color: rgba(248, 137, 34, 0.705);

  height: 37px;
  border: #fff;
  border-radius: 15px;

  overflow: hidden;
  background-color: rgba(248, 242, 234, 0.966);
}

.marquee_list {
  display: block;

  position: absolute;

  top: -10px;

  left: 0;
}

.marquee_top {
  transition: all 1s;

  margin-top: -25px;
}

.marquee_list li {
  height: 30px;

  line-height: 30px;

  font-size: 14px;
  letter-spacing: 3px;
}

.marquee_list li span {
  padding: 0 2px;
}
.expand {
  width: 100%;
  text-align: center;
  background-image: url("../../assets/img/background.jpg");
  background-size: 100% 100%;
  padding-bottom: 10px;
  border: 1px solid #fff;
  border-radius: 10px;
  .el-table {
    opacity: 0.85;
  }
}

.expand_title {
  margin-top: 10px;
  font-size: 26px;
  color: #fff;
  letter-spacing: 4px;
}

.el-row {
  margin-bottom: 20px;
  &:last-child {
    margin-bottom: 0;
  }
}
</style>
