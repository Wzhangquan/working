import axios from "@/utils/serve"

export const getTopics = params =>axios.get("/topics",{
  params:{
    ...params,
    _sort:'id',
    _order:"desc"
  }
})

//更新
export const patchTopic = (id,data) =>axios.patch(`/topics/${id}`,data)

//删除
export const deleteTopic = id =>axios.delete(`/topics/${id}`)

//添加
export const postTopic = data =>axios.post("/topics",data)