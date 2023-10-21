export function list(req, res) {
    res.json([]);
}

export async function create(req, res) {
    res.send('ok');
}
  
export function read(req, res) {
  res.json({todo: 'fold laundry', completed: false, lastEdited: new Date()});
}

export async function update(req, res) {
  res.send('ok');
}

export async function deleteTodo(req, res) {
  res.send('ok');
}