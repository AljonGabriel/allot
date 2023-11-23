import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = mongoose.Schema(
  {
    //User Information
    fname: {
      type: String,
      required: true,
    },
    mname: {
      type: String,
      required: true,
    },
    lname: {
      type: String,
      required: true,
    },
    gender: {
      type: String,
      required: true,
    },
    birthDate: {
      type: Date,
      required: true,
    },
    //User Account Information
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    next();
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

const UserModel = mongoose.model('Users', userSchema);

export default UserModel;
