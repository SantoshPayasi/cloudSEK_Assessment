import { useEffect, useRef, useState } from "react";
import CommentList from "./CommentList";
import {
  createNewComment,
  deleteComment,
  updateComment,
} from "../api/comment.apicall";
import StatusCodeUtility from "../utils/statusCode.Utility.js";
import { toast } from "react-toastify";
import NewCommentToolbar from "./CommentToolbar";
import { Edit3, Trash2, ViewIcon } from "lucide-react";
import { deletePost, updatePostAPi } from "../api/post.apicall.js";
import Toolbar from "./EditorToolbar.js";

const PostCard = ({
  post,
  showmore,
  allcomments,
  showdeleteIcon,
  showEditIcon,
}) => {
  const [comments, setComments] = useState(post.comments || []);
  const [newComment, setNewComment] = useState("");
  const [showAllComments, setShowAllComments] = useState(false);
  const [editingCommentId, setEditingCommentId] = useState(null);
  const [editedContent, setEditedContent] = useState("");
  const [showModal, setShowModal] = useState(false);

  const redirectService = (modulename) => {
    window.location.href = modulename;
  };

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
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this comment?"
    );
    if (confirmDelete) handleDeleteCommentAPiHandler(commentId);
  };

  const handleEditComment = (commentId, currentContent) => {
    setEditingCommentId(commentId);
    setEditedContent(currentContent);
  };

  const handleSaveEdit = (commentId) => {
    handleUpdateCommentAPiHandler(commentId, { content: editedContent });
  };

  const deletePosthandler = (postId) => {
    if (window.confirm("Are you sure you want to delete this post?")) {
      handleDeletePostAPi(postId);
    }
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
        const updatedComments = comments.filter(
          (comment) => comment._id !== id
        );
        setComments(updatedComments);
      }
    } catch (error) {
      toast.error(error.response.data.message || "Failed to delete comment");
    }
  };

  const handleDeletePostAPi = async (id) => {
    try {
      const response = await deletePost(id);
      if (response.status === StatusCodeUtility.Success) {
        toast.success(response.data.message || "Post deleted successfully");
        window.location.href = "/";
      }
      toast.error(response.data.message || "Failed to delete post");
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to delete post");
    }
  };

  const handleUpdateAPi = async (updatedPost) => {
    try {
      const response = await updatePostAPi(updatedPost);

      if (response.status === StatusCodeUtility.Success) {
        toast.success(response.data.message || "Post updated successfully");

        post.title = response.data.data.title;
        post.innerHTML = response.data.data.innerHTML;
        post.description = response.data.data.description;
      }
      toast.error(response.data.message || "Failed to update post");
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to update post");
    } finally {
      setShowModal(false);
    }
  };

  const visibleComments = allcomments ? comments : comments.slice(0, 2);

  return (
    <div className="border rounded-md shadow-md bg-white w-1/2">
      <div className="bg-sky-200 p-4 flex justify-between items-start">
        <div>
          <h2 className="text-xl font-semibold">{post.title}</h2>
          <p className="text-gray-600 text-sm">
            Posted on: {new Date(post.createdAt).toLocaleString()}
          </p>
          <div
            className="mt-4 text-gray-800"
            dangerouslySetInnerHTML={{ __html: post.innerHTML }}
          ></div>
        </div>
        <div className="flex space-x-4 text-gray-600">
          <PostToolBar
            showdeleteIcon={showdeleteIcon}
            showEditIcon={showEditIcon}
            post={post}
            onDelete={() => deletePosthandler(post._id)}
            onEdit={setShowModal}
            onView={() => {
              redirectService(`/post/${post._id}`);
            }}
          />
        </div>
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
              window.location.href = `/post/${post._id}`;
            }}
            className="mt-4 p-5 text-blue-600 hover:underline text-sm"
          >
            {showAllComments ? "Show Less" : "Show More"}
          </button>
        )}
      </div>
      <Modal
        showModal={showModal}
        setShowModal={setShowModal}
        post={post}
        handleUpdatePost={handleUpdateAPi}
      />
    </div>
  );
};

const Modal = ({ showModal, setShowModal, post, handleUpdatePost }) => {
  const [title, setTitle] = useState(post.title || "");
  const [content, setContent] = useState(post.innerHTML || "");
  const [description, setDescription] = useState(post.description || "");
  const ref = useRef(null);

  const saveCursorPosition = () => {
    const selection = window.getSelection();
    if (selection && selection.rangeCount > 0) {
      return selection.getRangeAt(0);
    }
    return null;
  };

  // Function to restore the cursor position
  const restoreCursorPosition = (range) => {
    if (range) {
      const selection = window.getSelection();
      if (selection) {
        selection.removeAllRanges();
        selection.addRange(range);
      }
    }
  };

  useEffect(() => {
    const range = saveCursorPosition(); 
    if (ref.current) {
      ref.current.innerHTML = post.innerHTML;
    }
    restoreCursorPosition(range); 
  }, [post]);

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const applyStyle = (style, value = null) => {
    document.execCommand(style, false, value);
  };

  const handleSubmit = () => {
    const updatedPost = {
      title,
      innerHTML: content,
      description: description,
      id: post._id,
    };

    handleUpdatePost(updatedPost);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <div
      className={`fixed inset-0 z-50 bg-black bg-opacity-50 flex justify-center items-center transition-opacity ${
        showModal ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
    >
      <div className="bg-white p-8 rounded-md w-3/4 md:w-1/2">
        <h2 className="text-2xl font-semibold mb-4">Edit Post</h2>
        <input
          type="text"
          placeholder="Post Title"
          value={title}
          onChange={handleTitleChange}
          className="w-full p-2 border rounded-md text-lg font-semibold mb-4"
        />
        <div className="border rounded-md shadow-sm p-4 bg-white mb-4">
          <Toolbar applyStyle={applyStyle} />
          <div
            id="editable"
            ref={ref}
            contentEditable
            onInput={(e) => {
              setContent(e.target.innerHTML);
              setDescription(e.target.innerText);
            }}
            className="min-h-[200px] mt-4 focus:outline-none p-2 border rounded-md bg-white"
          />
        </div>
        <div className="flex justify-end space-x-4">
          <button
            type="button"
            onClick={closeModal}
            className="bg-gray-300 text-black px-4 py-2 rounded-md"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleSubmit}
            className="bg-blue-600 text-white px-4 py-2 rounded-md"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

const PostToolBar = ({
  showEditIcon,
  showdeleteIcon,
  onEdit,
  onDelete,
  onView,
}) => {
  return (
    <>
      {showEditIcon && (
        <Edit3
          className="cursor-pointer hover:text-blue-600"
          size={20}
          onClick={() => onEdit(true)}
          title="Edit Post"
        />
      )}
      {showdeleteIcon && (
        <Trash2
          className="cursor-pointer hover:text-red-600"
          size={20}
          onClick={() => onDelete()}
          title="Delete Post"
        />
      )}
      <ViewIcon
        className="cursor-pointer hover:text-red-600"
        size={20}
        onClick={() => onView()}
        title="Delete Post"
      />
    </>
  );
};

export default PostCard;
