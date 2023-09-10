<template>
  <div>
    <!-- 轮播图 -->
    <el-carousel :interval="2000" type="card" height="400px">
      <el-carousel-item v-for="(item,index) in srollImgUrl" :key="index">
        <img :src="item.url" />
      </el-carousel-item>
    </el-carousel>

    <div class="Wel_content">
      <!-- 功能 -->
      <div class="com_people">
        <span>竞赛一条龙服务</span>
        <div>
          <hr size="5px" color="#1E90FF" width="100px;" />
        </div>
        <div class="CardEffect">
          <el-card :body-style="{ padding: '0px' }" v-for="(item,index) in CardData" :key="index"   >
            <img :src="item.ImgUrl" />
            <div class="CardText">
              <span>{{item.name}}</span>
            </div>
          </el-card>
        </div>
      </div>

      <!-- 功能具体介绍 -->
      <div class="effectList">
        <div v-for="(item,index) in effectListData" :key="index" class="ListCon1">
          <div class="part1">
            <div class="ListConText">
              <span>{{item.title1}}</span>
              <p>{{item.text1}}</p>
            </div>

            <img :src="item.ImgUrl1" />
          </div>
          <div class="part1">
            <img :src="item.ImgUrl2" />
            <div class="ListConText">
              <span>{{item.title2}}</span>
              <p>{{item.text2}}</p>
            </div>
          </div>
        </div>
      </div>
      <!-- 竞赛达人 -->
      <div class="com_people">
        <span>校园竞赛达人</span>
        <div>
          <hr size="5px" color="#1E90FF" width="100px;" />
        </div>
        <div class="com_people_img">
          <div v-for="(item,index) in comPeoleImg" :key="index">
            <img :src="item.url" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      srollImgUrl: [
        {
          url: require("../assets/img/scroll1.jpg")
        },
        {
          url: require("../assets/img/scroll2.jpg")
        },
        {
          url: require("../assets/img/scroll3.jpg")
        },
        {
          url: require("../assets/img/scroll4.jpg")
        },
        {
          url: require("../assets/img/scroll5.jpg")
        }
      ],
      comPeoleImg: [
        {
          url: require("../assets/img/com.jpg")
        },
        {
          url: require("../assets/img/comPeople1.jpg")
        },
        {
          url: require("../assets/img/comPeople2.jpg")
        }
      ],
      CardData: [
        {
          ImgUrl: require("../assets/img/咨询.jpg"),
          name: "最新赛事咨询"
        },
        {
          ImgUrl: require("../assets/img/教师.jpg"),
          name: "推送教师科研方向"
        },
        {
          ImgUrl: require("../assets/img/团队.jpg"),
          name: "方便跨学院组队"
        },
        {
          ImgUrl: require("../assets/img/奖状.jpg"),
          name: "竞赛成果展示"
        }
      ],
      effectListData: [
        {
          title1: "赛事咨询",
          text1:
            "我们竞赛小助手会第一时间推送竞赛消息，方便同学、老师及时了解的竞赛通知。",
          ImgUrl1: require("../assets/img/effect1.png"),

          title2: "教师科研方向",
          text2:
            "我们会提供不同专业教师的研究方向，方便同学在参加竞赛的同时找到合适方向的老师进行指导。",
          ImgUrl2: require("../assets/img/effect2.png")
        },
        {
          title1: "跨学院组队",
          text1:
            "在此助手中大家可以寻找自己心仪专业的队友，支持跨学院组队",
          ImgUrl1: require("../assets/img/effect3.png"),

          title2: "竞赛成果展示",
          text2:
            "在竞赛结束后我们会第一时推送竞赛结果，对竞赛优秀作品将进行展示。",
          ImgUrl2: require("../assets/img/effect4.png")
        }
      ]
    };
  },
  methods:{

  }
};
</script>
<style lang="less" scoped >

.el-carousel__item {
  

  img {
    width: 100%;
    height: 100%;
  }
}
.Wel_content {
  display: flex;
  padding: 0px 200px 0px 200px;
  flex-direction: column;
  text-align: center;
  background-color: rgb(244, 250, 248);
}
.com_people {
  margin-top: 90px;
  span {
    font-size: 32px;
    font-weight: 400;
    margin-bottom: 25px;
    letter-spacing: 3px;
    color: #2e4446;
    display: block;
  }
}
.com_people_img {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
  height: 350px;
  margin-top: 60px;

  img {
    width: 300px;
    height: 100%;
    box-shadow: 0 0 3px 3px rgb(201, 190, 190);
  }
}

.CardEffect {
  margin-top: 50px;
  display: flex !important;
  justify-content: space-between;
}
.el-card {
  width: 230px;
  height: 250px;
  img {
    width: 100%;
    height: 190px;
  };
  cursor:pointer;
  transition:bottom .3s linear 0s;
  bottom:0px;
  &:hover{
    position: relative;
    bottom:15px;
  }

}

// .CardEffect2{
//   width: 230px;
//   height: 250px;
//   img {
//     width: 100%;
//     height: 190px;
//   };
//   cursor:pointer;
// }

.CardText {
  padding: 8px;
  span {
    color: rgb(151, 142, 140);
    font-size: 22px;
  }
}
.effectList {
  margin-top: 50px;
  width: 100%;
  display: flex;
  flex-direction: column;
  text-align: start;
}
.ListCon1 {
  width: 100%;
  display: flex;
  flex-direction: column;
  img {
    width: 500px;
    height: 300px;
  }
}
.part1 {
  display: flex;
  justify-content: space-between;
  margin-top: 80px;
}
.ListConText {
  width: 450px;
  margin-top: 30px;
  span {
    font-size: 24px;
    letter-spacing: 3px;
    color: #273233;
    font-weight: 320;
    width: 100%;
  }
  p {
    display: block;
    margin-top: 30px;
    letter-spacing: 3px;
    font-size: 16px;
    color: grey;
  }
}
.con {
  margin-top: 60px;
}
</style>
