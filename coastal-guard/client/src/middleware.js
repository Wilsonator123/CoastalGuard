'use server'
import {NextResponse} from 'next/server'
import { cookies } from 'next/headers'

export function middleware(req) {
    const cookie = cookies().get('userID')

    if(req.nextUrl.pathname === '/login' && cookie) {
        return NextResponse.redirect(new URL('/', req.url))
    }

    if(req.nextUrl.pathname === '/account' && !cookie) {
        return NextResponse.redirect(new URL('/login', req.url))
    }
}
