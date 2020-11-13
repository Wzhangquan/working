<template>
      <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: item.path }"  v-for="item in breadRoutesArr" :key="item.path" > {{item.title}} </el-breadcrumb-item>
        </el-breadcrumb>
</template>

<script>
export default {
      data() {
        return {
            breadRoutesArr:[]
        }
      },
      methods:{
        getRoutes() {
          //console.log(this.$route.matched)
          const routeArr = this.$route.matched.map(item=>{
           //0 console.log(item)
            return {
              path: item.path,
              title: item.meta.title
            }
          });
           this.breadRoutesArr=[
              {
                path:"/",
                title:"首页"
              },
              ...routeArr
            ]
        }
      },
      watch:{
        // 监听路由的变化
        "$route":{
          handler:"getRoutes",
          immediate:true
        }
      }
}
</script>

<style>

</style>