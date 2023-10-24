import * as User from "../models/user.js";

export function authenticate(req, res, next) {
    console.log('routes user auth function called')
    User.authenticate(req.body)
        .then(user => res.json(user))
        .catch(next);
}

export function getAll(req, res, next) {
    User.getAll()
        .then(users => res.json(users))
        .catch(next);
}