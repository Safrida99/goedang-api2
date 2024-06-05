const bcrypt = require('bcrypt');
const admin = require('../config/firebase-config.js');
const userRepository = require('../repository/userRepository.js');
const { ValidationError } = require('../util/appError.js');

// register user
class authController {
  async signup(req, res) {
    try {
      const { name, businessType, phoneNumber, email, password, } = req.body;

      // validation
      if (!name) {
        throw new ValidationError('Name is required.');
      }
      if (!businessType) {
        throw new ValidationError('Business Type is required.');
      }
      if (!phoneNumber) {
        throw new ValidationError('Phone Number is required.');
      }
      if (!email) {
        throw new ValidationError('Email is required.');
      }
      if (!password) {
        throw new ValidationError('Password is required.');
      }
      if (password.length < 6) {
        res.status(400);
        throw new Error("Password must be up to 6 characters");
      }

        // Check if user email already exists
      const userExists = await userRepository.findOne({ email });
        if (userExists) {
            res.status(400);
            throw new Error("Email has already been registered");
        }

      const createdAt = new Date();
      const updatedAt = createdAt;

      // create new user
      const user = await admin.auth().createUser({
        email,
        password,
        emailVerified: true,
        displayName: name,
        disabled: false,
      });

      // save to MongoDB
      await userRepository.create({
        uid: user.uid,
        name,
        businessType,
        phoneNumber,
        email,
        password: await bcrypt.hash(password, 10),
        createdAt,
        updatedAt,
      });

      return res.status(201).json({
        status: 201,
        message: 'Account created successfully, please log in',
        user: {
          email: user.email,
          name: user.displayName,
          createdAt,
        },
      });
    } catch (error) {
      let message = 'Failed to signup, please try again.';

      if (error instanceof ValidationError) {
        message = error.message;
      } else {
        // Handle Firebase error codes
        switch (error.code) {
          case 'auth/email-already-exists':
            message = 'The email address is already in use by another account.';
            break;
          case 'auth/invalid-phone-number':
            message = 'The phone format must be +62xxxxx.';
            break;
          default:
            message = 'Failed to signup, please try again.';
        }
      }

      console.log(error);

      return res.status(400).json({
        status: 400,
        message,
      });
    }
  }
}
module.exports = new authController();
