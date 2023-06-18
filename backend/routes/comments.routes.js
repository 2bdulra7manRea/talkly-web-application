const CommentController = require("../controller/comment.controller");
const CommentService = require("../services/comment.service");
const Routing = require("../services/Routing.service");



const commentRouter = (app) => {


const commentService= new CommentService();


const commentController = new CommentController(commentService);


    const route = new Routing(app);
    route.post("/comments/new", commentController.create.bind(commentController));
    route.get("/comments/", commentController.get.bind(commentController));
    route.get("/comments/user", commentController.getUserComments.bind(commentController));
    route.get("/comments/:id/count", commentController.getCount.bind(commentController));
    route.patch('/comments/:id',commentController.updateComment.bind(commentController))
  };
  
  module.exports = { commentRouter };
  
