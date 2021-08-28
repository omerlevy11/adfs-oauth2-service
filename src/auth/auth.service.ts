import { Injectable } from '@nestjs/common';
import { Request } from 'express';

@Injectable()
export class AuthService {
  parseCookies(request: Request) {
    let cookies = {};
    let requestCookies = request.headers.cookie;
    requestCookies && requestCookies.split(';').forEach((cookie) => {
      let cookieParts = cookie.split('=');
      cookies[cookieParts.shift().trim()] = decodeURIComponent(cookieParts.join('='));
    });
    return cookies;
  }
}
