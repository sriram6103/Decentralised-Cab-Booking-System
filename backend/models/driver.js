import mongoose from 'mongoose';

const driverSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: { type: String, unique: true },
  mobileNumber: String,
  password: String,
  license: String,
  vehicleReg: String,
});

const Driver = mongoose.model('Driver', driverSchema);
export default Driver;  // Use default export here
