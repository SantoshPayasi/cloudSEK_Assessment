
import EditorToolbar from "./EditorToolbar";

const NewCommentToolbar = ({ newComment, setNewComment, handleNewComment }) => {
  return (
    <div className="border p-2 h-40 mb-5">
      <h3>Add new Comment</h3>
      <EditorToolbar />

      <div className="flex items-center gap-2 py-4">
        <div
          contentEditable
          className="flex-1 p-2 border rounded-md bg-gray-50 focus:outline-none min-h-[40px] max-h-[80px] overflow-auto"
          placeholder="Write a comment..."
          onInput={(e) => setNewComment(e.target.innerHTML)}
        ></div>
        <button
          onClick={handleNewComment}
          className="bg-blue-600 text-white px-4 py-1 rounded-md"
        >
          Add
        </button>
      </div>
    </div>
  );
};

export default NewCommentToolbar;
