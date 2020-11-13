<template>
  <div class="container">
    <!-- 返回卡 -->
    <el-card shadow="never" class="card-title">
      <el-page-header
        @back="goBack"
        content="文章管理"
        class="title"
      ></el-page-header>
    </el-card>
    <!-- 标题卡 -->
    <el-card class="margebtm" shadow="never">
      <i class="el-icon-edit icon"></i>
      <span class="smallTitle">请填写文章信息</span>
    </el-card>
    <el-card>
      <el-form v-model="topic">
        <el-form-item label="文章标题">
          <el-input
            placeholder="请输入文章标题"
            v-model="topic.title"
          ></el-input>
        </el-form-item>
        <el-form-item label="文章图片">
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
        <el-form-item label="描述">
          <el-input
            type="textarea"
            :rows="2"
            placeholder="请输入内容"
            v-model="topic.desc"
          >
          </el-input>
        </el-form-item>
        <el-form-item label="上传人">
          <el-input placeholder="请输入姓名" v-model="topic.authro"></el-input>
        </el-form-item>
        <el-form-item label="上传时间">
          <el-date-picker
            format="yyyy-MM-dd"
            value-format="yyyy-MM-dd"
            type="date"
            placeholder="选择日期"
            v-model="topic.create_at"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" size="mini" @click="addTopic"
            >添加</el-button
          >
          <el-button type="info" size="mini">取消</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import { postTopic } from "@/api/topic";
export default {
  data() {
    return {
      topic: {
        title: "",
        img_url: "http://dummyimage.com/400x240",
        desc: "",
        authro: "",
        create_at: "",
      },
    };
  },
  methods: {
    //返回
    goBack() {
      this.$router.back();
    },
    //上传
    uploadSuccess(res) {
      if (res.code === 200) {
        this.topic.img_url = `http://${res.data}`;
      }
    },
    //添加
    addTopic() {
      if (this.topic.title !== null && this.topic.desc !==null && this.topic.authro !==null && this.topic.create_at !==null) {
        postTopic(this.topic).then(() => {
          this.$message.success("添加成功");
          this.$router.push("/topic/list");
        });
      }else {
        this.$message.warning("请输入完整信息")
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
