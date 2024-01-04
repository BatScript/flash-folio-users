import NextAuth from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import { User } from '@/schemas'
import connectMongoDB from '@/lib/connect-mongoDB'

export const authOptions = {
  // Configure one or more authentication providers
  callbacks: {
    async session({ session, token, user }) {
      const { email, password = '', name, image = '' } = session?.user
      try {
        // Check if the user exists
        await connectMongoDB()
        const existingUser = await User.findOne({ email })

        if (existingUser) {
          // User exists
          console.log({ status: 'exists', user: existingUser })
          // sets user's id for futire usage
          session.user._id = existingUser?._id
          return session
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
          session.user._id = newUser?._id
          return session
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
  ],
  secret: process.env.NEXT_PUBLIC_NEXTAUTH_SECRET
}

export default NextAuth(authOptions)
