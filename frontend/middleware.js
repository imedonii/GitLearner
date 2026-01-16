// middleware.ts
import { NextResponse } from 'next/server'

export async function middleware(request) {
    const path = request.nextUrl.pathname

    // 🔓 Public routes
    const publicPages = ['/', '/playground', '/help']
    const isPublicPage = publicPages.some(p => path.startsWith(p))

    const authPages = ['/auth/signin', '/auth/signup']
    const isAuthPage = authPages.some(p => path.startsWith(p))


    if (isPublicPage || isAuthPage) {
        return NextResponse.next()
    }

    // 🔒 Protected routes - redirect to signin
    return NextResponse.redirect(new URL('/auth/signin', request.url))
}



export const config = {
    matcher: ['/:path*'],
}
