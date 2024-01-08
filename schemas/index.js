import mongoose from 'mongoose'

const userSchema = new mongoose.Schema(
  {
    username: { type: String, required: true },
    email: { type: String, required: true },
    password_hash: { type: String, required: false },
    image: { type: String, required: false },
    type: String
  },
  { timestamps: true }
)

// Define Schema for Templates
const templateSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String },
    content: { type: mongoose.Schema.Types.Mixed, required: false }
  },
  { timestamps: true }
)

// Define Schema for Portfolios
const portfolioSchema = new mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    template_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Template',
      required: true
    },
    subdomain: { type: String, required: false },
    is_published: { type: Boolean, required: false },
    template_data: { type: mongoose.Schema.Types.Mixed, required: false }
  },
  { timestamps: true }
)

export const User = mongoose?.models?.User || mongoose.model('User', userSchema)
export const Template =
  mongoose?.models?.Template || mongoose.model('Template', templateSchema)
export const Portfolio =
  mongoose?.models?.Portfolio || mongoose.model('Portfolio', portfolioSchema)
