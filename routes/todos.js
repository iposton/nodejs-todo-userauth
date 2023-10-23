import * as Todo from "../models/todo.js";

export function list(req, res) {
    let { sort } = req.query;
    sort = sort ? sort.toLowerCase() : "desc";
    if (!(sort === "asc" || sort === "desc")) {
      return res.status(400).send("Invalid sort Params");
    }
    const todos = Todo.getTodos(sort);
    res.json( todos );
}

export async function create(req, res) {
    console.log(req.body, 'req.body')
    const { task, completed } = req.body;
    console.log(`${task} task received and is completed? ${completed}`);
    if (task === undefined || completed === undefined) {
      return res.status(400).send("Missing todo");
    }
    const todo = await Todo.createTodo({ task, completed });
    console.log({ todo });
    res.json({message: 'ok', status: 200});
}
  
export function read(req, res) {
  const { id } = req.params;
  const todo = Todo.getTodo(id);
  res.json({ todo });
}

export async function update(req, res) {
  const { id } = req.params;
  const { task, completed } = req.body;
  if (task === undefined && completed === undefined) {
    return res.status(400).send("Missing todo");
  }
  const todo = await Todo.updateTodo(id, { task, completed });
  console.log({ todo });
  console.log(`updating ${id} with this ${todo.task} completed status ${completed}`);
  res.send({message: 'ok', status: 200});
}

export async function deleteTodo(req, res) {
  const { id } = req.params;
  const success = await Todo.deleteTodo(id);
  console.log(`deleting ${id}`, success);
  res.send({message: 'ok', status: 200});
}