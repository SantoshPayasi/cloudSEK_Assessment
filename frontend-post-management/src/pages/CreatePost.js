import { useState } from "react";
import Header from "../components/Header";
import Toolbar from "../components/EditorToolbar";
import Editor from "../components/Editor";
import { createPost } from "../api/post.apicall";
import StatusCodeUtility from "../utils/statusCode.Utility";
import { toast } from "react-toastify";

const CreatePost = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [innerHTMLs, setInnerHTMLs] = useState({
    title:"",
    content:"",
    description:""
  })


  const handleTitleChange = (e) => {
    setTitle(e.target.value);
    setInnerHTMLs({
      ...innerHTMLs,
      title: e.target.value
    })
  };

  const handleContentChange = (e) => {
    console.log(e.target.innerHTML, e.target.innerText, e.target.value)
    setContent(e.target.value);
    setInnerHTMLs({
      ...innerHTMLs,
      content: e.target.innerHTML,
      description: e.target.innerText
    })
  };

  const applyStyle = (style, value = null) => {
    document.execCommand(style, false, value);
  };

  const handleSubmit = () => {
    const post = {
        title : innerHTMLs.title, 
        description: innerHTMLs.description,
        innerHTML:innerHTMLs.content
    }
    console.log(post)
    handleCreatePost(post)
  };


  const handleCreatePost = async(data) =>{
    try {
        const response = await createPost(data)
         if(response.status === StatusCodeUtility.Success){
          toast.success(response.data.message || "post created successfully")
         }
         toast.error(response.data.message || "something went wrong")
    } catch (error) {
         toast.error(error.response.message|| error.response.data.message|| error.message || "something went wrong")
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="container mx-auto mt-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          <input
            type="text"
            placeholder="Post Title"
            value={title}
            onChange={handleTitleChange}
            className="w-full p-2 border rounded-md text-lg font-semibold"
          />
          <div className="border rounded-md shadow-sm p-4 bg-white">
            <Toolbar applyStyle={applyStyle} />
            <Editor onContentChange={handleContentChange} content={content} />
          </div>
          <button type="button" className="bg-blue-600 text-white px-4 py-2 rounded-md" onClick={handleSubmit}>
            Create Post
          </button>
        </form>
      </main>
    </div>
  );
};

export default CreatePost;
