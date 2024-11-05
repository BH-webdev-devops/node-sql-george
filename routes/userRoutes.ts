import { Router } from "express";
import { getUsers, createUser, updateUser, deleteUser, getUserById } from "../controllers/userController";

const userRouter: Router = Router();

userRouter.get("/users", getUsers);
userRouter.get("/users/:id", getUserById);
userRouter.post("/users", createUser);
userRouter.put("/users/:id", updateUser);
userRouter.delete("/users/:id", deleteUser);

export default userRouter;
