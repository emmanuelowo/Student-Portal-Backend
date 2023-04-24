const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { MongoMemoryServer } = require('mongodb-memory-server');
const Users = require("../models/users.model");
const usersController = require('../controllers/users.controllers');


// connection to mongoose
const mongoCon = "mongodb+srv://studentPortal:studentPortal@cluster0.6oc4zjr.mongodb.net/student-portal?retryWrites=true&w=majority&ssl=true";


mongoose
  .connect(mongoCon, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("database connected"))
  .catch((err) => console.error("database connection failed", err));

describe('Register User', () => {
    it('should register a new user', async () => {
        const req = {
          body: {
            email: 'qweqwe13321@example.com',
            password: 'password123',
          },
        };
        const res = {
          status: jest.fn().mockReturnThis(),
          send: jest.fn(),
        };
    
        await usersController.registerUser(req, res);
        expect(res.status).not.toHaveBeenCalledWith(409);
        expect(res.send).toHaveBeenCalledWith({ success: true, message: 'Signup successful' });
      });

      it('should not register a user with an existing email', async () => {
        const req = {
          body: {
            email: 'hash1@example.com',
            password: 'password123',
          },
        };
        const res = {
          status: jest.fn().mockReturnThis(),
          send: jest.fn(),
        };
    
        await usersController.registerUser(req, res);
        await usersController.registerUser(req, res);
        expect(res.status).toHaveBeenCalledWith(409);
        expect(res.send).toHaveBeenCalledWith({ success: false, message: 'Email already in use' });
      });
});

describe('Login User', () => {
    it('should log in a user with correct credentials', async () => {
        const req = {
          body: {
            email: 'usmanmalik5361008@gmail.com',
            password: '123456789',
          },
        };
        const res = {
          status: jest.fn().mockReturnThis(),
          send: jest.fn(),
        };
    
        await usersController.loginUser(req, res);
        expect(res.status).not.toHaveBeenCalledWith(401);
        expect(res.send).toHaveBeenCalled();
      });

  it('should not log in a non-existent user', async () => {
    const req = {
        body: {
          email: '222@example.com',
          password: 'www',
        },
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        send: jest.fn(),
      };
  
      await usersController.loginUser(req, res);
      expect(res.status).toHaveBeenCalledWith(401);
      expect(res.send).toHaveBeenCalledWith({
        success: false,
        error: 'This user doesnot exists. Please signup first',
      });  
    });

  it('should not log in a user with incorrect password', async () => {
    const req = {
      body: {
        email: 'existinguser@example.com',
        password: '0000',
      },
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
    };

    await usersController.loginUser(req, res);
    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.send).toHaveBeenCalledWith({
      message: 'Wrong email or Password',
      success: true,
    });
  });
});