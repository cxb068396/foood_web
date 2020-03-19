<template>
  <div>
    <!--面包屑导航区域-->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{path: '/home'}">首页</el-breadcrumb-item>
      <el-breadcrumb-item>乡宴厨师</el-breadcrumb-item>
      <el-breadcrumb-item>厨师列表</el-breadcrumb-item>
    </el-breadcrumb>

    <!--卡片视图区域-->
    <el-card class="box-card">
      <el-row :gutter="500">
        <el-col :span="14">
          <el-input placeholder="请输入厨师名称" v-model="info.name">
            <el-button slot="append" icon="el-icon-search" @click="cookSearch"></el-button>
          </el-input>
        </el-col>
        <el-col :span="4">
          <el-button type="primary" style="margin-bottom:20px" @click="goCookAdd">添加厨师</el-button>
        </el-col>
      </el-row>

      <el-table :data="tableData" stripe style="width: 100%" border>
        <el-table-column prop="name" label="厨师姓名" width="180"></el-table-column>
        <el-table-column prop="mobile" label="联系方式" width="180"></el-table-column>
        <el-table-column prop="idcard" label="身份证"></el-table-column>
        <el-table-column prop="desc" label="描述"></el-table-column>
        <el-table-column prop="avatar" label="头像"></el-table-column>
        <el-table-column prop="certphoto" label="菜品"></el-table-column>
        <el-table-column prop="healthphot" label="健康证"></el-table-column>
        <el-table-column label="操作" min-width="80">
          <template scope="scope">
            <el-button
              size="small"
              type="success"
              @click="handleRowEdit(scope.$index, scope.row)"
            >修改</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>>
<script>
export default {
  data() {
    return {
      tableData: [],
      info: {
        name: ""
      }
    };
  },
  mounted() {
    this.getCookList();
  },
  methods: {
    //添加用户
    goCookAdd() {
      this.$router.push({ path: "/cookadd" });
    },
    //编辑厨师信息按钮
    handleRowEdit(index, row) {
      console.log(row);
      this.$router.push({ path: "/cookadd", query: { id: row.id } });
    },
    async getCookList() {
      const response = await this.axios.get("http://47.97.251.68:3000/chef");
      console.log(response);
      if (response.status == 200) {
        this.tableData = response.data;
      }
    },
    //搜索人员
    async cookSearch() {
      const response = await this.axios.get(
        "http://47.97.251.68:3000/chef?s=" + JSON.stringify(this.info)
      );
      if (response.status == 200) {
        this.tableData = response.data;
      } else {
        this.$message.error("暂无人员");
      }
    }
  }
};
</script>>