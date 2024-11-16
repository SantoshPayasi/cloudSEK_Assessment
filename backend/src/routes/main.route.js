import express from "express"
import commentsRouter from "./customRoutes/comments.route.js";
import postsRouter from "./customRoutes/posts.route.js";

const mainRouter = express.Router();


mainRouter.use("/posts", postsRouter);
mainRouter.use("/comments", commentsRouter);


export default mainRouter