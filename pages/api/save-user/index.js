import connectMongoDB from '@/lib/connect-mongoDB'
import { User } from '@/schemas'

export default async function handler(req, res) {
  if (req.method === 'POST') {
    await connectMongoDB()
    const { email, password = '', name, image = '' } = JSON.parse(req.body)

    try {
      // Check if the user exists
      const existingUser = await User.findOne({ email })

      if (existingUser) {
        // User exists
        res.status(200).json({ status: 'exists', user: existingUser })
      } else {
        const newUser = new User({
          username: name,
          email,
          password_hash: password,
          image
        })
        await newUser.save()
        res.status(201).json({ status: 'created', user: newUser })
      }
    } catch (error) {
      console.error('Error:', error)
      res.status(500).json({ status: 'error', error: 'Internal Server Error' })
    }
  } else {
    res.status(401).json({ message: 'Try Post Method' })
  }
}
