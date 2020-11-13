<template>
  <div class="container">
    <!-- 返回卡 -->
    <el-card shadow="never" class="card-title">
      <el-page-header
        @back="goBack"
        content="轮播详情"
        class="title"
      ></el-page-header>
    </el-card>
    <!-- 标题卡 -->
    <el-card class="margebtm" shadow="never">
      <i class="el-icon-s-unfold icon"></i>
      <span class="smallTitle">轮播列表</span>
      <!-- 搜索 -->
        <el-autocomplete
          v-model="state"
          :trigger-on-focus="false"
          :hide-loading="true"
          :fetch-suggestions="querySearchAsync"
          placeholder="请输入内容"
          @select="handleSelect"
          :debounce="0"
        ></el-autocomplete>
        <el-button type="primary" style="margin-left:10px" @click="searchMsg">搜索</el-button>
    </el-card>
    <!-- 内容卡 -->
    <el-card>
      <el-table
        :data="BannerMsg"
        style="width: 100%,margin-bottom:20px"
        v-loading="loading"
      >
        <!-- 多选 -->
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column prop="title" label="轮播图名称" width="180">
        </el-table-column>
        <el-table-column label="缩略图" width="180">
          <template v-slot="{ row }">
            <img :src="row.img_url" width="110" />
          </template>
        </el-table-column>
        <el-table-column prop="create_at" label="上传时间"> </el-table-column>
        <el-table-column label="状态">
          <template v-slot="{ row }">
            <el-tag :type="row.status ? 'success' : 'danger'">{{
              row.status ? "启用" : "禁用"
            }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="edit" label="操作">
          <template v-slot="{ row }">
            <!-- 把每一行的数据row到编辑的表单中 -->
            <el-button
              size="mini"
              type="success"
              class="el-icon-edit edit"
              @click="edit(row)"
              >编辑</el-button
            >
            <el-popconfirm
              title="确定删除该行轮播信息吗？"
              @confirm="deleteBanner(row.id)"
            >
              <el-button
                slot="reference"
                type="danger"
                size="mini"
                icon="el-icon-delete"
                >删除</el-button
              >
            </el-popconfirm>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页 -->
      <el-pagination
        style="margin-top:20px"
        background
        layout="prev, pager, next,jumper"
        :total="total"
        @current-change="currentChange"
        :page-size="params._limit"
      >
      </el-pagination>
    </el-card>
    <!-- 点击编辑 弹出框 -->
    <el-drawer :visible.sync="drawer">
      <el-form label-width="80px" v-model="banner" v-if="banner">
        <el-form-item label="id">
          <el-input disabled v-model="banner.id"></el-input>
        </el-form-item>
        <el-form-item label="轮播名称">
          <el-input v-model="banner.title"></el-input>
        </el-form-item>
        <el-form-item label="轮播图">
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
        <el-form-item label="轮播图状态">
          <el-switch
            v-model="banner.status"
            active-color="#13ce66"
            inactive-color="#aaa"
            :active-value="1"
            :inactive-value="0"
          >
          </el-switch>
        </el-form-item>
        <el-form-item label="上传时间">
          <el-date-picker
            type="date"
            placeholder="选择日期"
            :picker-options="pickerOptions"
            format="yyyy-MM-dd"
            value-format="yyyy-MM-dd"
            v-model="banner.create_at"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item>
          <div>
            <el-button type="primary" @click="updata">更新</el-button>
            <el-button type @click="cancel">取消</el-button>
          </div>
        </el-form-item>
      </el-form>
    </el-drawer>
  </div>
</template>

<script>
import { getBanners, patchBanner, deleteBanner } from "@/api/banner";
export default {
  data() {
    return {
      BannerMsg: [],
      search: {},
      params: {
        _limit: 8,
        _page: 1,
      },
      total: 0, //总数
      drawer: false,
      banner: [],
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() + 1000 * 60 * 60 * 24 < Date.now();
        },
      },
      loading: false,
      //远程搜索
      state: "",
      timeout: null,
    };
  },
  methods: {
    goBack() {
      this.$router.back();
    },
    getBanner(params) {
      this.loading = true;
      getBanners(params).then((res) => {
        // console.log(res);
        this.total = +res.headers["x-total-count"];
        this.BannerMsg = res.data;
        this.loading = false;
        this.BannerMsg.map((item, index) => {
          return Object.assign(item, { value: item.title });
        });
      });
    },
    currentChange(page) {
      //console.log(page)
      this.params._page = page; //当前页的page值重新赋值，再重新请求数据
      this.getBanner(this.params);
    },
    //编辑
    edit(msg) {
      // console.log(row)
      this.drawer = true; //打开抽屉
      this.banner = { ...msg };
      // console.log(this.banner)
    },
    // 更新
    updata() {
      patchBanner(this.banner.id, this.banner).then(() => {
        this.$message.success("更新成功");
        this.drawer = false;
        this.getBanner(this.params);
      });
    },
    //取消
    cancel() {
      this.drawer = false;
      this.$message.success("取消更新");
    },
    //上传
    uploadSuccess(res) {
      // console.log(res)
      if (res.code === 200) {
        this.banner.img_url = `http://${res.data}`;
      }
    },
    // 删除
    deleteBanner(id) {
      this.loading = true;
      deleteBanner(id).then(() => {
        this.$message.success("删除成功");
        this.getBanner(this.params);
        this.loading = false;
      });
    },
    //远程搜索 输入框
    querySearchAsync(queryString, cb) {
      var banners = this.BannerMsg;
      var results = queryString
        ? banners.filter(this.createStateFilter(queryString))
        : banners;

      clearTimeout(this.timeout);
      this.timeout = setTimeout(() => {
        cb(results);
      }, 3000 * Math.random());
    },
    createStateFilter(queryString) {
      return (state) => {
        return (
          state.title.toLowerCase().indexOf(queryString.toLowerCase()) === 0
        );
      };
    },
    handleSelect(item) {
      console.log(item);//就是搜索的那一行信息
      if(this.state === item.value){
          console.log("找到了")
      }
    },
    //搜索
    searchMsg(){
         //后端接口
    }
  },
  created() {
    this.getBanner(this.params);
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
  margin-right: 12px;
}
.margebtm {
  margin-top: 12px;
  margin-bottom: 10px;
}
.container .edit {
  margin-right: 10px;
}
</style>
