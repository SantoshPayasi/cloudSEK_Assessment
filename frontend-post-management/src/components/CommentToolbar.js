import { Bold, Italic, Link } from "lucide-react";




const NewCommentToolbar = ({ newComment, setNewComment, handleNewComment }) => {
    const applyStyle = (style, value = null) => {
      document.execCommand(style, false, value);
    };
  
    return (
      <div className="border p-2 h-40 mb-5">
        <h3>Add new Comment</h3>
        <div className="flex gap-2 mb-4">
          <button className="p-2 rounded bg-gray-200 hover:bg-gray-300" onClick={() => applyStyle("bold")}>
            <Bold size={18} />
          </button>
          <button className="p-2 rounded bg-gray-200 hover:bg-gray-300" onClick={() => applyStyle("italic")}>
            <Italic size={18} />
          </button>
          <button
            className="p-2 rounded bg-gray-200 hover:bg-gray-300"
            onClick={() => {
              const url = prompt("Enter the URL");
              if (url) {
                applyStyle("createLink", url);
                applyStyle("underline")
                      };
            }}
          >
            <Link size={18} />
          </button>
        </div>
  
        <div className="flex items-center gap-2 py-4">
          <div
            contentEditable
            className="flex-1 p-2 border rounded-md bg-gray-50 focus:outline-none min-h-[40px] max-h-[80px] overflow-auto"
            placeholder="Write a comment..."
            onInput={(e) => setNewComment(e.target.innerHTML)}
          ></div>
          <button onClick={handleNewComment} className="bg-blue-600 text-white px-4 py-1 rounded-md">
            Add
          </button>
        </div>
      </div>
    );
  };
  

  export default NewCommentToolbar;