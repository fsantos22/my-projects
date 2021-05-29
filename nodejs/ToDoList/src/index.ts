import app from "./app";
import createUser from "./endpoints/users/createUser";
import getUserById from "./endpoints/users/getUserById";
import editUserById from "./endpoints/users/editUserById";
import createTask from "./endpoints/tasks/createTask";
import getTaskById from "./endpoints/tasks/getTaskById";
import getAllUsers from "./endpoints/users/getAllUsers";
import getUsersTasksByCreatorId from "./endpoints/tasks/getUsersTasksByCreatorId";
import getUserByNickname from "./endpoints/users/getUserByNickname";
import addResponsibleToTask from "./endpoints/tasks/addResponsibleToTask";
import getResponsiblesByTaskId from "./endpoints/tasks/getResponsiblesByTaskId";
import editTaskStatusById from "./endpoints/tasks/editTaskStatusById";
import getTasksByStatus from "./endpoints/tasks/getTasksByStatus";
import getDelayedTasks from "./endpoints/tasks/getDelayedTasks";
import deleteResponsibleFromTask from "./endpoints/tasks/deleteResponsibleFromTask";
import getTaskByTerm from "./endpoints/tasks/getTaskByTerm";
import deleteTaskById from "./endpoints/tasks/deleteTaskById";
import deleteUser from "./endpoints/users/deleteUser";
import getAllTasks from "./endpoints/tasks/getAllTasks";

app.put("/user/edit/:id", editUserById);
app.get("/user/all", getAllUsers);
app.get("/user/:id", getUserById);
app.delete("/user/:id", deleteUser);
app.post("/user", createUser);
app.get("/user", getUserByNickname);

app.delete(
  "/task/:taskId/responsible/:responsibleUserId",
  deleteResponsibleFromTask
);
app.put("/task/status/edit", editTaskStatusById);
app.get("/task/:id/responsible", getResponsiblesByTaskId);
app.get("/task/all", getAllTasks);
app.get("/task/delayed", getDelayedTasks);
app.post("/task/responsible", addResponsibleToTask);
app.delete("/task/:id", deleteTaskById);
app.get("/task/:id", getTaskById);
app.post("/task", createTask);
app.get("/task", getTaskByTerm);
app.get("/task", getTasksByStatus);
app.get("/task", getUsersTasksByCreatorId);
