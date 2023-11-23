import asyncHandler from 'express-async-handler';
import UserModel from '../models/userModel.js';
import { validatePassword } from '../utils/passwordUtils.js';
import generateToken from '../utils/generateToken.js';

//Login user
const authUser = asyncHandler(async (req, res) => {
  const { feEmail, fePassword } = req.body;
});

//Create user and redirect to dashboard
const createUser = asyncHandler(async (req, res) => {
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

  const isEmailExist = await UserModel.findOne({ feEmail });

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

  const createdUser = await UserModel.create({
    fname: feFname,
    mname: feMname,
    lname: feLname,
    gender: feGender,
    birthDate: feBirthdate,
    //User Account Information
    email: feEmail,
    password: fePassword, // hashpassword
  });

  if (createdUser) {
    generateToken(res, createdUser._id);
    res.status(200).json({ createdUser });
  } else {
    res.status(400);
    throw new Error('Error creating the account');
  }
});

export { authUser, createUser };
