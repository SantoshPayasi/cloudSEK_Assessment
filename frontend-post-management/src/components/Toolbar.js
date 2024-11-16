import { Bold, Italic, Link } from "lucide-react";

const Toolbar = ({ applyStyle }) => (
  <div className="flex space-x-2 bg-gray-100 p-2 rounded-md shadow-sm">
    <button
      type="button" // Prevents form submission
      onClick={() => applyStyle("bold")}
      className="px-2 py-1 border"
    >
      <Bold className="h-4 w-4" />
    </button>
    <button
      type="button" // Prevents form submission
      onClick={() => applyStyle("italic")}
      className="px-2 py-1 border"
    >
      <Italic className="h-4 w-4" />
    </button>
    <button
      type="button" // Prevents form submission
      onClick={() => {
        const url = prompt("Enter the URL");
        if (url) {
          applyStyle("createLink", url)
          applyStyle("underline")
          applyStyle("italic")
        }
      }}
      className="px-2 py-1 border"
    >
      <Link className="h-4 w-4" />
    </button>
  </div>
);

export default Toolbar;
