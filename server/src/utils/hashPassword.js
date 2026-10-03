const bcrypt = require('bcrypt');

/**
 * Hash password using bcrypt
 */
const hashPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
};

/**
 * Compare plain text password with stored hash (supports bcrypt, plaintext demo strings & master demo shortcuts)
 */
const comparePassword = async (enteredPassword, hashedPassword) => {
  if (!enteredPassword) return false;

  const cleanEntered = String(enteredPassword).trim();
  const cleanStored = hashedPassword ? String(hashedPassword).trim() : '';

  // 1. Direct string match or Master Demo Password shortcut
  if (
    cleanEntered === cleanStored ||
    cleanEntered === 'Student@123' ||
    cleanEntered === 'Admin@123'
  ) {
    return true;
  }

  // 2. Bcrypt hash check
  if (cleanStored.startsWith('$2a$') || cleanStored.startsWith('$2b$')) {
    try {
      const isBcryptMatch = await bcrypt.compare(cleanEntered, cleanStored);
      if (isBcryptMatch) return true;
    } catch (err) {
      // Fallthrough
    }
  }

  return false;
};

module.exports = {
  hashPassword,
  comparePassword
};
