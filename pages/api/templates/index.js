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
      const allTemplates = await Template.find({})
      res.status(200).json({ status: 'found', data: allTemplates })
    } catch (error) {
      console.error('Error:', error)
      res.status(500).json({ status: 'error', error })
    }
  }
}
