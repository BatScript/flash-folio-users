import connectMongoDB from '@/lib/connect-mongoDB'
import { Portfolio } from '@/schemas'
import mongoose from 'mongoose'

export default async function handler(req, res) {
  if (req.method === 'POST') {
    await connectMongoDB()
    try {
      const {
        user_id,
        template_id,
        template_data = {},
        subdomain = '',
        is_published = false
      } = JSON.parse(req.body)
      const existingPortfolio = await Portfolio.findOne({ user_id })

      if (existingPortfolio) {
        const updatedPortFolio = await Portfolio.findOneAndUpdate(
          { user_id },
          {
            template_data,
            subdomain,
            is_published
          },
          { new: true }
        )
        res.status(200).json({ status: 'updated', portfolio: updatedPortFolio })
      } else {
        const newPortfolio = new Portfolio({
          user_id,
          template_id,
          subdomain,
          template_data,
          is_published
        })
        // It has to be manually modified for some reason 🤦‍♂️
        newPortfolio.markModified('template_data')
        await newPortfolio.save()
        res.status(201).json({ status: 'created', portfolio: newPortfolio })
      }
    } catch (error) {
      console.error('Error:', error)
      res.status(500).json({ status: 'error', error })
    }
  } else {
    const { user_id } = req.query
    try {
      if (user_id) {
        const foundPortfolio = await Portfolio.findOne({ user_id })
        if (foundPortfolio) {
          res.status(201).json({ status: 'found', portfolio: foundPortfolio })
        } else {
          res.status(404).json({ status: 'not-found' })
        }
      } else {
        res.status(401).json({ status: 'incorrect payload' })
      }
    } catch (error) {
      res.status(500).json({ status: 'failed', error })
    }
  }
}
