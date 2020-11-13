<template>
<div class="menu">
  <!-- 滚动条 -->
    <el-scrollbar style="height:100%" class="scroll">
      <el-menu
          router
          :default-active="$route.path"
          :collapse="!isCollapse"
          class="el-menu-demo"
          background-color="#545c64"
          text-color="#fff"
          active-text-color="#ffd04b">
          <!-- 一级菜单 -->
        <template v-for="item in routes">
        <el-submenu :index="item.path" :key="item.path" v-if="item.meta && !item.meta.hidden">
          <template slot="title" v-if="item.meta">
          <i :class="'el-icon-' + item.meta.icon"></i>
          <span>{{item.meta.title}}</span>
        </template>
      <!-- 二级菜单 -->
        <el-menu-item v-for="child in item.children" :key="child.path"  :index="item.path+'/'+child.path">
              <i  :class="'el-icon-' + (child.meta.icon || 'printer')" v-if="child.meta"></i>
              <span slot="title" v-if="child.meta">{{child.meta.title}}</span>
        </el-menu-item>
      </el-submenu>
      </template>
    </el-menu>
    </el-scrollbar>
    </div>
</template>

<script>
import { routes } from "@/router"
export default {
     data(){
       return{
          routes,
       }
     },
     props:{
       isCollapse:Boolean
     }
}
</script>

<style>
.el-menu-demo:not(.el-menu--collapse){
  width: 200px ;
  min-height: 400px;
}
</style>