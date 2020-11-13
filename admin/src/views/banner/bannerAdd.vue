<template>
  <div class="container">
    <!-- 返回卡 -->
    <el-card shadow="never" class="card-title">
      <el-page-header
        @back="goBack"
        content="轮播管理"
        class="title"
      ></el-page-header>
    </el-card>
    <!-- 标题卡 -->
    <el-card class="margebtm" shadow="never">
      <i class="el-icon-edit icon"></i>
      <span class="smallTitle">请填写信息</span>
    </el-card>
    <el-card>
      <el-form>
        <el-form-item label="轮播图名称">
          <el-input
            placeholder="请输入轮播图名称"
            v-model="bannerAdd.title"
          ></el-input>
        </el-form-item>
        <el-form-item label="轮播图">
          <el-upload
            class="upload-demo"
            action="http://localhost:3000/upload"
            :limit="1"
            :on-success="uploadSuccess"
          >
            <el-button size="small" type="primary">点击上传</el-button>
            <div slot="tip" class="el-upload__tip">
              只能上传jpg/png文件，且不超过500kb
            </div>
          </el-upload>
        </el-form-item>
        <el-form-item label="轮播图状态">
          <el-switch
            active-color="#13ce66"
            inactive-color="#aaa"
            v-model="bannerAdd.status"
            :active-value="1"
            :inactive-value="0"
          >
          </el-switch>
        </el-form-item>
        <el-form-item label="上传时间">
          <el-date-picker
            format="yyyy-MM-dd"
            value-format="yyyy-MM-dd"
            type="date"
            placeholder="选择日期"
            v-model="bannerAdd.create_at"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" size="mini" @click="addBanner"
            >添加</el-button
          >
          <el-button type="info" size="mini">取消</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import { postBanner } from "@/api/banner";
export default {
  data() {
    return {
      bannerAdd: {
        title: "",
        author: "稻子",
        create_at: "",
        img_url: "",
        status: 0,
      },
    
    };
  },
  methods: {
    goBack() {
      this.$router.back();
    },
    //上传
    uploadSuccess(res) {
      // console.log(res)
      if (res.code === 200) {
        this.bannerAdd.img_url = `http://${res.data}`;
      }
    },
    addBanner() {
      if (this.bannerAdd.title !== "" &&this.bannerAdd.create_at !== "" &&this.bannerAdd.img_url !== "" ) {
        postBanner(this.bannerAdd).then(() => {
          this.$message.success("添加成功");
          this.$router.push("/banner/list");
        });
      } else {
        this.$message.warning("请输入完整内容");
      }
    },

  },
};
</script>

<style scoped>
.container .card-title {
  height: 60px;
  line-height: 60px;
  padding-left: 0;
}
.title {
  font-weight: 600;
  font-size: 20px;
  margin-bottom: 12px;
}
.icon {
  margin-right: 5px;
}
.icon,
.smallTitle {
  color: #666666;
  font-size: 14px;
}
</style>
