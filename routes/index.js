import express from 'express';
import * as todos from './todos.js';
import * as lists from './lists.js';
import * as users from './users.js';

const router = express.Router();

router.get('/todos', todos.list);
router.post('/todos', todos.create);
router.get('/todos/:id', todos.read);
router.post('/todos/:id', todos.update);
router.delete('/todos/:id', todos.deleteTodo);

router.get('/lists', lists.list);
router.post('/lists', lists.create);
router.get('/lists/:id', lists.read);
router.post('/lists/:id', lists.update);
router.delete('/lists/:id', lists.deleteList);

router.post('/users/authenticate', users.authenticate);
router.get('/', users.getAll);

export default router;