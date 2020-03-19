<template>
  <el-container class="home-container">
    <!--头部-->
    <el-header>
      <div class="titleicon">
        <img src="../assets/foods.jpg" alt />
        <span>乡宴管理后台</span>
      </div>
      <el-button @click="logout">退出</el-button>
    </el-header>
    <el-container>
      <el-aside :width="isCollapse?'64px':'250px'">
        <div class="toggle-button" @click="toggle">{{isCollapse?'展开':'|||'}}</div>
        <!--侧边栏菜单-->
        <el-menu
          background-color="#333744"
          text-color="#fff"
          active-text-color="#409EFF"
          :collapse="isCollapse"
          :collapse-transition="false"
          router
          :default-active="this.$router.path"
          :unique-opened="true"
        >
          <el-submenu index="1">
            <template slot="title">
              <i class="el-icon-user-solid"></i>
              <span>乡宴厨师</span>
            </template>
            <el-menu-item index="/cooklist">厨师列表</el-menu-item>
            <el-menu-item index="/cookadd">厨师新增</el-menu-item>
          </el-submenu>
          <el-submenu index="2">
            <template slot="title">
              <i class="el-icon-menu"></i>
              <span>乡宴类别</span>
            </template>
            <el-menu-item index="/categorylist">类别列表</el-menu-item>
            <el-menu-item index="/categoryadd">类别新增</el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>
      <!--中间-->
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>>

<script>
export default {
  data() {
    return {
      isCollapse: false
    };
  },
  methods: {
    logout() {
      window.sessionStorage.clear();
      this.$router.push("/login");
    },
    toggle() {
      this.isCollapse = !this.isCollapse;
    }
  }
};
</script>>
<style lang="less" scoped>
.home-container {
  height: 100%;
}
.el-header {
  background-color: #373d42;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #fff;
  font-size: 20px;
  padding: 40px 30px 40px 30px;
}
.titleicon {
  height: 60px;
  display: flex;
  align-items: center;
  border-radius: 50%;
}
.titleicon img {
  height: 60px;
  width: 60px;
  border-radius: 50%;
}
.titleicon span {
  margin-left: 10px;
}
.el-aside {
  background-color: #333744;
}
.el-menu {
  border-right: none;
}
.el-main {
  background-color: #eaedf1;
  padding: 0;
}
.toggle-button {
  background-color: #4a5064;
  font-size: 10px;
  line-height: 24px;
  text-align: center;
  color: #fff;
  letter-spacing: 0.2em;
  cursor: pointer;
}
</style>