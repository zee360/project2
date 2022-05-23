const userService = require('../services/user.service');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const registerUser = async (req, res) => {
  const data = req.body;
  try {
    if (await userService.getUserByEmail(data.email)) {
      return res.sendStatus(409);
    }
    data.password = await bcrypt.hash(data.password, 10);
    const user = await userService.createUser(data);
    if (user) {
      res.json(user);
    } else {
      console.log('Invalid user');
      res.sendStatus(400);
    }
  } catch (e) {
    console.log(e.message);
    res.sendStatus(500);
  }
};

const loginUser = async (req, res) => {
  const data = req.body;

  try {
    const user = await userService.getUserByEmail(data.email);
    if (!user) {
      return res.sendStatus(404);
    }

    const isPasswordValid = await bcrypt.compare(data.password, user.password);
    if (!isPasswordValid) {
      return res.sendStatus(401);
    }
    // create jwt
    jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      {
        expiresIn: 31556926, // 1 year in seconds
      },
      (err, token) => {
        if (err) {
          throw err;
        }
        user.password = undefined
        res.json({
          ...user.toObject(),
          accessToken: token,
        });
      }
    );
  } catch (e) {
    console.log(e.message);
    res.sendStatus(500);
  }
};

const updateUser = async (req, res) => {
  const { userId, ...data } = req.body;
  try {
    if('password' in data) {
      data.password = await bcrypt.hash(data.password, 10);
    }
    const product = await userService.updateUser(userId, data);
    if (product) {
      res.json(product);
    } else {
      res.sendStatus(404);
    }
  } catch (e) {
    console.log(e.message);
    res.sendStatus(500);
  }
};

const getUser = async (req, res) => {
  const { userId } = req.params;
  try {
    const user = await userService.getUser(userId);
    if (user && user.isActive) {
      user.password = undefined;

      res.json(user);
    } else {
      res.sendStatus(404);
    }
  } catch (e) {
    console.log(e.message);
    res.sendStatus(500);
  }
};

const getUsers = async (req, res) => {
  try {
    const users = await userService.getUsers({ isActive: true }, {password: 0});
    if (users.length > 0) {
      res.json(users);
    } else {
      res.sendStatus(404);
    }
  } catch (e) {
    console.log(e.message);
    res.sendStatus(500);
  }
};

module.exports = {
  registerUser,
  loginUser,
  updateUser,
  getUser,
  getUsers
};
