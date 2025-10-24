import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  sku: {
    type: String,
    required: [true, 'SKU is required'],
    unique: true,
    trim: true,
    uppercase: true,
    maxlength: [20, 'SKU cannot be more than 20 characters']
  },

  // Always aligned with SKU (lowercase, trimmed)
  skuLower: { type: String, trim: true, required: true },

  productName: {
    type: String,
    required: [true, 'Product name is required'],
    trim: true,
    maxlength: [150, 'Product name cannot be more than 150 characters']
  },

  masterCartonSize: { type: String },

  origin: {
    type: String,
    trim: true,
    enum: ['Domestic', 'Import', 'Hybrid'],
    message: 'Origin must be Domestic, Import, or Hybrid'
  },

  // Physical dimensions/weights (per unit)
  weight: { type: Number, default: 0, min: [0, 'Weight cannot be negative'] },
  length: { type: Number, default: 0, min: [0, 'Length cannot be negative'] },
  width: { type: Number, default: 0, min: [0, 'Width cannot be negative'] },
  height: { type: Number, default: 0, min: [0, 'Height cannot be negative'] },

  // Package dimensions/weights (outer carton)
  packageWeight: { type: Number, default: 0, min: [0, 'Package weight cannot be negative'] },
  packageLength: { type: Number, default: 0, min: [0, 'Package length cannot be negative'] },
  packageWidth: { type: Number, default: 0, min: [0, 'Package width cannot be negative'] },
  packageHeight: { type: Number, default: 0, min: [0, 'Package height cannot be negative'] },

  eanCode: { type: String, trim: true, maxlength: [32, 'EAN code cannot be more than 32 characters'] },

  categoryId: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: [true, 'Category is required'] },

  vendors: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  manufacturers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],

  isActive: { type: Boolean, default: true },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }

}, { timestamps: true });

// --------------------
// Hooks
// --------------------
productSchema.pre('validate', function(next) {
  this.skuLower = (this.sku || '').toLowerCase().trim();
  next();
});

// --------------------
// Indexes
// --------------------
productSchema.index({ skuLower: 1 }, { unique: true, sparse: true, name: 'uniq_sku_lower' });
productSchema.index({ sku: 1, name: 'by_sku' });
productSchema.index({ categoryId: 1, name: 'by_category' });
productSchema.index({ vendors: 1, name: 'by_vendor' });
productSchema.index({ manufacturers: 1, name: 'by_manufacturer' });
productSchema.index({ productName: 'text' });

// Export model
export default productSchema
