<template>
  <div class="container1">
    <el-col :span="20" :offset="2">
      <h1 style="font-size: 20px; color">
        <i class="el-icon-trophy"></i>&emsp;我的消息
      </h1>
      <el-divider content-position="right">
        <i class="el-icon-info"></i>
      </el-divider>
      <br />
      <!-- Tab -->
      <el-tabs v-model="activeName" @tab-click="handleClick" stretch>
        <el-tab-pane label="我发送的邀请消息" name="first">
          <el-table :data="sendInviteMsg" style="width: 100%">
            <el-table-column label="邀请人姓名" width="180">
              <template slot-scope="scope">
                <span style="margin-left: 10px">{{ scope.row.s_name }}</span>
              </template>
            </el-table-column>
            <el-table-column label="邀请人联系方式" width="180">
              <template slot-scope="scope">
                <span style="margin-left: 10px">{{ scope.row.s_email }}</span>
              </template>
            </el-table-column>
            <el-table-column label="所属赛事" width="180">
              <template slot-scope="scope">
                <span style="margin-left: 10px">{{ scope.row.m_name }}</span>
              </template>
            </el-table-column>
            <el-table-column prop="tag" label="对方是否同意" width="180" filter-placement="bottom-end">
              <template slot-scope="scope">
                <el-tag
                  :type="scope.row.invite_station === '0' ? 'primary' : 'success'"
                  disable-transitions
                >
                  <span v-if="scope.row.invite_station === '0'">未同意</span>
                  <span v-if="scope.row.invite_station === '1'">已同意</span>
                </el-tag>
              </template>
            </el-table-column>
            <el-table-column label="操作" align="right">
              <template slot-scope="scope">
                <el-button size="mini" type="danger" @click="sendInviteMsgDelete(scope.row)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>
        <el-tab-pane label="我发送的申请消息" name="second">
          <el-table :data="sendApplyMsg" style="width: 100%">
            <el-table-column label="邀请人姓名" width="180">
              <template slot-scope="scope">
                <span style="margin-left: 10px">{{ scope.row.s_name }}</span>
              </template>
            </el-table-column>
            <el-table-column label="邀请人联系方式" width="180">
              <template slot-scope="scope">
                <span style="margin-left: 10px">{{ scope.row.s_email }}</span>
              </template>
            </el-table-column>
            <el-table-column label="所属赛事" width="180">
              <template slot-scope="scope">
                <span style="margin-left: 10px">{{ scope.row.m_name }}</span>
              </template>
            </el-table-column>
            <el-table-column prop="tag" label="对方是否同意" width="180" filter-placement="bottom-end">
              <template slot-scope="scope">
                <el-tag
                  :type="scope.row.apply_station === '0' ? 'primary' : 'success'"
                  disable-transitions
                >
                  <span v-if="scope.row.apply_station === '0'">未同意</span>
                  <span v-if="scope.row.apply_station === '1'">已同意</span>
                </el-tag>
              </template>
            </el-table-column>
            <el-table-column label="操作" align="right">
              <template slot-scope="scope">
                <el-button size="mini" type="danger" @click="sendApplyMsgDelete(scope.row)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>
        <el-tab-pane label="我接收的邀请消息" name="third">
          <el-table :data="rciInviteMsg" style="width: 100%">
            <el-table-column label="邀请人姓名" width="180">
              <template slot-scope="scope">
                <span style="margin-left: 10px">{{ scope.row.s_name }}</span>
              </template>
            </el-table-column>
            <el-table-column label="邀请人联系方式" width="180">
              <template slot-scope="scope">
                <span style="margin-left: 10px">{{ scope.row.s_email }}</span>
              </template>
            </el-table-column>
            <el-table-column label="所属赛事" width="180">
              <template slot-scope="scope">
                <span style="margin-left: 10px">{{ scope.row.m_name }}</span>
              </template>
            </el-table-column>
            <el-table-column prop="tag" label="你是否已回复" width="180" filter-placement="bottom-end">
              <template slot-scope="scope">
                <el-tag
                  :type="scope.row.invite_message_read === '0' ? 'primary' : 'success'"
                  disable-transitions
                >
                  <span v-if="scope.row.invite_message_read === '1'">已回复</span>
                  <span v-if="scope.row.invite_message_read === '0'">未回复</span>
                </el-tag>
              </template>
            </el-table-column>
            <el-table-column label="操作" align="right">
              <template slot-scope="scope">
                <el-button size="mini" @click="inviteMsgAgree(scope.row)">同意组队请求</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>
        <el-tab-pane label="我接受申请的消息" name="fourth">
          <el-table :data="rciApplyMsg" style="width: 100%">
            <el-table-column label="队长姓名">
              <template slot-scope="scope">
                <span style="margin-left: 10px">{{ scope.row.s_name }}</span>
              </template>
            </el-table-column>
            <el-table-column label="队长联系方式">
              <template slot-scope="scope">
                <span style="margin-left: 10px">{{ scope.row.s_email }}</span>
              </template>
            </el-table-column>
            <el-table-column label="所属赛事">
              <template slot-scope="scope">
                <span style="margin-left: 10px">{{ scope.row.m_name }}</span>
              </template>
            </el-table-column>
            <el-table-column label="申请人入队自述">
              <template slot-scope="scope">
                <el-popover trigger="hover" placement="top">
                  <p>&emsp;&emsp;{{ scope.row.apply_introduction }}</p>
                  <div slot="reference" class="name-wrapper">
                    <el-tag size="medium">自我介绍</el-tag>
                  </div>
                </el-popover>
              </template>
            </el-table-column>
            <el-table-column prop="tag" label="你是否已回复" filter-placement="bottom-end">
              <template slot-scope="scope">
                <el-tag
                  :type="scope.row.apply_message_read === '0' ? 'primary' : 'success'"
                  disable-transitions
                >
                  <span v-if="scope.row.apply_message_read === '1'">已回复</span>
                  <span v-if="scope.row.apply_message_read === '0'">未回复</span>
                </el-tag>
              </template>
            </el-table-column>
            <el-table-column label="操作" align="right">
              <template slot-scope="scope">
                <el-button size="mini" @click="applyMsgAgree(scope.row)">同意组队请求</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>
      </el-tabs>
    </el-col>
  </div>
</template>
<script>
export default {
  data() {
    return {
      activeName: "first",
      // 发送的邀请消息
      sendInviteMsg: [],
      // 发送的申请消息
      sendApplyMsg: [],
      // 接受的邀请消息
      rciInviteMsg: [],
      // 接受的申请消息
      rciApplyMsg: [],
      tableData: [
        {
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          date: "2016-05-04",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1517 弄"
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1519 弄"
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1516 弄"
        }
      ]
    };
  },
  async created() {
    this.getSendMsg();
  },
  methods: {
    // 将一条消息置于已读状态
    async setMsgState(msgId) {
      const { data: res } = await this.$http.post(
        "/v1/user/message/read",
        { msgId },
        {
          responseType: "json",
          headers: {
            Authorization: "Bearer " + window.sessionStorage.getItem("token")
          }
        } //token换成从缓存获取
      );
      return res;
    },
    // 获取表格数据
    async getSendMsg() {
      const { data: res } = await this.$http.get(
        "/v1/user/message/send",
        {
          responseType: "json",
          headers: {
            Authorization: "Bearer " + window.sessionStorage.getItem("token")
          }
        } //token换成从缓存获取
      );
      this.sendInviteMsg = res.data.inviteMsgs;
      this.sendApplyMsg = res.data.applyMsgs;
    },

    async getRciMsg() {
      const { data: res } = await this.$http.get(
        "/v1/user/message/get",
        {
          responseType: "json",
          headers: {
            Authorization: "Bearer " + window.sessionStorage.getItem("token")
          }
        } //token换成从缓存获取
      );
      this.rciInviteMsg = res.data.inviteMsg1;
      this.rciApplyMsg = res.data.applyMsgs;
    },

    // tab 表情切换
    async handleClick(tab, event) {
      if (tab.name === "third" || tab.name === "fourth") {
        this.getRciMsg();
      } else {
        this.getSendMsg();
      }
    },

    // 删除邀请消息
    async sendInviteMsgDelete(row) {
      const { data: res } = await this.$http.post(
        "/v1/user/message/del",
        { msgId: row.invite_id },
        {
          responseType: "json",
          headers: {
            Authorization: "Bearer " + window.sessionStorage.getItem("token")
          }
        } //token换成从缓存获取
      );
      if (res.success) {
        this.$message({
          message: "删除成功",
          type: "success"
        });
        this.getSendMsg();
      } else {
        this.$message.error("删除失败，请重试！");
      }
    },

    // 删除申请消息
    async sendApplyMsgDelete(row) {
      const { data: res } = await this.$http.post(
        "/v1/user/message/del",
        { msgId: row.apply_id },
        {
          responseType: "json",
          headers: {
            Authorization: "Bearer " + window.sessionStorage.getItem("token")
          }
        } //token换成从缓存获取
      );
      if (res.success) {
        this.$message({
          message: "删除成功",
          type: "success"
        });
        this.getSendMsg();
      } else {
        this.$message.error("删除失败，请重试！");
      }
    },

    // 同意邀请
    async inviteMsgAgree(row) {
      if (row.invite_message_read === "1") {
        this.$message.error("你已成功完成组队，请勿重复操作！");
        return;
      }
      const { data: res } = await this.$http.post(
        "/v1/user/message/agree",
        { msgId: row.invite_id, teamId: row.team_id },
        {
          responseType: "json",
          headers: {
            Authorization: "Bearer " + window.sessionStorage.getItem("token")
          }
        } //token换成从缓存获取
      );
      const msgRes = await this.setMsgState(row.invite_id);
      if (res.success && msgRes.success) {
        this.$message({
          message: "回复成功，你已加入新队伍！",
          type: "success"
        });
        this.getSendMsg();
        this.getRciMsg();
      } else {
        this.$message.error("回复失败，请重试！");
      }
    },

    // 同意申请
    async applyMsgAgree(row) {
      if (row.apply_message_read === "1") {
        this.$message.error("你已成功完成组队，请勿重复操作！");
        return;
      }
      const { data: res } = await this.$http.post(
        "/v1/user/message/agreeApply",
        { msgId: row.apply_id, teamId: row.team_id, userId: row.apply_person_id},
        {
          responseType: "json",
          headers: {
            Authorization: "Bearer " + window.sessionStorage.getItem("token")
          }
        } //token换成从缓存获取
      );
      const msgRes = await this.setMsgState(row.apply_id);
      if (res.success && msgRes.success) {
        this.$message({
          message: "回复成功，新成员已加入你的队伍！",
          type: "success"
        });
        this.getSendMsg();
        this.getRciMsg();
      } else {
        this.$message.error("回复失败，请重试！");
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
