
import { useEffect, useState } from "react";
import { getAllPosts } from "../api/post.apicall";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

import PostCard from "../components/PostCard";


const Home = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const posts = await getAllPosts();
        setPosts(posts.data.data);
      } catch (error) {
        toast.error(error.message || "Something went wrong");
      }
    })();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-primary text-primary-foreground py-4 shadow-md">
        <h1 className="text-2xl font-bold text-center">Posts</h1>
      </header>

      <main className="container mx-auto mt-8 space-y-6 flex flex-col justify-center items-center">
        {posts.length > 0 ? (
          posts.map((post) => <PostCard key={post._id} post={post} showmore={true} allcomments={false} showdeleteIcon={false} showEditIcon={false}/>)
        ) : (
          <p className="text-center text-gray-500">No posts available</p>
        )}
      </main>
      <ToastContainer />
    </div>
  );
};

export default Home;