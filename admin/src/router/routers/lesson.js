import Layout from "@/layout/layout"
export default {
   path: "/lesson",
   redirect:"/lesson/list",
   meta:{
     title:"课程管理",
     icon:"reading"
   },
   component: Layout,
   children:[
     {
       path:"list",
       component:()=>import("@/views/lesson/lessonList"),
       meta:{
         title:"课程列表",
         icon:"s-grid"
       }
     },
     {
       path:"add",
       component:()=>import("@/views/lesson/lessonAdd"),
       meta:{
         title:"新增课程"
       }
     }
   ]
}