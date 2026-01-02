// middleware.js (root of project)
import { NextResponse } from 'next/server';
import { verifyAuth } from './lib';

export async function middleware(request) {
    // Get the pathname of the request
    const path = request.nextUrl.pathname;

    // Define public paths that don't require authentication
    const publicPaths = ['/', '/auth/signin', '/auth/signup',];
    const isPublicPath = publicPaths.some(publicPath => path === publicPath || path.startsWith(publicPath + '/'));

    if (isPublicPath) {
        return NextResponse.next();
    }

    // Check if the user is authenticated
    const token = request.cookies.get('authToken')?.value;
    const isAuthenticated = token && await verifyAuth(token);

    // If not authenticated and trying to access protected route, redirect to login
    if (!isAuthenticated) {
        return NextResponse.redirect(new URL(`/auth/signin`, request.url));
    }

    return NextResponse.next();
}

// Configure which paths the middleware runs on
export const config = {
    matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
};