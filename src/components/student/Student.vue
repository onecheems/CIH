<template>
  <el-container>
    <el-aside width="200px">
      <el-menu
        :default-active="currentRoute"
        class="el-menu-vertical-demo"
        background-color="#545c64"
        text-color="#fff"
        active-text-color="#ffd04b"
        router
      >
        <el-menu-item-group>
          <el-menu-item index="/studentInformation">
            <i class="el-icon-user-solid"></i>
            <span>个人信息</span>
          </el-menu-item>
          <el-menu-item index="/studentTeam">
            <i class="el-icon-medal-1"></i>
            <span>我的队伍</span>
          </el-menu-item>
          <el-menu-item index="/studentCom">
            <i class="el-icon-trophy"></i>
            <span>我的赛事</span>
          </el-menu-item>
          <el-menu-item index="/studentMsg">
            <i class="el-icon-s-comment"></i>
            <span>我的消息</span>
          </el-menu-item>
        </el-menu-item-group>
      </el-menu>
    </el-aside>
    <el-main>
      <router-view></router-view>
    </el-main>
  </el-container>
</template>
<script>
export default {
  data() {
    return {
      inforData: [],
      currentRoute: ""
    };
  },
  created() {
    console.log(this.$route.path);
    this.currentRoute = this.$route.path;
  },
  methods: {}
};
</script>
<style scoped lang="less">
.el-container {
  height: 100%;
}
.el-aside {
  background-color: #333744;
}
.el-main {
  padding: 0px;
  height: 100%;
}
span {
  letter-spacing: 2px;
}
</style>
