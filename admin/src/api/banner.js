import axios from "@/utils/serve"

//请求所有轮播信息
export const getBanners = params =>axios.get("/banners",{
  params:{
      ...params,
      _sort: "id",
      _order: "desc"
    }
})

//更新轮播
export const patchBanner = (id,data)=>axios.patch(`/banners/${id}`,data)

//删除轮播
export const deleteBanner = id =>axios.delete(`/banners/${id}`)

//添加轮播
export const postBanner = data =>axios.post("/banners",data)