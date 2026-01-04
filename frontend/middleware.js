// middleware.ts
import { NextResponse } from 'next/server'

export function middleware(request) {
    const path = request.nextUrl.pathname
    const token = request.cookies.get('token')?.value

    const authPages = ['/auth/signin', '/auth/signup', '/playground', '/cheatsheet']
    const isAuthPage = authPages.some(p => path.startsWith(p))

    const publicPaths = ['/', ...authPages]
    const isPublicPath = publicPaths.some(p => path === p || path.startsWith(p + '/'))

    // 🔁 Logged in users should NOT see auth pages
    if (token && isAuthPage) {
        return NextResponse.redirect(new URL('/learning-path', request.url))
    }

    // 🔓 Allow public paths
    if (isPublicPath) {
        return NextResponse.next()
    }

    // 🔒 Protect everything else
    if (!token) {
        return NextResponse.redirect(new URL('/auth/signin', request.url))
    }

    return NextResponse.next()
}

export const config = {
    matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
}
