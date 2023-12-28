import connectMongoDB from '@/lib/connect-mongoDB'
import { Template } from '@/schemas'

export default async function handler(req, res) {
  if (req.method === 'POST') {
    await connectMongoDB()
    try {
      const { name, description, content } = req.body
      const newTemplate = new Template({
        name,
        description,
        content
      })

      await newTemplate.save()

      res.status(201).json({ status: 'created', template: newTemplate })
    } catch (error) {
      console.error('Error:', error)
      res.status(500).json({ status: 'error', error })
    }
  } else {
    await connectMongoDB()
    try {
      const { _id } = req.query
      if (_id) {
        const oneTemplate = await Template.findOne({ _id })
        if (oneTemplate) {
          res.status(200).json({ status: 'found', data: oneTemplate })
        } else {
          res.status(404).json({ status: 'not-found' })
        }
      } else {
        const allTemplates = await Template.find({})
        if (allTemplates) {
          res.status(200).json({ status: 'found', data: allTemplates })
        } else {
          res.status(404).json({ status: 'not-found' })
        }
      }
    } catch (error) {
      console.error('Error:', error)
      res.status(500).json({ status: 'error', error })
    }
  }
}
