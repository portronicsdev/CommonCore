import mongoose from 'mongoose';

const superCategorySchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: [true, 'Super Category name is required'], 
    unique: true,
    trim: true,
    maxlength: [50, 'Super Category name cannot be more than 50 characters']
  }
}, { 
  timestamps: true 
});


export default superCategorySchema
