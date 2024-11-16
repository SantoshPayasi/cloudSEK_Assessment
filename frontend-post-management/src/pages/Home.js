
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
          posts.map((post) => <PostCard key={post._id} post={post} showmore={true} />)
        ) : (
          <p className="text-center text-gray-500">No posts available</p>
        )}
      </main>
      <ToastContainer />
    </div>
  );
};

// const PostCard = ({ post }) => {
//   const [comments, setComments] = useState(post.comments || []);
//   const [newComment, setNewComment] = useState("");
//   const [showAllComments, setShowAllComments] = useState(false);
//   const [editingCommentId, setEditingCommentId] = useState(null);
//   const [editedContent, setEditedContent] = useState("");

//   const handleNewComment = () => {
//     if (!newComment.trim()) return;
//     const data = { content: newComment, postId: post._id };
//     handleCreateComment(data);
//   };

//   const handleCreateComment = async (data) => {
//     try {
//       const response = await createNewComment(data);
//       if (response.status === StatusCodeUtility.Created) {
//         toast.success(response.data.message || "Comment added successfully");
//         setComments([...comments, response.data.data]);
//         setNewComment("");
//       } else {
//         toast.error(response.data.message || "Something went wrong");
//       }
//     } catch (error) {
//       console.log(error);
//       toast.error("Something went wrong");
//     }
//   };

//   const handleDeleteComment = (commentId) => {
//     const confirmDelete = window.confirm('Are you sure you want to delete this comment?');
//     if (confirmDelete) handleDeleteCommentAPiHandler(commentId);
//   };

//   const handleEditComment = (commentId, currentContent) => {
//     setEditingCommentId(commentId);
//     setEditedContent(currentContent);
//   };

//   const handleSaveEdit = (commentId) => {
//     handleUpdateCommentAPiHandler(commentId, { content: editedContent });
//   };

//   const handleUpdateCommentAPiHandler = async (id, data) => {
//     try {
//       const response = await updateComment(id, data);
//       if (response.status === StatusCodeUtility.Success) {
//         toast.success(response.data.message || "Comment updated successfully");
//         const updatedComments = comments.map((comment) =>
//           comment._id === id ? { ...comment, comment: editedContent } : comment
//         );
//         setComments(updatedComments);
//         setEditingCommentId(null);
//       }
//     } catch (error) {
//       toast.error(error.response.data.message || "Failed to update comment");
//     }
//   };

//   const handleDeleteCommentAPiHandler = async (id) => {
//     try {
//       const response = await deleteComment(id);
//       if (response.status === StatusCodeUtility.Success) {
//         toast.success(response.data.message || "Comment deleted successfully");
//         const updatedComments = comments.filter((comment) => comment._id !== id);
//         setComments(updatedComments);
//       }
//     } catch (error) {
//       toast.error(error.response.data.message || "Failed to delete comment");
//     }
//   };

//   const visibleComments = showAllComments ? comments : comments.slice(0, 2);

//   return (
//     <div className="border rounded-md shadow-md bg-white w-1/2">
//       <div className="bg-sky-200 p-4">
//         <h2 className="text-xl font-semibold">{post.title}</h2>
//         <p className="text-gray-600 text-sm">Posted on: {new Date(post.createdAt).toLocaleString()}</p>
//         <div className="mt-4 text-gray-800" dangerouslySetInnerHTML={{ __html: post.description }}></div>
//       </div>

//       <div className="mt-6 border-t pt-4">
//         <h3 className="text-lg font-medium pl-2">Comments</h3>

//         <NewCommentToolbar
//           newComment={newComment}
//           setNewComment={setNewComment}
//           handleNewComment={handleNewComment}
//         />

//         <CommentList
//           comments={visibleComments}
//           editingCommentId={editingCommentId}
//           setEditingCommentId={setEditingCommentId}
//           editedContent={editedContent}
//           setEditedContent={setEditedContent}
//           handleEditComment={handleEditComment}
//           handleSaveEdit={handleSaveEdit}
//           handleDeleteComment={handleDeleteComment}
//         />

//         {comments.length > 0 && (
//           <button
//             onClick={() => setShowAllComments(!showAllComments)}
//             className="mt-4 p-5 text-blue-600 hover:underline text-sm"
//           >
//             {showAllComments ? "Show Less" : "Show More"}
//           </button>
//         )}
//       </div>
//     </div>
//   );
// };

// const NewCommentToolbar = ({ newComment, setNewComment, handleNewComment }) => {
//   const applyStyle = (style, value = null) => {
//     document.execCommand(style, false, value);
//   };

//   return (
//     <div className="border p-2 h-40 mb-5">
//       <h3>Add new Comment</h3>
//       <div className="flex gap-2 mb-4">
//         <button className="p-2 rounded bg-gray-200 hover:bg-gray-300" onClick={() => applyStyle("bold")}>
//           <Bold size={18} />
//         </button>
//         <button className="p-2 rounded bg-gray-200 hover:bg-gray-300" onClick={() => applyStyle("italic")}>
//           <Italic size={18} />
//         </button>
//         <button
//           className="p-2 rounded bg-gray-200 hover:bg-gray-300"
//           onClick={() => {
//             const url = prompt("Enter the URL");
//             if (url) {
//               applyStyle("createLink", url);
//               applyStyle("underline")
//                     };
//           }}
//         >
//           <Link size={18} />
//         </button>
//       </div>

//       <div className="flex items-center gap-2 py-4">
//         <div
//           contentEditable
//           className="flex-1 p-2 border rounded-md bg-gray-50 focus:outline-none min-h-[40px] max-h-[80px] overflow-auto"
//           placeholder="Write a comment..."
//           onInput={(e) => setNewComment(e.target.innerHTML)}
//         ></div>
//         <button onClick={handleNewComment} className="bg-blue-600 text-white px-4 py-1 rounded-md">
//           Add
//         </button>
//       </div>
//     </div>
//   );
// };

// const CommentList = ({
//   comments,
//   editingCommentId,
//   setEditingCommentId,
//   editedContent,
//   setEditedContent,
//   handleEditComment,
//   handleSaveEdit,
//   handleDeleteComment,
// }) => (
//   <div className="space-y-4">
//     {comments.map((comment) => (
//       <div key={comment._id} className="p-2 border rounded-md bg-gray-100 shadow-sm">
//         {editingCommentId === comment._id ? (
//           <div
//             contentEditable
//             className="text-gray-800 bg-white h-10 text-md"
//             suppressContentEditableWarning={true}
//             onInput={(e) => setEditedContent(e.target.innerHTML)}
//             dangerouslySetInnerHTML={{ __html: editedContent }}
//           ></div>
//         ) : (
//           <div dangerouslySetInnerHTML={{ __html: comment.comment }} className="text-gray-800 text-sm" />
//         )}

//         <p className="text-xs text-gray-500 mt-1">
//           {new Date(comment.createdAt).toLocaleString()}
//         </p>

//         <div className="flex space-x-2 mt-2">
//           {editingCommentId === comment._id ? (
//             <>
//               <button onClick={() => handleSaveEdit(comment._id)} className="text-blue-500 hover:text-blue-700">
//                 Save
//               </button>
//               <button onClick={() => setEditingCommentId(null)} className="text-gray-500 hover:text-gray-700">
//                 Cancel
//               </button>
//             </>
//           ) : (
//             <>
//               <button onClick={() => handleEditComment(comment._id, comment.comment)} className="text-yellow-500 hover:text-yellow-700">
//                 <Edit size={16} />
//               </button>
//               <button onClick={() => handleDeleteComment(comment._id)} className="text-red-500 hover:text-red-700">
//                 <Trash size={16} />
//               </button>
//             </>
//           )}
//         </div>
//       </div>
//     ))}
//   </div>
// );

export default Home;
