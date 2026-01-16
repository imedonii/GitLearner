// middleware.ts
import { NextResponse } from 'next/server'

export async function middleware(request) {
    const path = request.nextUrl.pathname

    console.log('Middleware running for:', path)

    // 🔓 Public routes
    const publicPages = ['/', '/playground', '/help']
    const isPublicPage = publicPages.some(p => path.startsWith(p))

    const authPages = ['/auth/signin', '/auth/signup']
    const isAuthPage = authPages.some(p => path.startsWith(p))

    console.log('path:', path, 'isPublicPage:', isPublicPage, 'isAuthPage:', isAuthPage)

    if (isPublicPage || isAuthPage) {
        console.log('Allowing public/auth page access')
        return NextResponse.next()
    }

    // 🔒 Protected routes - redirect to signin
    console.log('Protected route - redirecting to signin')
    return NextResponse.redirect(new URL('/auth/signin', request.url))
}



export const config = {
    matcher: ['/:path*'],
}
