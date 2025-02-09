import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: { type: String, unique: true },
  mobileNumber: String,
  password: String,
});

const User = mongoose.model('User', userSchema);
export default User;  // Use default export here
