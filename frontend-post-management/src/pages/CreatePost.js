import { useState } from "react";
import Header from "../components/Header";
import Toolbar from "../components/Toolbar";
import Editor from "../components/Editor";
import { createPost } from "../api/post.apicall";

const CreatePost = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [innerHTMLs, setInnerHTMLs] = useState({
    title:"",
    content:""
  })


  const handleTitleChange = (e) => {
    setTitle(e.target.value);
    setInnerHTMLs({
      ...innerHTMLs,
      title: e.target.value
    })
  };

  const handleContentChange = (e) => {
    setContent(e.target.value);
    setInnerHTMLs({
      ...innerHTMLs,
      content: e.target.innerHTML
    })
  };

  const applyStyle = (style, value = null) => {
    document.execCommand(style, false, value);
  };

  const handleSubmit = () => {
    const post = {
        title : innerHTMLs.title, 
        description: innerHTMLs.content
    }
    console.log(post);
    handleCreatePost(post)
  };


  const handleCreatePost = async(data) =>{
    try {
        const response = await createPost(data)
        console.log(response)
    } catch (error) {
        console.log(error)
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
