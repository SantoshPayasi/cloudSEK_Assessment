import { useEffect, useState } from "react";
import { getAllPosts } from "../api/post.apicall";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import PostCard from "../components/PostCard";
import { Link } from "react-router-dom";

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [Loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const posts = await getAllPosts();
        setPosts(posts.data.data);
      } catch (error) {
        toast.error(error.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-primary text-primary-foreground py-4 shadow-md">
        <h1 className="text-2xl font-bold text-center">Posts</h1>
       <button className="absolute top-4 bg-sky-400 text-white right-4 bg-primary-foreground text-primary px-4 py-2 rounded-md">
          <Link to={"/create-post"}>Create Post</Link>
        </button>

      </header>

      {Loading ? (
        <div className="text-center text-gray-500">
          <span>Loading...</span>
        </div>
      ) : (
        <main className="container mx-auto mt-8 space-y-6 flex flex-col justify-center items-center">
          {posts.length > 0 ? (
            posts.map((post) => (
              <PostCard
                key={post._id}
                post={post}
                showmore={true}
                allcomments={false}
                showdeleteIcon={false}
                showEditIcon={false}
                showViewIcon={true}
              />
            ))
          ) : (
            <p className="text-center text-gray-500">No posts available</p>
          )}
        </main>
      )}
      <ToastContainer />
    </div>
  );
};

export default Home;
