const jwt = require('jsonwebtoken');

const mongoose = require('mongoose');

const isValidAuthToken = async (req, res, next, { userModel, jwtSecret = 'JWT_SECRET' }) => {
  try {
    const UserPassword = mongoose.model(userModel + 'Password');
    const User = mongoose.model(userModel);
    //const token = req.cookies.token;
    // if (!token)
    //   return res.status(401).json({
    //     success: false,
    //     result: null,
    //     message: 'No authentication token, authorization denied.',
    //     jwtExpired: true,
    //   });

    //const verified = jwt.verify(token, process.env[jwtSecret]);

    // if (!verified)
    //   return res.status(401).json({
    //     success: false,
    //     result: null,
    //     message: 'Token verification failed, authorization denied.',
    //     jwtExpired: true,
    //   });
    //verified.id='66dec1b4177ec796880f8f39';
    const userPasswordPromise = UserPassword.findOne({ user: '66dec1b4177ec796880f8f39', removed: false });
    const userPromise = User.findOne({ _id: '66dec1b4177ec796880f8f39', removed: false });

    const [user, userPassword] = await Promise.all([userPromise, userPasswordPromise]);

    if (!user)
      return res.status(401).json({
        success: false,
        result: null,
        message: "User doens't Exist, authorization denied.",
        jwtExpired: true,
      });

    //const { loggedSessions } = userPassword;
    // if (!loggedSessions.includes(token))
    //   return res.status(401).json({
    //     success: false,
    //     result: null,
    //     message: 'User is already logout try to login, authorization denied.',
    //     jwtExpired: true,
    //   });
    // else {
    //   const reqUserName = userModel.toLowerCase();
    //   req[reqUserName] = user;
    //   next();
    // }
     const reqUserName = userModel.toLowerCase();
     req[reqUserName] = user;
     next();
  } catch (error) {
    return res.status(503).json({
      success: false,
      result: null,
      message: error.message,
      error: error,
      controller: 'isValidAuthToken',
    });
  }
};

module.exports = isValidAuthToken;
