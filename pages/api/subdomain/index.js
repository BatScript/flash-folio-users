// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { Portfolio } from '@/schemas'

export default async function handler(req, res) {
  const { name } = req.query

  if (req.method === 'GET') {
    try {
      // ! find better, faster and scalable way
      const allPortfolios = await Portfolio.find({})
      const allSubdmains = allPortfolios.map((portfolio) => portfolio.subdomain)
      res
        .status(200)
        .json({ status: 'success', available: !allSubdmains.includes(name) })
    } catch (error) {
      res.status(500).json({ status: 'error', error })
    }
  }
}
