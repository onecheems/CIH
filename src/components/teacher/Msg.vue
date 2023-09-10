<template>
  <div class="container1">
    <el-col
      :span="20"
      :offset="2"
    >
      <h1 style="font-size: 20px; color">
        <i class="el-icon-trophy"></i>&emsp;我的消息
      </h1>
      <el-divider content-position="right">
        <i class="el-icon-info"></i>
      </el-divider>
      <br />
      <el-table
        :data="rciInviteMsg"
        style="width: 100%"
      >
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
        <el-table-column
          prop="tag"
          label="你是否已回复"
          filter-placement="bottom-end"
        >
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
        <el-table-column
          label="操作"
          align="right"
        >
          <template slot-scope="scope">
            <el-button
              size="mini"
              @click="inviteMsgAgree(scope.row)"
            >同意指导此队伍</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-col>
  </div>
</template>
<script>
export default {
  data() {
    return {
      rciInviteMsg: []
    };
  },
  created() {
    this.getRciMsg();
  },
  methods: {
    // 设置消息状态
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
      if (res.data) {
        this.rciInviteMsg = res.data.inviteMsgs0;
      }
    },
    // 同意邀请
    async inviteMsgAgree(row) {
      if (row.invite_message_read === "1") {
        this.$message.error("你已成为指导老师，请勿重复操作！");
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
          message: "回复成功，你已同意指导队伍！",
          type: "success"
        });
        this.getRciMsg();
      } else {
        this.$message.error("回复失败，请重试！");
      }
    }
  }
};
</script>
<style scoped>
.container1 {
  padding-top: 40px;
  width: 100%;
  height: 100%;
  display: flex;
}
</style>
