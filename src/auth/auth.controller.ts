import { Controller, Get, Query, Redirect, Req, Res, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import axios from 'axios';
import { Request, Response } from 'express';;
import jwtDecode from 'jwt-decode';
import { stringify } from "querystring";
import { BiopassClaims, Claims } from 'src/interfaces/biopassClaims.interface';
import * as encryptionService from '../services/encryption.service';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Get('biopass/callback')
  @Redirect()
  async getAdUser(@Query('code') code, @Req() req: Request, @Res() res: Response): Promise<any> {
    const body = {
      client_id: process.env.CLIENT_ID,
      redirect_uri: process.env.CALLBACK_URL,
      grant_type: process.env.GRANT_TYPE,
      code: code,
      client_secret: process.env.CLIENT_SECRET
    };
    const resa = await axios.post(process.env.TOKEN_URL, stringify(body), { headers: process.env.CONTENT_TYPE_URL_ENCODED })
    const claims: Claims = jwtDecode(resa.data.id_token);
    const expirationDate = claims.exp * 1000;
    const now = Date.now();
    if (expirationDate < now) {
      return { url: '/auth/biopass/authorize' };
    }

    const data: BiopassClaims = {
      upn: claims["upn"],
      email: claims["email"],
      uniqueName: claims["unique_name"],
      phoneNumber: claims["Telephone-Number"]
    };
    let token = encryptionService.encrypt(data);
    const redirect = this.authService.parseCookies(req)["redirectTo"];
    return { url: redirect ? `${redirect}?token=${token}` : 'error_url' };
  }


  @Get('biopass/authorize')
  @UseGuards(AuthGuard('bioPass'))
  async getUserFromBiopassLogin(): Promise<any> {
    return null;
  }

  @Get('biopass')
  async getUSerFrombiopassLogin2(@Query('redirectTo') redirectUrl, @Res() res: Response): Promise<any> {
    res.cookie("redirecTo", redirectUrl);
    res.redirect('/auth/biopass/authorize');
  }
}