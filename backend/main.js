const bodyParser = require("body-parser");
const helmet = require("helmet");
const cors = require("cors");
const { validateHeadersAuthorizationToken } = require("./middleware/apiAuth");
const { routerApp } = require("./routes/app.routes");
const { authRouter } = require("./routes/auth.routes");
const { commentRouter } = require("./routes/comments.routes");
const { eventRouter } = require("./routes/event.routes");
const { postsRouter } = require("./routes/posts.routes");
const {
  bootstrap,
  application,
  registerRoute,
  middleware
} = require("./server");
const { blogsRouter } = require("./routes/blog.routes");
const { chatRouter } = require("./routes/chat.routes");
const { elasticRouter } = require("./routes/elastic.routes");
const { config } = require("./configs");
const { likeRouter } = require("./routes/like.routes");

(async () => {
  await bootstrap(application,config.SERVER_PORT);
})();

// security
application.disable("x-powered-by");
middleware(helmet());

middleware(cors({ origin: "*" }));

middleware(bodyParser.json());
middleware(bodyParser.urlencoded({ extended: false }));
middleware(validateHeadersAuthorizationToken);
// individual routing
registerRoute(routerApp);

// Routing System for operations
postsRouter(application);
commentRouter(application);
eventRouter(application);
authRouter(application);
blogsRouter(application);
chatRouter(application);
elasticRouter(application);
likeRouter(application);