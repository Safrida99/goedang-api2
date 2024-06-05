const User = require('../model/userModel.js');

class UserRepository {
  async create(user) {
    const newUser = new User(user);
    await newUser.save();
  }

  async findOne(query) {
    return User.findOne(query);
  }
}

module.exports = new UserRepository();
