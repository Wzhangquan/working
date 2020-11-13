<template>
  <div class="tabs">
  <el-tabs  type="card" 
  :value="$route.path"
  @tab-click="tabClick"
  @tab-remove="tabRemove"
  >
    <el-tab-pane
      v-for="(item,index) in tabMsg"
      :closable="index !==0 " 
      :key="item.path"
      :label="item.name"
      :name="item.path"
    > 
    </el-tab-pane>
  </el-tabs>
  </div>
</template>
<script>
export default {
  data() {
    return{
      tabMsg:[
        {
          path:"/dashboard/console",
          name:"主控台"
        }
      ]
    }
  },
  watch:{
    $route:{
      handler(to){
        //console.log(to)
        if(!this.tabMsg.some(item=>item.path===to.path)){
          //不相等就说明不重复。添加
          this.tabMsg.push({
            path:to.path,
            name:to.meta.title
          })
        }
      },
      immediate:true
    }
  },
  methods:{
    tabClick(params){
      // console.log(params)
       this.$router.push(params.name)
    },
    tabRemove(name){
       // console.log(name);//当前标签页path名字
        const index = this.tabMsg.findIndex(item=>item.path===name);
       // console.log(index)
        this.tabMsg.splice(index,1)
        //在当前页删除，则跳转到主控台，否则，不进行任何操作
        if(this.$route.path === name) {
          this.$router.replace("/dashboard/console")
        }
    }
  }
};
</script>

<style scoped>

</style>
