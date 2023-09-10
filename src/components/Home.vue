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
          <el-menu-item index="/welcome" @click="saveNavState('/welcome')">首页</el-menu-item>
          <el-menu-item index="/compete" @click="saveNavState('/compete')">竞技广场</el-menu-item>
          <el-menu-item index="/aboutus" @click="saveNavState('/aboutus')">关于我们</el-menu-item>
          <el-menu-item index="/login">登录</el-menu-item>
        </el-menu>
      </div>
    </el-header>

    <el-main>
      <router-view></router-view>
    </el-main>
    <el-footer>
      <div class="foot">
        <img src="../assets/img/footer.jpg" />
        <div class="footer_content">
          <p>竞赛小助手</p>
          <div>联系我们：1249080441@qq.com</div>
          <div>皖ICP备19019103号</div>
        </div>
        <div class="footer_right">
          <div class="footer_right1">
            <div>
              <router-link to="/aboutus">联系我们</router-link>
            </div>

            <div>
              <router-link to="/aboutus">关于我们</router-link>
            </div>
          </div>
          <div class="footer_right1">
            <div>
              <router-link to="/aboutus">意见建议</router-link>
            </div>
            <div>
              <router-link to="/aboutus">帮助中心</router-link>
            </div>
          </div>
        </div>
      </div>
    </el-footer>
  </el-container>
</template>
<script>
export default {
  data() {
    return {
      activeIndex: ""
    };
  },
  created() {
    this.activeIndex = window.sessionStorage.getItem("activeIndex");
    if (this.activeIndex === "") {
      this.activeIndex = this.$route.path;
    }
  },
  methods: {
    //点击logo跳转到首页
    OnLogo() {},
    handleSelect(key, keyPath) {
    },
    // 保存链接的激活状态
    saveNavState(activeIndex) {
      window.sessionStorage.setItem("activeIndex", activeIndex);
      //键值对
      this.activeIndex = activeIndex;
    }
  }
};
</script>
<style lang="less" scoped>
.el-container {
  padding: 0;
  margin: 0;
}
.el-header {
  width: 100%;
  height: 100px !important;
  padding: 10px 0 10px 0;
  display: flex;
  position: fixed;
  z-index: 1000;
  background-color: white;
  box-shadow: inset 0 0 3px rgb(228, 224, 224);
}
img {
  width: 150px;
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
    margin-left: 180px;
    margin-top: 20px;

    .el-menu-item {
      color: rgba(85, 85, 218, 0.904);
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
  margin-top: 90px;
  width: 100%;
  height: 100%;
}
.el-footer {
  width: 100%;
  height: 230px !important;
  margin-top: 120px;
  background-color: #2f3939;
  color: #fff;
  display: flex;
}
.foot {
  display: flex;
  color: #fff;
  img {
    width: 180px;
    height: 180px;
    margin-top: 30px;
  }
  margin-left: 100px;
}
.footer_content {
  margin-top: 20px;
  margin-left: 200px;
  display: flex;
  flex-direction: column;
  color: rgb(141, 138, 138);
  p {
    font-size: 28px;
    margin-bottom: 50px;
  }
}
.footer_right {
  display: flex;
  flex-direction: column;
  margin-left: 200px;
  margin-top: 80px;

  height: 80px;
  justify-content: space-between;
  .footer_right1 {
    display: flex;
    justify-content: space-between;
    width: 160px;
  }
  a {
    text-decoration: none;
    cursor: pointer;
    color: #fff;
    &:hover {
      color: aqua;
    }
  }
}
</style>
