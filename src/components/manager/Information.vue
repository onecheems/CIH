<template>
  <div class="container1">
    <div class="cont">
      <img class="img1" src="../../assets/img/infor_img.jpg" />
      <div class="text">
        <p class="title">个人信息</p>
        <p class="name">
          姓名：
          <span>{{inforData.root_name}}</span>
        </p>
        <p class="email">
          邮箱：
          <span>{{inforData.root_email}}</span>
        </p>
      </div>
    </div>
    <div>
      <img class="img2" src="../../assets/img/infor_img2.jpg" />
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      inforData: ""
    };
  },
  created() {
    this.getInforData();
  },
  methods: {
    async getInforData() {
      const { data: res } = await this.$http.get(
        "/v1/user/info",
        {
          responseType: "json",
          headers: {
            Authorization: "Bearer " + window.sessionStorage.getItem("token")
          }
        } //token换成从缓存获取
      );
      if (res.success == true) {
        this.inforData = res.data.user;
      } else {
        return;
      }
    }
  }
};
</script>
<style scoped lang="less">
.container1 {
  margin-top: 0px;
  width: 100%;
  height: 100%;
  background-color: rgb(247, 247, 248);
  //background-image: url('../../assets/img/infor_background.jpg');
  display: flex;
}
.img1 {
  width: 100%;
  height: 100%;
}
.img2 {
  width: 500px;
  height: 410px;
  margin-left: 0px;
  margin-top: 80px;
}
.cont {
  position: relative;
  margin-top: 100px;
  margin-left: 250px;
  width: 450px;
  height: 350px;
}
.text {
  position: absolute;
  top: 20px;
  left: 40px;
  font-size: 18px;
  color: rgb(72, 73, 73);
  .title {
    font-size: 30px;
    margin-left: 110px;
  }
  .name {
    margin-top: 50px;
  }
  .email {
    margin-top: 30px;
  }
}
</style>
