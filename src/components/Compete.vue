<template>
  <div class="container">
    <div class="ComImg">
      <img alt="竞赛" src="../assets/img/cihcup.png" />
      <p>
        <span>赛</span>出自我
      </p>
    </div>
    <div class="CardCom">
      <C_com></C_com>
    </div>
  </div>
</template>
<script>
import C_com from "./common/C_com";
export default {
  components: { C_com }
};
</script>
<style scoped lang="less">
.container {
  margin: 0px;
  padding: 0px;
}
.ComImg {
  width: 100%;
  background: linear-gradient(-150deg, #222222 15%, #373737 70%, #3c4859 94%);
  height: 450px;
  text-align: center;
  img {
    margin: 40px auto;
    width: 180px;
    height: 180px;
    vertical-align: middle;
    border-style: none;
  }
  p {
    display: block;
    color: #fff;
    font-size: 28px;
    letter-spacing: 8px;
    span {
      font-size: 40px;
    }
  }
}
.CardCom{
  position:relative;
  top:-100px;
}
</style>
