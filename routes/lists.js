import * as List from "../models/list.js";

export function list(req, res) {
    let { sort } = req.query;
    sort = sort ? sort.toLowerCase() : "desc";
    if (!(sort === "asc" || sort === "desc")) {
      return res.status(400).send("Invalid sort Params");
    }
    const lists = List.getLists(sort);
    res.json( lists );
}

export async function create(req, res) {
    console.log(req.body, 'req.body')
    const { name } = req.body;
    console.log(`${name} list received`);
    if (name === undefined) {
      return res.status(400).send("Missing list");
    }
    const list = await List.createList({ name });
    console.log({ list });
    res.json({message: 'ok', status: 200});
}
  
export function read(req, res) {
  const { id } = req.params;
  const list = List.getList(id);
  res.json({ list });
}

export async function update(req, res) {
  const { id } = req.params;
  const { name } = req.body;
  if (name === undefined) {
    return res.status(400).send("Missing List");
  }
  const list = await List.updateList(id, { name });
  console.log({ list });
  console.log(`updating ${id} with this ${list.name}`);
  res.send({message: 'ok', status: 200});
}

export async function deleteList(req, res) {
  const { id } = req.params;
  const success = await List.deleteList(id);
  console.log(`deleting ${id}`, success);
  res.send({message: 'ok', status: 200});
}