<template>
  <div class="container">
    <img src="../assets/img/cihcup.png" />
    <div class="title">竞赛信息小助手</div>
    <div class="smallTitle1">联系我们</div>
    <div class="con">
      <!-- 地址 -->
      <div class="addr">
        <div class="contact">
          <img src="../assets/img/地址.png" />
        </div>
        <span>地址</span>
        <div>
          <p>江苏省镇江市</p>
          <p>京口区学府路301号江苏大学</p>
        </div>
      </div>
      <!-- 微信 -->
      <div class="wechat">
        <div class="contact">
          <img src="../assets/img/微信.png" />
        </div>
        <span>微信</span>
        <div>
          <p>pjwiwyy</p>

        </div>
      </div>
      <!-- 邮箱 -->
      <div class="addr">
        <div class="contact">
          <img src="../assets/img/email.png" />
        </div>
        <span>邮箱</span>
        <div>
          <p>1249080441@qq.com</p>

        </div>
      </div>
      <div class="foot"></div>
    </div>
  </div>
</template>
<script>
export default {};
</script>
<style scoped lang="less">
.container {
  margin-top: 240px;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  img {
    width: 250px;
    height: 250px;
    margin-bottom: 20px;
  }

}
.title {
  font-size: 46px;
  font-weight: 500px;
  letter-spacing: 7px;
  color: rgb(150, 148, 144);
  margin-bottom: 160px;
}

.con {
 
  width: 1200px;
  display: flex;

  margin-top: 100px;
  justify-content: space-between;
  margin-left:160px;
}
.addr {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  font-size: 18px;
  color: grey;
  justify-content: space-between;
  span {
    margin-top: 40px;
    margin-bottom: 50px;
  }
}
.wechat{
  margin-top:50px;
    display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  font-size: 18px;
  color: grey;
  justify-content: space-between;
  span {
    margin-top: 40px;
    margin-bottom: 50px;
  }
}
.contact {
  width: 160px;
  height: 160px;
  border: 1px solid gainsboro;
  border-radius: 50%;
  img {
    width: 80px;
    height: 80px;
  }
  background-color: gainsboro;
  display: flex;
  justify-content: center;
  align-items: center;
}
.smallTitle1 {
  font-size: 34px;
  letter-spacing: 5px;
  color: rgb(71, 71, 71);
}
</style>
