import mongoose from 'mongoose';

const customerSchema = new mongoose.Schema({
  code: {
    type: String,
    required: [true, 'Code is required'],
    unique: true,
    trim: true,
    uppercase: true,
    maxlength: [20, 'Code cannot be more than 20 characters']
  },
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true,
    maxlength: [150, 'Name cannot be more than 150 characters']
  },
  group: {
    type: String,
    trim: true,
    maxlength: [100, 'Group cannot be more than 100 characters']
  },
  city: {
    type: String,
    trim: true,
    maxlength: [100, 'City cannot be more than 100 characters']
  },
  state: {
    type: String,
    trim: true,
    maxlength: [100, 'State cannot be more than 100 characters']
  },
  region: {
    type: String,
    trim: true,
    maxlength: [100, 'Region cannot be more than 100 characters']
  },
  stateCode: {
    type: String,
    trim: true,
    uppercase: true,
    maxlength: [10, 'State Code cannot be more than 10 characters']
  },
  email: {
    type: String,
    trim: true,
    lowercase: true,
    match: [/^\S+@\S+\.\S+$/, 'Please provide a valid email address']
  },
  phone: {
    type: String,
    trim: true,
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: false
  }
}, {
  timestamps: true
});

// Indexes for faster queries
customerSchema.index({ code: 1 });
customerSchema.index({ name: 'text', city: 'text', state: 'text' });
customerSchema.index({ region: 1 });
customerSchema.index({ stateCode: 1 });

export default customerSchema;
