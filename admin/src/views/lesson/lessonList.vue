<template>
  <div class="container">
    <!-- 返回卡 -->
    <el-card shadow="never" class="card-title">
      <el-page-header
        @back="goBack"
        content="课程详情"
        class="title"
      ></el-page-header>
    </el-card>
    <!-- 标题卡 -->
    <el-card class="margebtm" shadow="never">
      <i class="el-icon-s-unfold icon"></i>
      <span class="smallTitle">课程列表</span>
    </el-card>
    <!-- 内容卡 -->
    <el-card>
      <el-table :data="LessonArr">
        <el-table-column label="标题" prop="title"></el-table-column>
        <el-table-column label="列表图">
          <template v-slot="{ row }">
            <img :src="row.img_url" width="80" />
          </template>
        </el-table-column>
        <el-table-column label="状态" width="120">
          <template v-slot="{ row }">
            <el-tag :type="row.status ? 'success' : 'warning'">{{
              row.status ? "活动已结束 " : "活动进行中"
            }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="描述" width="150">
          <template v-slot="{ row }">
            <p class="desc">{{ row.desc }}</p>
          </template>
        </el-table-column>
        <el-table-column
          label="报名费"
          prop="price"
          width="80"
        ></el-table-column>
        <el-table-column
          label="上传人"
          prop="author"
          width="80"
        ></el-table-column>
        <el-table-column label="上传时间" prop="create_at"></el-table-column>
        <el-table-column label="操作">
          <template v-slot="{ row }">
            <el-button
              type="primary"
              size="mini"
              class="el-icon-edit edit"
              @click="edit(row)"
              >编辑</el-button>
              <el-popconfirm title="确定要删除该条课程信息吗？" @confirm="deleteLessonMsg(row.id)">
                <el-button slot="reference" type="danger" size="mini" icon="el-icon-delete" >删除</el-button>
              </el-popconfirm>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页器 -->
      <el-pagination
        background
        layout="prev, pager, next,jumper"
        :total="total"
        style="margin-top:10px"
        :page-size="params._limit"
        @current-change="currentChange"
      >
      </el-pagination>
    </el-card>
    <!-- 点击编辑 对话框 -->
    <el-dialog title="课程信息" :visible.sync="dialogFormVisible" class="dialog">
      <el-form v-model="lesson">
        <el-form-item label="id">
          <el-input disabled v-model="lesson.id"></el-input>
        </el-form-item>
        <el-form-item label="课程标题">
          <el-input v-model="lesson.title"></el-input>
        </el-form-item>
        <el-form-item label="课程图片">
          <el-upload
            action="http://localhost:3000/upload"
            :limit="1"
            class="upload"
            :on-success="uploadSuccess"
          >
            <el-button size="small" type="primary">点击上传</el-button>
            <div slot="tip">建议尺寸为768*500像素，大小小于2M</div>
          </el-upload>
        </el-form-item>
        <el-form-item label="课程状态">
          <el-switch
            v-model="lesson.status"
            active-color="#13ce66"
            inactive-color="#aaa"
            :active-value="1"
            :inactive-value="0"
          >
          </el-switch>
        </el-form-item>
        <el-form-item label="报名费">
          <el-input v-model="lesson.price"></el-input>
        </el-form-item>
        <el-form-item label="上传人">
          <el-input v-model="lesson.author"></el-input>
        </el-form-item>
        <el-form-item label="上传时间">
          <el-date-picker
            type="date"
            placeholder="选择日期"
            :picker-options="pickerOptions"
            format="yyyy-MM-dd"
            value-format="yyyy-MM-dd"
            v-model="lesson.create_at"
          >
          </el-date-picker>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="update">更新</el-button>
        <el-button @click="dialogFormVisible = false">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { getLessons, patchLesson, deleteLesson } from "@/api/lesson";
export default {
  data() {
    return {
      LessonArr: [],
      params: {
        _limit: 8,
        _page: 1,
      },
      total: 0,
      lesson: [],
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() + 1000 * 60 * 60 * 24 < Date.now();
        },
      },
      dialogFormVisible: false,
    };
  },
  methods: {
    goBack() {
      this.$router.back();
    },
    getLesson(params) {
      getLessons(params).then((res) => {
        // console.log(res)
        this.LessonArr = res.data;
        this.total = +res.headers["x-total-count"];
      });
    },
    //分页页码
    currentChange(page) {
      this.params._page = page;
      this.getLesson(this.params);
    },
    //上传
    uploadSuccess({ code, data }) {
      // console.log(code,data);
      if (code === 200) {
        this.lesson.img_url = `http://${data}`;
      }
    },
    //编辑
    edit(msg) {
      this.dialogFormVisible = true;
      this.lesson = { ...msg };
    },
    //更新
    update() {
      patchLesson(this.lesson.id, this.lesson).then(() => {
        this.$message.success("更新成功");
        this.dialogFormVisible = false;
        this.getLesson(this.params);
      });
    },
    //删除
  deleteLessonMsg(id){
      //console.log(1)
       deleteLesson(id).then(()=>{
         this.$message.success("删除成功")
          this.getLesson(this.params);
       })
    }
  },
  created() {
    this.getLesson(this.params);
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
.margebtm {
  margin-top: 12px;
  margin-bottom: 10px;
}
.container .desc {
  width: 200px;
  height: 50px;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}
.container .edit{
  margin-right:5px
}
</style>
