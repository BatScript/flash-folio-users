import NextAuth from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import clientPromise from '@/lib/mongodb'
import { MongoDBAdapter } from '@auth/mongodb-adapter'

export const authOptions = {
  adapter: MongoDBAdapter(clientPromise, { databaseName: 'FlashWeb' }),
  // Configure one or more authentication providers
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
