import { useState } from "react";
import CommentList from "./CommentList";
import { createNewComment,deleteComment,updateComment } from "../api/comment.apicall";
import StatusCodeUtility from "../utils/statusCode.Utility.js";
import { toast } from "react-toastify";
import NewCommentToolbar from "./CommentToolbar";

const PostCard = ({ post, showmore }) => {
    const [comments, setComments] = useState(post.comments || []);
    const [newComment, setNewComment] = useState("");
    const [showAllComments, setShowAllComments] = useState(false);
    const [editingCommentId, setEditingCommentId] = useState(null);
    const [editedContent, setEditedContent] = useState("");
  
    const handleNewComment = () => {
      if (!newComment.trim()) return;
      const data = { content: newComment, postId: post._id };
      handleCreateComment(data);
    };
  
    const handleCreateComment = async (data) => {
      try {
        const response = await createNewComment(data);
        if (response.status === StatusCodeUtility.Created) {
          toast.success(response.data.message || "Comment added successfully");
          setComments([...comments, response.data.data]);
          setNewComment("");
        } else {
          toast.error(response.data.message || "Something went wrong");
        }
      } catch (error) {
        console.log(error);
        toast.error("Something went wrong");
      }
    };
  
    const handleDeleteComment = (commentId) => {
      const confirmDelete = window.confirm('Are you sure you want to delete this comment?');
      if (confirmDelete) handleDeleteCommentAPiHandler(commentId);
    };
  
    const handleEditComment = (commentId, currentContent) => {
      setEditingCommentId(commentId);
      setEditedContent(currentContent);
    };
  
    const handleSaveEdit = (commentId) => {
      handleUpdateCommentAPiHandler(commentId, { content: editedContent });
    };
  
    const handleUpdateCommentAPiHandler = async (id, data) => {
      try {
        const response = await updateComment(id, data);
        if (response.status === StatusCodeUtility.Success) {
          toast.success(response.data.message || "Comment updated successfully");
          const updatedComments = comments.map((comment) =>
            comment._id === id ? { ...comment, comment: editedContent } : comment
          );
          setComments(updatedComments);
          setEditingCommentId(null);
        }
      } catch (error) {
        toast.error(error.response.data.message || "Failed to update comment");
      }
    };
  
    const handleDeleteCommentAPiHandler = async (id) => {
      try {
        const response = await deleteComment(id);
        if (response.status === StatusCodeUtility.Success) {
          toast.success(response.data.message || "Comment deleted successfully");
          const updatedComments = comments.filter((comment) => comment._id !== id);
          setComments(updatedComments);
        }
      } catch (error) {
        toast.error(error.response.data.message || "Failed to delete comment");
      }
    };
  
    const visibleComments = showAllComments ? comments : comments.slice(0, 2);
  
    return (
      <div className="border rounded-md shadow-md bg-white w-1/2">
        <div className="bg-sky-200 p-4">
          <h2 className="text-xl font-semibold">{post.title}</h2>
          <p className="text-gray-600 text-sm">Posted on: {new Date(post.createdAt).toLocaleString()}</p>
          <div className="mt-4 text-gray-800" dangerouslySetInnerHTML={{ __html: post.description }}></div>
        </div>
  
        <div className="mt-6 border-t pt-4">
          <h3 className="text-lg font-medium pl-2">Comments</h3>
  
          <NewCommentToolbar
            newComment={newComment}
            setNewComment={setNewComment}
            handleNewComment={handleNewComment}
          />
  
          <CommentList
            comments={visibleComments}
            editingCommentId={editingCommentId}
            setEditingCommentId={setEditingCommentId}
            editedContent={editedContent}
            setEditedContent={setEditedContent}
            handleEditComment={handleEditComment}
            handleSaveEdit={handleSaveEdit}
            handleDeleteComment={handleDeleteComment}
          />
  
          {showmore && comments.length > 0 && (
            <button
              onClick={() => {
                setShowAllComments(!showAllComments)
                window.location.href = `/${post._id}`
              }}
              className="mt-4 p-5 text-blue-600 hover:underline text-sm"
            >
              {showAllComments ? "Show Less" : "Show More"}
            </button>
          )}
        </div>
      </div>
    );
  };


  export default PostCard