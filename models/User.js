import mongoose from 'mongoose';
import validator from 'validator';
import bcrypt from 'bcrypt';

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'name should not be empty'],
    },
    email: {
      type: String,
      required: [true, 'email should not be empty'],
      unique: true,
      lowercase: true,
      validate: [validator.isEmail, 'please provide a correct email'],
    },
    role: {
      type: String,
      enum: ['admin', 'user'],
      default: 'user',
    },
    password: {
      type: String,
      required: true,
      min: 8,
      select: false,
    },
    confirmPassword: {
      type: String,
      required: [true, 'please confirm password'],
      validate: {
        validator: function (val) {
          return val === this.password;
        },
        message: 'password do not match',
      },
    },
    photo: String,
    passwordUpdatedAt: Date,
    resetPasswordToken: String,
    resetPasswordExpires: Date,
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 10);
  this.confirmPassword = undefined;
  next();
});

userSchema.pre('save', async function (next) {
  if (!this.isModified('password') || this.isNew) return next();
  this.passwordUpdatedAt = Date.now() - 500;
  next();
});

userSchema.methods.correctPassword = async function (
  passwordFromInput,
  passwordFromDb
) {
  return await bcrypt.compare(passwordFromInput, passwordFromDb);
};

userSchema.methods.isPasswordUpdated = function (jwtTime) {
  if (this.passwordUpdatedAt) {
    const updatedAt = parseInt(this.passwordUpdatedAt.getTime() / 1000, 10);
    return jwtTime < updatedAt;
  }
  return false;
};

const User = mongoose.model('User', userSchema);

export default User;
