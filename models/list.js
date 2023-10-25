import { v4 as uuid } from "uuid";
import MapStore from "../maps/mapstore.js";


// List {
//  id: string
//  name: string
//  lastEdited: Date
// }
const LISTS = new Map();
const store = new MapStore("lists.json");

store.read().then(
  (lists) => {
    for (let [id, list] of lists) {
      LISTS.set(id, list);
    }
  },
  (err) => {
    console.error(err);
  }
);

export function getLists(sort) {
  let lists = Array.from(LISTS.values());
  let seconds = (date) => (new Date(date).getTime() / 1000)
  lists.sort((a, b) => {
    if (sort === "asc") {
        return seconds(a.lastEdited) - seconds(b.lastEdited);
    } else {
        return seconds(b.lastEdited) - seconds(a.lastEdited);
    }
  });
  return lists
}

export async function createList({ name }) {
    const id = uuid();
    const lastEdited = new Date();
    const list = {
      id,
      name,
      lastEdited
    };
    LISTS.set(id, list);
    await store.save(LISTS);
    return list;
}

export async function updateList(id, { name }) {
    if (!LISTS.has(id)) {
      return null;
    }
    const list = LISTS.get(id);
    list.name = name ?? list.name;
    list.lastEdited = new Date();
    await store.save(LISTS);
    return { ...list };
}

export function getList(id) {
    if (!LISTS.has(id)) {
      return null;
    }
    const list = LISTS.get(id);
    return { ...list };
}

export async function deleteList(id) {
    const success = LISTS.delete(id);
    await store.save(LISTS);
    return success;
}