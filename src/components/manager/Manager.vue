<template>
  <el-container>
    <el-aside width="200px">
      <el-menu
        default-active="/information"
        class="el-menu-vertical-demo"
        background-color="#545c64"
        text-color="#fff"
        active-text-color="#ffd04b"
        router=""
      >
        <el-menu-item-group>
          <el-menu-item index="/information">
            <i class="el-icon-user-solid"></i>
            <span>个人信息</span>
          </el-menu-item>
          <el-menu-item index="/rights">
            <i class="el-icon-s-goods"></i>
            <span>管理成员</span>
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
      inforData: []
    };
  },
  created() {
    
  },
  methods: {

}}
</script>
<style scoped lang="less">
.el-container {
  height: 100%;
}
.el-aside {
  background-color: #333744;
}
.el-main{
  padding:0px;
  height:100%;
}
</style>
