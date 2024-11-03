import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(req: NextRequest) {
    const token = req.cookies.get('accessToken'); // Lấy token từ cookies
    const { pathname } = req.nextUrl;

    // Nếu người dùng đang cố gắng truy cập vào trang đăng nhập hoặc trang đăng ký và đã có token
    if ((pathname === '/') && token) {
        return NextResponse.redirect(new URL('/home', req.url)); // Chuyển hướng đến trang home
    }

    // Nếu người dùng không có token và đang cố gắng truy cập vào trang bảo vệ
    if (!token && (pathname === '/home' || pathname === '/protected')) {
        return NextResponse.redirect(new URL('/', req.url)); // Chuyển hướng về trang đăng nhập
    }

    return NextResponse.next(); // Tiếp tục với yêu cầu
}

// Đặt middleware này cho tất cả các route
export const config = {
    matcher: ['/', '/home', '/protected'], // Các route sẽ được middleware này kiểm soát
};
