import axios from "@/utils/serve"

//获取所有课程信息
export const getLessons= (params) =>axios.get("/lessons", {
   params:{
     ...params,
     _order:"desc",
     _sort:"id"
   }
})
//更新课程信息
export const  patchLesson = (id,data) =>axios.patch(`/lessons/${id}`,data)

//删除课程信息
export const deleteLesson = id =>axios.delete(`/lessons/${id}`)

//添加课程信息
export const postLesson = data =>axios.post("/lessons",data)