import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import CreatePost from "./pages/CreatePost";
import './App.css';
import PostPage from "./pages/PostPage.js";


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/create-post" exact Component={CreatePost } />
        <Route path="/post/:id" exact Component={PostPage } />
      </Routes>
    </Router>
  );
}

export default App;

