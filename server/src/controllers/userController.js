const UserModel = require('../models/userModel');
const { successResponse } = require('../utils/response');

const getAllUsers = async (req, res, next) => {
  try {
    const users = await UserModel.getAllUsers();
    return successResponse(res, 200, 'Users retrieved successfully', { users });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllUsers
};
