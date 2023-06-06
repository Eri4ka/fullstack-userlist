const Router = require('express');

const UserController = require('../controlers/user.controller');

const router = new Router();

router.get('/', UserController.searchUser, UserController.getUsers);
router.get('/:userId', UserController.getSingleUser);
router.delete('/:userId', UserController.deleteUser);
router.post('/', UserController.createUser);
router.put('/', UserController.editUser);

module.exports = router;