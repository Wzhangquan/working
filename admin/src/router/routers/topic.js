import Layout from "@/layout/layout"
export default{
  path:"/topic",
  redirect:"/topic/list",
  component:Layout,
  meta:{
    title:"文章管理",
    icon:"tickets"
  },
  children:[
    {
      path:"list",
      meta:{
        title:"文章列表",
        icon:"mobile"
      },
      component:()=>import("@/views/topic/topicList")
    },
    {
      path:"add",
      meta:{
        title:"新增文章",
      },
      component:()=>import("@/views/topic/topicAdd")
    }
  ]
}