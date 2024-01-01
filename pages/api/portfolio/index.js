import connectMongoDB from '@/lib/connect-mongoDB'
import { Portfolio } from '@/schemas'
import mongoose from 'mongoose'

//  Todo : Use switch case inside handler function and handle cases of post, get and patch in separate functions.

export default async function handler(req, res) {
  const method = req.method

  switch (method) {
    case 'GET':
      await handleGet(req, res)
      break
    case 'POST':
      await handlePost(req, res)
      break
    case 'PATCH':
      await handlePatch(req, res)
      break
    default:
      await handleGet(req, res)
      break
  }
}

const handleGet = async (req, res) => {
  console.log('handling get')
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

const handlePost = async (req, res) => {
  await connectMongoDB()
  try {
    const { user_id } = req.query
    const {
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
}

const handlePatch = async (req, res) => {
  try {
    const { user_id } = req.query
    const updatedFields = JSON.parse(req.body)

    if (!user_id || Object.keys(updatedFields).length === 0) {
      return res.status(400).json({ status: 'bad-request' })
    }

    const foundPortfolio = await Portfolio.findOne({ user_id })

    if (foundPortfolio) {
      for (const key in updatedFields) {
        if (Object.prototype.hasOwnProperty.call(updatedFields, key) && key !== 'user_id') {
          foundPortfolio[key] = updatedFields[key]
        }
      }

      await foundPortfolio.save()

      res.status(200).json({ status: 'updated', portfolio: foundPortfolio })
    } else {
      res.status(404).json({ status: 'not-found' })
    }
  } catch (error) {
    console.error('Error:', error)
    res.status(500).json({ status: 'failed', error })
  }
}
