const User = require("../models/users");

class UserDAO {
  // Obtiene un usuario por su ID
  async getUserById(userId) {
    try {
      const user = await User.findById(userId).lean();
      return user;
    } catch (error) {
      console.error("Error getting user by ID:", error.message);
      throw error;
    }
  }
}

module.exports = UserDAO;
