import React, { useEffect, useState, useCallback } from 'react'
import { useParams } from 'react-router-dom'
import statusCodeUtility from '../utils/statusCode.Utility'
import { getSinglePost } from '../api/post.apicall'
import { toast, ToastContainer } from "react-toastify";
import PostCard from '../components/PostCard';

// const PostPage = () => {
//   const {id} = useParams()
//   const [post, setPost] = useState({})

//   const fetchPost = useCallback(async() => {

//     try {
//       const response = await getSinglePost(id)
//       if(response.status === statusCodeUtility.Success){
//         setPost(response.data.data)
//         toast.success(response.data.message || "Post fetched successfully")
//       }
//     } catch (error) {
//         toast.error(error.response.data.message || "Something went wrong")
//     }
    
//   },[id])
//   useEffect(() => {
//     fetchPost()
//   }, [fetchPost])
//   return (
//     <div className="min-h-screen bg-gray-50">
//     <header className="bg-primary text-primary-foreground py-4 shadow-md">
//       <h1 className="text-2xl font-bold text-center">Posts</h1>
//     </header>

//     <main className="container mx-auto mt-8 space-y-6 flex flex-col justify-center items-center">
//       {post ? (
//        <PostCard key={post._id} post={post} showmore={false} allcomments={true} showdeleteIcon={true} showEditIcon={true}/>)
//       : (
//         <p className="text-center text-gray-500">No post available</p>
//       )}
//     </main>
//     <ToastContainer />
//   </div>
//   )
// }


const PostPage = () => {
  const { id } = useParams();
  const { post, loading, error } = usePost(id);

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-primary text-primary-foreground py-4 shadow-md">
        <h1 className="text-2xl font-bold text-center">Posts</h1>
      </header>

      <main className="container mx-auto mt-8 space-y-6 flex flex-col justify-center items-center">
        {loading && <LoadingState />} 
        {error && <ErrorState message={error} />} 
        {post && !loading && !error ? (
          <PostCard
            key={post._id}
            post={post}
            showmore={false}
            allcomments={true}
            showdeleteIcon={true}
            showEditIcon={true}
          />
        ) : null}
        {!loading && !error && !post && (
          <p className="text-center text-gray-500">No post available</p>
        )}
      </main>

      <ToastContainer />
    </div>
  );
};


const usePost = (id) => {
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchPost = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await getSinglePost(id);
      if (response.status === statusCodeUtility.Success) {
        setPost(response.data.data);
        toast.success(response.data.message || "Post fetched successfully");
      }
    } catch (error) {
      setError(error.response?.data?.message || "Something went wrong");
      toast.error(error.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchPost();
  }, [fetchPost]);

  return { post, loading, error };
};


const LoadingState = () => (
  <div className="text-center text-gray-500">
    <span>Loading...</span>
  </div>
);

const ErrorState = ({ message }) => (
  <div className="text-center text-red-500">
    <span>{message}</span>
  </div>
);

export default PostPage