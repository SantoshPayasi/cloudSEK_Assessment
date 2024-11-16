import { customAxios } from "../config/axios"

const modulename = "posts"

const axios = customAxios(modulename)




export const createPost = async(data) =>{
    const response = await axios.post("/create", data)
    return response
}


export const getAllPosts = async(limit) =>{
    const response = await axios.get("/getall", {params:{limit:limit}})
    return response
}


export const getSinglePost = async(id) =>{
    const response = await axios.get("/getsingle", {params:{id:id}})
    return response
}