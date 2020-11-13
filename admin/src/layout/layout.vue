<template>
  <el-container>
    <el-aside style="width:auto">
      <!-- 菜单 -->
      <Menu :isCollapse="coll"></Menu>
    </el-aside>

    <el-container>
      <!--  头部 -->
      <el-header>
        <!-- 折叠菜单 -->
        <div class="header">
          <i
            :class="['edit', coll ? 'el-icon-s-fold' : 'el-icon-s-unfold']"
            @click="isCollapse"
          ></i>
        </div>
        <!-- 刷新 -->
        <div class="refresh">
          <i class="el-icon-refresh" @click="refresh"></i>
        </div>
        <!--  面包屑导航-->
        <div class="bread">
             <Bread></Bread>
        </div>
      </el-header>
      <!-- 内容区 -->
      <el-main style="background-color: #eee">
        <!-- 标签缓存卡 -->
        <ChosoeTab></ChosoeTab>
        <!-- 内容 -->
     <transition name="el-fade-in-linear" mode="out-in">
          <keep-alive v-if="showview">
            <router-view v-if="showview" :key="$route.fullPath"></router-view>
          </keep-alive>
        </transition>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import Menu from "@/components/menu";
import Bread from "@/layout/breadCrumb.vue"
import ChosoeTab from "@/layout/chooseTab"
export default {
  data() {
    return {
      coll: false,
      showview:true
    };
  },
  components: {
    Menu,
    Bread,
    ChosoeTab
  },
  methods: {
    //折叠
    isCollapse() {
      this.coll = !this.coll;
    },
    //刷新
    refresh(){
        this.showview = false 
        this.$nextTick(()=>{
             this.showview = true
        })
    }
  },
};
</script>

<style>
.el-container {
  height: 100vh;
}
.el-aside {
  background: #545c64;
}
.el-container .el-menu {
  border: none;
}
.el-menu-item {
  width: 150px;
  padding: 0;
}
.el-header {
  height: 50px;
  line-height: 50px;
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
}
.header {
  height: 60px;
  line-height: 60px;
}
.header .edit {
  display: block;
  line-height: 60px;
  font-size: 24px;
  cursor: pointer;
  margin-right:12px;
}
.el-header{
   display: flex;
   align-items: center;
}
.refresh{
  margin-right:10px;
    font-size: 22px;
}
</style>
