import express from "express";

const UserController = require('./UserController');

const router = express.Router();

router.post('/login', UserController.login);
router.post('/register', UserController.createUser);

module.exports = router;