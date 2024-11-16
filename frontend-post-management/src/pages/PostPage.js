import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import statusCodeUtility from '../utils/statusCode.Utility'
import { getSinglePost } from '../api/post.apicall'
import { toast, ToastContainer } from "react-toastify";
const PostPage = () => {
  const {id} = useParams()
  const [post, setPost] = useState({})

  const fetchPost = async() => {
    console.log(id)
    try {
      const response = await getSinglePost(id)
      console.log(response)
      if(response.status === statusCodeUtility.Success){
        toast.success(response.data.message || "Post fetched successfully")
      }
    } catch (error) {
        toast.error(error.response.data.message || "Something went wrong")
    }
    
  }
  useEffect(() => {
   
    fetchPost()
  }, [])
  return (
    <div className="min-h-screen bg-gray-50">
    <header className="bg-primary text-primary-foreground py-4 shadow-md">
      <h1 className="text-2xl font-bold text-center">Posts</h1>
    </header>

    <main className="container mx-auto mt-8 space-y-6 flex flex-col justify-center items-center">
      {post ? (
       <PostPage key={post._id} post={post} showmore={false} />)
      : (
        <p className="text-center text-gray-500">No post available</p>
      )}
    </main>
    <ToastContainer />
  </div>
  )
}

export default PostPage