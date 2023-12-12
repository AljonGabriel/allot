import asyncHandler from 'express-async-handler';
import UserModel from '../models/userModel.js';
import { validatePassword } from '../utils/passwordUtils.js';
import { sendCodeToUserEmail } from '../utils/emailUtils.js';
import generateToken from '../utils/generateToken.js';

//Login user
const authUser = asyncHandler(async (req, res) => {
  const { feEmail, fePassword } = req.body;

  const user = await UserModel.findOne({ email: feEmail });

  if (!feEmail) {
    res.status(400);
    throw new Error('Please enter your email address');
  }

  if (!fePassword) {
    res.status(400);
    throw new Error('Please enter your password');
  }

  if (!user) {
    res.status(400);
    throw new Error('Invalid E-mail or Password');
  } else if (!(await user.matchPassword(fePassword))) {
    res.status(400);
    throw new Error('Invalid E-mail or Password');
  } else {
    generateToken(res, user._id);
    res.status(201).json({
      _id: user._id,
      fname: user.fname,
      mname: user.mname,
      lname: user.lname,
      email: user.email,
      gender: user.gender,
      birthdate: user.birthdate,
      profileImage: user.profileImage,
    });
  }
});

//Create user and redirect to dashboard
const checkInputsAndSendCode = asyncHandler(async (req, res) => {
  const {
    feFname,
    feMname,
    feLname,
    feGender,
    feBirthdate,
    feEmail,
    fePassword,
    feConfirmPwd,
  } = req.body;

  const isEmailExist = await UserModel.findOne({ email: feEmail });

  let errorsArr = {};

  const requiredNameFields = ['feFname', 'feMname', 'feLname'];
  let emptyFields = [];

  requiredNameFields.forEach((field) => {
    if (!req.body[field]) {
      errorsArr[field] = `Error ${field}`;
      emptyFields.push(field);
    }
  });

  if (emptyFields.length > 0) {
    errorsArr.fullName = `Please enter your full name`;
  }

  !feGender && (errorsArr.feGender = 'Please enter your gender');
  !feBirthdate && (errorsArr.feBirthdate = 'Please enter your birthdate');

  if (!feEmail) {
    errorsArr.feEmail = 'Please enter your e-mail';
  } else if (isEmailExist) {
    errorsArr.feEmail = 'Email already used';
  }

  const passwordValidator = validatePassword(fePassword);

  if (!fePassword) {
    errorsArr.fePassword = 'Please enter your password';
  } else if (passwordValidator) {
    errorsArr.fePassword = passwordValidator;
  }

  if (!feConfirmPwd) {
    errorsArr.feConfirmPwd = 'Please confirm your password';
  } else if (fePassword !== feConfirmPwd) {
    errorsArr.feConfirmPwd = "Password don't match";
  }

  if (Object.keys(errorsArr).length > 0) {
    return res.status(400).json({ errors: errorsArr });
  }

  const codeSent = await sendCodeToUserEmail(feFname, feLname, feEmail);

  if (codeSent) {
    // Store the code or other information in a variable
    req.session.verificationCode = codeSent;

    // Now you can redirect or send a success response
    return res.status(200).json({ codeSent: true });
  }

  // Handle the case where code is not generated
  return res.status(500).json({ error: 'Failed to send code' });
});

const verifyEmailCodeThenCreateUser = asyncHandler(async (req, res) => {
  const { feVerificationCode } = req.body;
  const storedCode = req.session.verificationCode;

  let errorsArr = {};

  setTimeout(() => {
    // Remove the session variable
    delete req.session.verificationCode;
    errorsArr.feVerificationCode = 'Code expired';
  }, 1000);

  if (!feVerificationCode) {
    res.status(400);
    errorsArr.feVerificationCode = 'Please enter the code';
  } else if (feVerificationCode === storedCode) {
    // Remove the session variable
    delete req.session.verificationCode;

    // Use the data from the registration process to create a new user document
    const {
      feFname,
      feMname,
      feLname,
      feGender,
      feBirthdate,
      feEmail,
      fePassword,
    } = req.body;

    // Assuming UserModel is your Mongoose model
    const newUser = new UserModel({
      fname: feFname,
      mname: feMname,
      lname: feLname,
      gender: feGender,
      birthdate: feBirthdate,
      email: feEmail,
      password: fePassword, // You might want to hash the password before saving
    });

    try {
      // Save the user to the database
      const savedUser = await newUser.save();
      generateToken(res, savedUser._id);

      // Respond with success or redirect the user
      res.status(200).json({
        _id: savedUser._id,
        fname: savedUser.fname,
        mname: savedUser.mname,
        lname: savedUser.lname,
        email: savedUser.email,
        gender: savedUser.gender,
        birthdate: savedUser.birthdate,
        profileImage: null,
      });
    } catch (error) {
      // Handle database save error
      res
        .status(500)
        .json({ verificationResult: 'failure', error: 'Failed to save user' });
    }
  } else {
    // Verification failed, handle accordingly
    errorsArr.feVerificationCode = 'Invalid Code';
  }

  if (Object.keys(errorsArr).length > 0) {
    return res.status(400).json({ errors: errorsArr });
  }
});

const logout = asyncHandler(async (req, res) => {
  res.cookie('jwt', '', { httpOnly: true, expires: new Date() });

  res.status(200).json({ message: 'Successfully logout' });
});

const search = asyncHandler(async (req, res) => {
  const { key, limit } = req.query;

  if (key) {
    const users = await UserModel.find({
      fname: { $regex: `^${key}`, $options: 'i' },
    }).limit(parseInt(limit));

    console.log(key);
    // Return the search results
    res.json(users);
  }
});

export {
  authUser,
  checkInputsAndSendCode,
  verifyEmailCodeThenCreateUser,
  logout,
  search,
};
