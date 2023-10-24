import express from 'express';
import * as todos from './todos.js';
import * as users from './users.js';

const router = express.Router();

router.get('/todos', todos.list);
router.post('/todos', todos.create);
router.get('/todos/:id', todos.read);
router.post('/todos/:id', todos.update);
router.delete('/todos/:id', todos.deleteTodo);
router.post('/users/authenticate', users.authenticate);
router.get('/', users.getAll);

function authenticate(req, res, next) {
    console.log('routes user auth function called')
    User.authenticate(req.body)
        .then(user => res.json(user))
        .catch(next);
}

export default router;