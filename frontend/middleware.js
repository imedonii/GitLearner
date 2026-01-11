// middleware.ts
import { NextResponse } from 'next/server'
import { jwtVerify } from 'jose'

const secret = new TextEncoder().encode(
    process.env.NEXT_PUBLIC_JWT_SECRET
)

export async function middleware(request) {
    const path = request.nextUrl.pathname
    const token = request.cookies.get('token')?.value

    const authPages = ['/auth/signin', '/auth/signup']
    const isAuthPage = authPages.some(p => path.startsWith(p))

    // 🔓 Public routes
    if (path === '/' || isAuthPage) {
        if (token && isAuthPage) {
            return NextResponse.redirect(new URL('/learning-path', request.url))
        }
        return NextResponse.next()
    }

    // 🔒 Protected routes
    if (!token) {
        return redirectToSignin(request)
    }

    try {
        await jwtVerify(token, secret) // ✅ validates exp automatically
        return NextResponse.next()
    } catch {
        // ❌ Token expired or invalid → remove cookie
        const res = redirectToSignin(request)
        res.cookies.delete('token')
        return res
    }
}

function redirectToSignin(request) {
    return NextResponse.redirect(new URL('/auth/signin', request.url))
}

export const config = {
    matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
}
