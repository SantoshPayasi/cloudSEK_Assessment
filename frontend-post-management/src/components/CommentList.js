import { Edit, Trash, PenBox } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import Toolbar from "./EditorToolbar.js";

const CommentList = ({
  comments,
  handleSaveEdit,
  handleDeleteComment,
  handleNewComment,
}) => {
  const [editingComment, setEditingComment] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [operationType, setOperationType] = useState("createNew");

  const handleEditClick = (comment) => {
    setEditingComment(comment);
    setOperationType("editOne");
    setShowModal(true);
  };

  const handleModalSubmit = (updatedComment) => {
    if (operationType === "createNew") {
      handleNewComment(updatedComment);
    } else if (operationType === "editOne") {
      handleSaveEdit(editingComment._id, updatedComment);
    }
    setShowModal(false);
    setOperationType("");
    setEditingComment("")
  };

  return (
    <div className="space-y-4">
      <div className=" w-full flex justify-between items-center px-2">
        <h3 className="text-lg font-normal pl-2">Comments</h3>
        <PenBox
          className="cursor-pointer text-gray-500"
          onClick={() => {
            setOperationType("createNew");
            setShowModal(true);
          }}
        />
      </div>

      {comments.map((comment) => (
        <CommentItem
          key={comment._id}
          comment={comment}
          onEdit={() => handleEditClick(comment)}
          onDelete={() => handleDeleteComment(comment._id)}
        />
      ))}
      {showModal && (
        <CommentModal
          comment={editingComment}
          onClose={() =>{ setShowModal(false); setEditingComment(null)}}
          onSubmit={handleModalSubmit}
        />
      )}
    </div>
  );
};

const CommentItem = ({ comment, onEdit, onDelete }) => (
  <div className="p-2 border rounded-md bg-gray-50 border-none shadow-sm mx-2">
    <div className="w-full flex justify-between ">
      <div
        dangerouslySetInnerHTML={{ __html: comment.comment }}
        className="text-gray-800 text-sm"
      />
      <div className="flex space-x-2 mt-2">
        <button
          onClick={onEdit}
          className="text-yellow-500 hover:text-yellow-700"
        >
          <Edit size={16} />
        </button>
        <button onClick={onDelete} className="text-red-500 hover:text-red-700">
          <Trash size={16} />
        </button>
      </div>
    </div>
  </div>
);

export const CommentModal = ({ comment, onClose, onSubmit }) => {
  // const [content, setContent] = useState(comment ? comment.comment : "");
  const editorRef = useRef(null);

  const saveCursorPosition = () => {
    const selection = window.getSelection();
    if (selection && selection.rangeCount > 0) {
      return selection.getRangeAt(0);
    }
    return null;
  };

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
    if (editorRef.current && comment?.comment) {
      editorRef.current.innerHTML = comment.comment || "";
    }
    restoreCursorPosition(range);
  }, [comment]);

  const applyStyle = (style, value = null) => {
    document.execCommand(style, false, value);
  };

  const handleSubmit = () => {
    onSubmit(editorRef.current.innerHTML);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-8 rounded-md w-3/4 md:w-1/2">
        <h2 className="text-2xl font-semibold mb-4">
          {comment ? "Edit Comment" : "New Comment"}
        </h2>
        <div className="border rounded-md shadow-sm p-4 bg-white mb-4">
          <Toolbar applyStyle={applyStyle} />
          <div
            ref={editorRef}
            contentEditable
            // onInput={(e) => setContent(e.target.innerHTML)}
            className="min-h-[200px] mt-4 focus:outline-none p-2 border rounded-md bg-white"
          />
        </div>
        <div className="flex justify-end space-x-4">
          <button
            onClick={onClose}
            className="bg-gray-300 text-black px-4 py-2 rounded-md"
          >
            Cancel
          </button>
          <button
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

export default CommentList;
