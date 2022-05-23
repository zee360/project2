const UserModel = require('../db/models/user.model');

const createUser = async (user) => {
  try {
    return await UserModel.create(user);
  } catch (e) {
    throw new Error(e.message);
  }
};

const updateUser = async (userId, data) => {
  try {
    return await UserModel.findByIdAndUpdate(
      userId,
      {
        $set: data,
      },
      { new: true }
    );
  } catch (e) {
    throw new Error(e.message);
  }
};

const getUser = async (userId) => {
  try {
    return await UserModel.findById(userId);
  } catch (e) {
    throw new Error(e.message);
  }
};

const getUsers = async (filter) => {
  try {
    return await UserModel.find(filter);
  } catch (e) {
    throw new Error(e.message);
  }
};
const getUserByEmail = async (email) => {
  return await UserModel.findOne({ email });
}

module.exports = {
  createUser,
  updateUser,
  getUser,
  getUsers,
  getUserByEmail
};
