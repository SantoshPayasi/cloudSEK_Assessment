import { Edit, Trash } from "lucide-react";



const CommentList = ({
    comments,
    editingCommentId,
    setEditingCommentId,
    editedContent,
    setEditedContent,
    handleEditComment,
    handleSaveEdit,
    handleDeleteComment,
  }) => (
    <div className="space-y-4">
      {comments.map((comment) => (
        <div key={comment._id} className="p-2 border rounded-md bg-gray-100 shadow-sm">
          {editingCommentId === comment._id ? (
            <div
              contentEditable
              className="text-gray-800 bg-white h-10 text-md"
              suppressContentEditableWarning={true}
              onInput={(e) => setEditedContent(e.target.innerHTML)}
              dangerouslySetInnerHTML={{ __html: editedContent }}
            ></div>
          ) : (
            <div dangerouslySetInnerHTML={{ __html: comment.comment }} className="text-gray-800 text-sm" />
          )}
  
          <p className="text-xs text-gray-500 mt-1">
            {new Date(comment.createdAt).toLocaleString()}
          </p>
  
          <div className="flex space-x-2 mt-2">
            {editingCommentId === comment._id ? (
              <>
                <button onClick={() => handleSaveEdit(comment._id)} className="text-blue-500 hover:text-blue-700">
                  Save
                </button>
                <button onClick={() => setEditingCommentId(null)} className="text-gray-500 hover:text-gray-700">
                  Cancel
                </button>
              </>
            ) : (
              <>
                <button onClick={() => handleEditComment(comment._id, comment.comment)} className="text-yellow-500 hover:text-yellow-700">
                  <Edit size={16} />
                </button>
                <button onClick={() => handleDeleteComment(comment._id)} className="text-red-500 hover:text-red-700">
                  <Trash size={16} />
                </button>
              </>
            )}
          </div>
        </div>
      ))}
    </div>
  );


export default CommentList;