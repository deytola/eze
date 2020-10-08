import mongoose from 'mongoose';

const SellRequestSchema = new mongoose.Schema({
  deviceName: {
    type: String,
    required: 'Device name is required',
    unique: 'Sell request already exists for this device',
  },
  pricing: Array,
  requestType: {
    type: String,
    required: 'Request type is required',
  },
  created: {
    type: Date,
    default: Date.now,
  },
  updated: Date,
  image: String,
});

export default mongoose.model('SellRequest', SellRequestSchema);
