import mongoose from 'mongoose'

const connectMongoDB = async () => {
  try {
    await mongoose.connect(process.env.NEXT_PUBLIC_MONGODB_URI || '')
    console.log('Connected to MongoDB.')
  } catch (error) {
    console.error('[Error]:', error)
    new Error('Ooops Connection Failes')
  }
}

export default connectMongoDB
