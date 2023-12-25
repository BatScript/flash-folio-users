import NextAuth from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import connectMongoDB from '@/lib/connect-mongoDB'
import { User } from '@/schemas'

export const authOptions = {
  // Configure one or more authentication providers
  callbacks: {
    async signIn({ user, account, profile }) {
      const { email, password = '', name, image = '' } = user
      try {
        // Check if the user exists
        const existingUser = await User.findOne({ email })

        if (existingUser) {
          // User exists
          console.log({ status: 'exists', user: existingUser })
          return true
        } else {
          const newUser = new User({
            username: name,
            email,
            password_hash: password,
            image,
            type: 'user'
          })
          await newUser.save()
          console.log({ status: 'created', user: newUser })
          return true
        }
      } catch (error) {
        console.log({ status: 'error', error: error })
        return false
      }
    }
  },
  providers: [
    GoogleProvider({
      clientId: process.env.NEXT_PUBLIC_GOOGLE_ID,
      clientSecret: process.env.NEXT_PUBLIC_GOOGLE_SECRET
    })
    // ...add more providers here
  ],
  secret: process.env.NEXT_PUBLIC_NEXTAUTH_SECRET
}

export default NextAuth(authOptions)
