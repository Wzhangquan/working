import Layout from "@/layout/layout"
export default {
  path: "/banner",
  redirect: "/banner/list",
  component: Layout,
  meta:{
     title: "轮播管理",
     icon: 's-open'
  },
  children:[
    {
        path:"list",
        component:()=>import("@/views/banner/bannerList"),
        meta:{
          title:"轮播列表",
          icon:"s-promotion"
        }
    },
    {
      path:"add",
      component: ()=>import("@/views/banner/bannerAdd"),
      meta: {
        title:"新增轮播",
        icon:"s-opportunity"
      }
    }
  ]
}