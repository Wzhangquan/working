import Layout from "@/layout/layout"
export default {
  path:"/dashboard",
  redirect:"/dashboard/console",
  meta:{
   title:"Dashboard",
   icon:"coordinate"
  },
  component:Layout,
  children:[
    {
      path:"console",
      meta:{
        title:"主控台",
        icon:"s-tools"
      },
     component:()=>import("@/views/dashboard/console")
    }
  ]
}