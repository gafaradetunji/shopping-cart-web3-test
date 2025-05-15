import { NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers'

// const protectedPrefixes = ['/home/'] 
// const exactProtectedRoutes = ['/driver-profile', '/driver-setup', '/notification', '/setup-withdrawal', '/earnings', '/recent-earnings']
// const publicRoutes = ['/login']

export default async function middleware(req: NextRequest) {
  // const path = req.nextUrl.pathname
  // console.log(path)
  
  // const isExactProtectedRoute = exactProtectedRoutes.includes(path)
  // const isPrefixProtectedRoute = protectedPrefixes.some(prefix => path.startsWith(prefix))
  // const isProtectedRoute = isExactProtectedRoute || isPrefixProtectedRoute
  
  // const isPublicRoute = publicRoutes.includes(path)

  // // 3. Decrypt the session from the cookie
  const cookie = (await cookies()).get('userToken')?.value
  // const session = await decrypt(cookie)

  // // 4. Redirect to /login if the user is not authenticated
  // if (isProtectedRoute && !cookie) {
  //   return NextResponse.redirect(new URL(`${process.env["NEXT_PUBLIC_MAIN_APP_URL"]}/sign-in`, req.nextUrl))
  // }

  // // 5. Redirect to /dashboard if the user is authenticated
  if (cookie && !req.nextUrl.pathname.startsWith('/')) {
    return NextResponse.redirect(new URL('/', req.nextUrl))
  }

  return NextResponse.next()
}

// Routes Middleware should not run on
export const config = {
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
}
