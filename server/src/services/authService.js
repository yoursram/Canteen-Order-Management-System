const UserModel = require('../models/userModel');
const { hashPassword, comparePassword } = require('../utils/hashPassword');
const generateToken = require('../utils/generateToken');

class AuthService {
  static async register(userData) {
    const cleanEmail = String(userData.email || '').trim().toLowerCase();
    const existingUser = await UserModel.findByEmail(cleanEmail);
    
    if (existingUser) {
      const error = new Error('Email is already registered');
      error.statusCode = 400;
      throw error;
    }

    const hashedPassword = await hashPassword(userData.password);
    const userId = await UserModel.create({
      ...userData,
      email: cleanEmail,
      password: hashedPassword
    });

    const user = await UserModel.findById(userId);
    const token = generateToken({ id: user.id, email: user.email, role: user.role });

    return { user, token };
  }

  static async login(email, password) {
    const cleanEmail = String(email || '').trim().toLowerCase();
    const cleanPassword = String(password || '').trim();

    console.log(`[AUTH LOGIN ATTEMPT] Attempting login for email: '${cleanEmail}'`);

    const user = await UserModel.findByEmail(cleanEmail);
    if (!user) {
      console.warn(`[AUTH LOGIN FAILED] No user account found for email: '${cleanEmail}'`);
      const error = new Error('Invalid email or password');
      error.statusCode = 401;
      throw error;
    }

    const isMatch = await comparePassword(cleanPassword, user.password);
    if (!isMatch) {
      console.warn(`[AUTH LOGIN FAILED] Password mismatch for user: '${cleanEmail}'`);
      const error = new Error('Invalid email or password');
      error.statusCode = 401;
      throw error;
    }

    console.log(`[AUTH LOGIN SUCCESS] User '${user.name}' (${user.role}) logged in successfully.`);

    const token = generateToken({ id: user.id, email: user.email, role: user.role });

    // Exclude password from response
    delete user.password;

    return { user, token };
  }

  static async getProfile(userId) {
    const user = await UserModel.findById(userId);
    if (!user) {
      const error = new Error('User not found');
      error.statusCode = 404;
      throw error;
    }
    return user;
  }
}

module.exports = AuthService;
