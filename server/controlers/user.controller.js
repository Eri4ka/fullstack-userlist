const path = require('path');

const JsonService = require('../services/json.service');

const usersPath = path.resolve(__dirname, '../data/users.json');
const jsonService = new JsonService(usersPath);

class UserController {
  async getUsers(req, res) {
    try {
      const users = await jsonService.getData();
      res.json({ status: 'success', data: users })
    } catch (e) {
      res.json({ status: 'error', message: e })
    }
  }

  async getSingleUser(req, res) {
    const { userId } = req.params;

    try {
      const user = await jsonService.getSingleData(userId);

      if (user) {
        res.json({ status: 'success', data: user })
      } else {
        res.status(404).json({ status: 'error', message: `User doesn't exists with id: ${userId}` })
      }
    } catch (e) {
      res.json({ status: 'error', message: e })
    }
  }

  async createUser(req, res) {
    const requestBody = req.body;

    if (!requestBody.name) {
      return res.status(404).json({ status: 'error', message: 'Field {{name}} is required' });
    }

    try {
      const user = await jsonService.createData(requestBody);
      res.json({ status: 'success', data: user })
    } catch (e) {
      res.json({ status: 'error', message: e })
    }
  }

  async deleteUser(req, res) {
    const { userId } = req.params;

    try {
      await jsonService.deleteData(userId);
      res.json({ status: 'success', data: userId });
    } catch (e) {
      res.json({ status: 'error', message: e });
    }
  }

  async editUser(req, res) {
    const { id, ...requestBody} = req.body;

    if (!id) {
      return res.status(404).json({ status: 'error', message: 'Field {{id}} is required' });
    }

    for (let key in requestBody) {
      if (!requestBody[key]) {
        return res.status(403).json({ status: 'error', message: `Field ${key} shouldn't be empty` });
      }
    }

    try {
      const user = await jsonService.editData({ id, data: requestBody});
      res.json({ status: 'success', data: user })
    } catch (e) {
      res.json({ status: 'error', message: e })
    }
  }

  async searchUser(req, res, next) {
    if (req.query['q']) {
      try {
        const users = await jsonService.searchData(req.query['q']);
        res.json({ status: 'success', data: users });
      } catch (e) {
        res.json({ status: 'error', message: e });
      };
    } else {
      next();
    }
  }
}

module.exports = new UserController();