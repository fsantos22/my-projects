import app from "./app";
import { postsRouter } from "./routes/postsRouter";
import { usersRouter } from './routes/usersRouter';

app.use("/users", usersRouter)

app.use("/posts", postsRouter);