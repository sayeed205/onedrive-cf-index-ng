import type { NextApiRequest, NextApiResponse } from 'next'

export const runtime = 'edge'

export const config = {
  api: {
    bodyParser: false,
  },
}

export default function handler(_: NextApiRequest, res: NextApiResponse) {
  res.setHeader('WWW-authenticate', 'Basic realm="protected"')
  res.statusCode = 401
  res.end(`Auth Required.`)
}
