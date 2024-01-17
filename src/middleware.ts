import { NextRequest, NextResponse } from 'next/server'

export const config = {
  api: {
    bodyParser: false,
  },
}

export default function middleware(req: NextRequest) {
  const basicAuth = req.headers.get('authorization')!
  const url = req.nextUrl

  // Check if the url is ddl raw link for direct download
  //http://localhost:3000/api/raw/?path=/Pictures/Camera%20Roll/2C367881-9517-44D8-809F-A9CE0EFB5BEE.jpg
  if (url.pathname === '/api/raw/' || url.pathname.includes('/api/name/')) {
    return NextResponse.next()
  }

  if (basicAuth) {
    // reverse encode the USER and PASSWORD
    const basicLogin = btoa(`${process.env.USER_NAME}:${process.env.PASSWORD}`)

    console.log(basicAuth, basicLogin)

    // compare the encoded values
    if (basicAuth === `Basic ${basicLogin}`) {
      return NextResponse.next()
    }
  }

  url.pathname = '/api/auth'

  return NextResponse.rewrite(url)
}
