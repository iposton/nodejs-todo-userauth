import { v4 as uuid } from "uuid";
import MapStore from "../maps/mapstore.js";


// Todo {
//  id: string
//  task: string
//  completed: boolean
//  belongsToID: string
//  lastEdited: Date
// }
const TODOS = new Map();
const store = new MapStore("todos.json");

store.read().then(
  (todos) => {
    for (let [id, todo] of todos) {
      TODOS.set(id, todo);
    }
  },
  (err) => {
    console.error(err);
  }
);

export function getTodos(sort) {
  let todos = Array.from(TODOS.values());
  let seconds = (date) => (new Date(date).getTime() / 1000)
  todos.sort((a, b) => {
    if (sort === "asc") {
        return seconds(a.lastEdited) - seconds(b.lastEdited);
    } else {
        return seconds(b.lastEdited) - seconds(a.lastEdited);
    }
  });
  return todos
}

export async function createTodo({ task, completed, belongsToID }) {
    const id = uuid();
    const lastEdited = new Date();
    const todo = {
      id,
      task,
      completed,
      belongsToID,
      lastEdited
    };
    TODOS.set(id, todo);
    await store.save(TODOS);
    return todo;
}

export async function updateTodo(id, { task, completed, belongsToID }) {
    if (!TODOS.has(id)) {
      return null;
    }
    const todo = TODOS.get(id);
    todo.task = task ?? todo.task;
    todo.completed = completed ?? todo.completed;
    todo.belongsToID = belongsToID ?? todo.belongsToID;
    todo.lastEdited = new Date();
    await store.save(TODOS);
    return { ...todo };
}

export function getTodo(id) {
    if (!TODOS.has(id)) {
      return null;
    }
    const todo = TODOS.get(id);
    return { ...todo };
}

export async function deleteTodo(id) {
    const success = TODOS.delete(id);
    await store.save(TODOS);
    return success;
}