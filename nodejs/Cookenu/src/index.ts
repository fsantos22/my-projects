import app from './app';
import signUp from './endpoints/signUp';
import login from './endpoints/login';
import userProfile from './endpoints/userProfile';
import followUser from './endpoints/followUser';
import addRecipe from './endpoints/addRecipe';
import editRecipe from "./endpoints/editRecipe";
import feed from './endpoints/feed';
import getProfile from './endpoints/getProfile';
import getRecipe from './endpoints/getRecipe';
import unfollowUser from './endpoints/unfollowUser';
import deleteRecipe from './endpoints/deleteRecipe';
import deleteUser from './endpoints/deleteUser';
import resetPassword from './endpoints/resetPassword';

app.post("/signup", signUp)

app.post("/login", login);

app.get("/users/profile", userProfile)

app.post("/users/follow", followUser);

app.post("/recipes/create", addRecipe)

app.get("/users/feed", feed);

app.get("/users/:id", getProfile);

app.get("/recipes/:id", getRecipe);

app.post("/users/unfollow", unfollowUser);

app.put("/recipes/edit/:id", editRecipe);

app.delete("/recipes/delete", deleteRecipe);

app.delete("/users/delete", deleteUser);

app.put("/users/resetpassword", resetPassword)