<template>
  <div class="container1">
    <el-col :span="20" :offset="2">
      <h1 style="font-size: 20px; color">
        <i class="el-icon-medal-1"></i>&emsp;我指导的队伍
      </h1>
      <el-divider content-position="right">
        <i class="el-icon-info"></i>
      </el-divider>
      <br />

      <!--table-->
      <el-table :data="tableData" style="width: 100%">
        <el-table-column type="expand">
          <template slot-scope="props">
            <el-form label-position="left" inline class="demo-table-expand">
              <el-form-item label="队伍名称">
                <span>{{ props.row.team_name }}</span>
              </el-form-item>
              <el-form-item label="所参赛事">
                <span>{{ props.row.m_name }}</span>
              </el-form-item>
              <el-form-item label="队长名称">
                <span>{{ props.row.leaderName }}</span>
              </el-form-item>
              <el-form-item label="队长联系方式">
                <span>{{ props.row.leaderPhone }}</span>
              </el-form-item>
              <el-form-item label="导师">
                <span>{{ props.row.teacher }}</span>
              </el-form-item>
              <el-form-item label="成员">
                <span>{{ props.row.member }}</span>
              </el-form-item>
            </el-form>
          </template>
        </el-table-column>
        <el-table-column label="队伍名称" prop="team_name"></el-table-column>
        <el-table-column label="所参赛事" prop="m_name"></el-table-column>
        <el-table-column label="队长名" prop="leaderName"></el-table-column>
      </el-table>
    </el-col>
  </div>
</template>
<script>
export default {
  data() {
    return {
      tableData: []
    };
  },
  created() {
    this.getTableData();
  },
  methods: {
    async getTableData() {
      const { data: res } = await this.$http.get(
        "/v1/team/user/all",
        {
          responseType: "json",
          headers: {
            Authorization: "Bearer " + window.sessionStorage.getItem("token")
          }
        } //token换成从缓存获取
      );
      if (res.success == true) {
        this.tableData = res.data;
      } else {
        return;
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
.demo-table-expand {
  font-size: 0;
}
.demo-table-expand label {
  width: 90px;
  color: #99a9bf;
}
.demo-table-expand .el-form-item {
  margin-right: 0;
  margin-bottom: 0;
  width: 50%;
}
</style>
