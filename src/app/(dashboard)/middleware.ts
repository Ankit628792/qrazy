import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { me } from '@/services/auth.service';

export async function middleware(request: NextRequest) {
    const res: any = await me();
    if (!res?.success) {
        return NextResponse.redirect(new URL('/login', request.url))
    }
    else {
        return NextResponse.next()
    }
}
