import express from "express";
import * as todos from "./todos.js";

const router = express.Router();

router.get("/todos", todos.list);
router.post("/todos", todos.create);
router.get("/todos/:id", todos.read);
router.post("/todos/:id", todos.update);
router.delete("/todos/:id", todos.deleteTodo);

export default router;