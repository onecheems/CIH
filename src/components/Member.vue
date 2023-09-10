<template>
  <el-container>
    <el-header>
      <div class="header_logo" @click="OnLogo">
        <img src="../assets/img/logo1.png" />
        <span>竞赛信息助手</span>

        <el-menu
          :default-active="activeIndex"
          mode="horizontal"
          active-text-color="#ffd04b"
          @select="handleSelect"
          router
        >
          <el-menu-item :index="myself" @click="saveNavState(myself)">我的主页</el-menu-item>
          <el-menu-item index="/member/welcome" @click="saveNavState('/member/welcome')">首页</el-menu-item>
          <el-menu-item index="/member/compete" @click="saveNavState('/member/compete')">竞技广场</el-menu-item>
          <el-menu-item index="/member/aboutus" @click="saveNavState('/member/aboutus')">关于我们</el-menu-item>
          <el-menu-item index="/welcome" @click="Logout">退出登录</el-menu-item>
        </el-menu>
      </div>
    </el-header>

    <el-main>
      <router-view></router-view>
    </el-main>
    
  </el-container>
</template>
<script>
export default {
  data() {
    return {
      activeIndex: "",
      myself: "",
      role: ""
    };
  },
  created() {
    this.getUserInfo();
    this.ToMyself();
    this.activeIndex = window.sessionStorage.getItem("activeIndex");
    if (this.activeIndex === "") {
      this.activeIndex = this.myself;
    }
    this.getUserInfo();
  },
  methods: {
    //退出登录
    async Logout() {
      const { data: res } = await this.$http.get(
        "/v1/user/logout",
        {
          headers: {
            Authorization: "Bearer " + window.sessionStorage.getItem("token")
          }
        } //token换成从缓存获取
      );
      if (res.success == true) {
        window.sessionStorage.removeItem("token");
        this.$message.success(res.msg);
      } else {
        return this.$message.error("退出失败");
      }
    },
    //点击logo跳转到首页
    OnLogo() {},
    handleSelect(key, keyPath) {
    },
    // 保存链接的激活状态
    saveNavState(activeIndex) {
      window.sessionStorage.setItem("activeIndex", activeIndex);
      //键值对
      this.activeIndex = activeIndex;
    },
    //获取用户信息
    async getUserInfo() {
      const { data: res } = await this.$http.get("/v1/user/role", {
        headers: {
          Authorization: "Bearer " + window.sessionStorage.getItem("token")
        }
      });
      if (res.success) {
        this.role = res.data.role;
      } else {
        return;
      }
    },
    //进入我的主页
    ToMyself() {
      if (this.role == 0) {
        this.myself = "/student";
      } else if (this.role == 1) {
        this.myself = "/teacher";
      } else {
        this.myself = "/manager";
      }
    }
  }
};
</script>
<style scoped lang="less">
.el-container {

  padding: 0;
  margin: 0;
  height: 100%;
}
.el-header {
  width: 100%;
  height: 100px !important;
  padding: 10px 0 10px 0;
  display: flex;
  position: fixed;
  z-index: 1000;
  background-color: rgb(88, 80, 80);

  margin-bottom: 10px;
}
img {
  width: 170px;
  height: 80px;
  margin-left: 150px;
}
span {
  line-height: 80px;
  background-image: -webkit-linear-gradient(
    left,
    blue,
    #66ffff 10%,
    #cc00ff 20%,
    #cc00cc 30%,
    #ccccff 40%,
    #00ffff 50%,
    #ccccff 60%,
    #cc00cc 70%,
    #cc00ff 80%,
    #66ffff 90%,
    blue 100%
  );
  -webkit-text-fill-color: transparent; /* 将字体设置成透明色 */
  -webkit-background-clip: text; /* 裁剪背景图，使文字作为裁剪区域向外裁剪 */
  -webkit-background-size: 200% 100%;
  -webkit-animation: masked-animation 4s linear infinite;
  font-size: 28px;
  margin-left: 10px;
  letter-spacing: 2px;
}
@keyframes masked-animation {
  0% {
    background-position: 0 0;
  }
  100% {
    background-position: -100% 0;
  }
}
.header_logo {
  width: 100%;
  height: 80px;
  display: flex;
  cursor: pointer;
  padding: 0 10px 0 0;
  //background-color: rgb(175, 204, 201);
  .el-menu {
    width: 500px;
    display: flex;
    justify-content: space-between;
    margin-left: 300px;
    margin-top: 20px;
    background-color: rgb(88, 80, 80);

    .el-menu-item {
      color: rgba(236, 236, 245, 0.904);
      font-size: 18px;
      &:hover {
        color: #ec8f16;
      }
    }
    border-bottom: none;
  }
}

.sub {
  width: 150px;
  height: 100%;
  margin-left: 140px;
  margin-top: 10px;
}
.el-main {
  margin-top: 100px;
  margin-left: 0px;
  width: 100%;
  height: 100%;
  padding: 0px;
}
</style>
