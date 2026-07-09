import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const COOKIE_NAME = 'proroller_session';

export function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;

    // Allow the login page and API auth routes to pass through
    if (
        pathname === '/admin/login' ||
        pathname.startsWith('/api/auth/') ||
        (pathname.startsWith('/api/products') && request.method === 'GET')
    ) {
        return NextResponse.next();
    }

    // Protect all /admin routes
    if (pathname.startsWith('/admin')) {
        const token = request.cookies.get(COOKIE_NAME)?.value;

        if (!token) {
            const loginUrl = new URL('/admin/login', request.url);
            return NextResponse.redirect(loginUrl);
        }
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/admin/:path*'],
};
