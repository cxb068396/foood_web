<template>
  <div>
    <!--面包屑导航区域-->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{path: '/home'}">首页</el-breadcrumb-item>
      <el-breadcrumb-item>乡宴厨师</el-breadcrumb-item>
      <el-breadcrumb-item>厨师新增</el-breadcrumb-item>
    </el-breadcrumb>

    <!--页面主体部分-->
    <el-card class="box-card">
      <el-form
        :model="cookForm"
        :rules="cookFormRef"
        ref="cookFormRef"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="厨师姓名" prop="name">
          <el-input v-model="cookForm.name"></el-input>
        </el-form-item>
        <el-form-item label="厨师电话" prop="mobile">
          <el-input v-model="cookForm.mobile"></el-input>
        </el-form-item>
        <el-form-item label="身份证" prop="idcard">
          <el-input v-model="cookForm.idcard"></el-input>
        </el-form-item>
        <el-form-item label="厨师头像" prop="avatar">
          <el-input v-model="cookForm.avatar"></el-input>
          <!--上传厨师头像-->
          <!-- <el-upload
            action="https://jsonplaceholder.typicode.com/posts/"
            :on-preview="handlePreview"
            :on-remove="handleRemove"
            :headers="headerObj"
            :on-success="handleSuccess"
            list-type="picture"
          >
            <el-button size="small" type="primary">点击上传</el-button>
          </el-upload>-->
        </el-form-item>
        <el-form-item label="厨师描述" prop="desc">
          <el-input
            type="textarea"
            maxlength="150"
            :rows="3"
            show-word-limit
            v-model="cookForm.desc"
          ></el-input>
        </el-form-item>
        <el-form-item label="健康证" prop="healthphot">
          <el-input v-model="cookForm.healthphot"></el-input>
        </el-form-item>
        <el-form-item label="获奖菜品" prop="certphoto">
          <el-input v-model="cookForm.certphoto"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button v-if="this.id==0" type="primary" @click="cookAdd">立即创建</el-button>
          <el-button v-if="this.id !=0" type="primary" @click="cookChangInfo">修改</el-button>
          <el-button @click="resetCookForm">重置</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>>
<script>
export default {
  data() {
    var checkMobile = (rule, value, cb) => {
      var myreg = /^[1][3,4,5,7,8][0-9]{9}$/;
      if (myreg.test(value)) {
        return cb();
      }
      cb(new Error("请输入合法的手机号"));
    };
    var checkIDcard = (rule, value, cb) => {
      var myreg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
      if (myreg.test(value)) {
        return cb();
      }
      cb(new Error("请输入合法的身份证"));
    };
    return {
      id: "",
      cookForm: {
        name: "",
        mobile: "",
        idcard: "",
        // photo: [], //厨师的头像
        avatar: "",
        desc: "",
        healthphot: "",
        certphoto: ""
      },
      headerObj: {
        Authorization: window.sessionStorage.getItem("token")
      },
      cookFormRef: {
        name: [
          { required: true, message: "请输入厨师姓名", trigger: "blur" },
          { min: 2, max: 10, message: "长度在 2 到 10 个字符", trigger: "blur" }
        ],
        mobile: [
          { required: true, message: "请输入用户电话", trigger: "blur" },
          { validator: checkMobile, trigger: "blur" }
        ],
        idcard: [
          { required: true, message: "请输入用户电话", trigger: "blur" },
          { validator: checkIDcard, trigger: "blur" }
        ],
        avatar: [
          { required: true, message: "请上传厨师头像", trigger: "blur" }
        ],
        desc: [
          { required: true, message: "请简述厨师", trigger: "blur" },
          {
            min: 1,
            max: 150,
            message: "长度在 1到 150 个字符",
            trigger: "blur"
          }
        ],
        healthphot: [
          { required: true, message: "请上传厨师健康资格证", trigger: "blur" }
        ],
        certphoto: [
          { required: true, message: "请上传获奖菜品", trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    //处理图片预览效果
    handlePreview(file) {
      console.log(file);
    },
    //处理移除照片
    handleRemove(file) {
      console.log(file);
    },
    //监听图片上传的时间
    handleSuccess(response) {
      console.log(response);
    },
    //重置表单
    resetCookForm() {
      this.$refs.cookFormRef.resetFields();
    },
    //表单提交创建厨师
    cookAdd() {
      this.$refs.cookFormRef.validate(async valid => {
        if (!valid) return;
        const response = await this.axios.post(
          "http://47.97.251.68:3000/chef",
          this.cookForm
        );
        if (response.status == 201) {
          this.$message.success("创建成功");
          this.$router.push("/cooklist");
        } else {
          this.$message.error("创建失败");
        }
      });
    },
    //获取厨师信息
    async getCookInfo() {
      if (this.id == 0) {
        console.log("id为空");
        return;
      } else {
        const response = await this.axios.get(
          "http://47.97.251.68:3000/chef/" + this.id
        );
        console.log(response);
        if (response.status == 200) {
          this.cookForm = response.data;
        }
      }
    },
    //修改厨师的信息

    async cookChangInfo() {
      this.$refs.cookFormRef.validate(async valid => {
        if (!valid) return;
        const response = await this.axios.put(
          "http://47.97.251.68:3000/chef/" + this.id,
          this.cookForm
        );
        if (response.status == 200) {
          this.$message.success("修改成功");
          this.$router.push("/cooklist");
        } else {
          this.$message.error("修改失败");
        }
      });
    }
  },
  mounted() {
    this.id = this.$route.query.id || 0;

    this.getCookInfo();
  }
};
</script>>
<style lang="less" scoped>
.box-card .el-input {
  width: 50%;
}
</style>