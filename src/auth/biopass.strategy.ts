import {PassportStrategy} from '@nestjs/passport';
import { Injectable } from "@nestjs/common";
import { Strategy} from 'passport-oauth2';
import { stringify } from "querystring";
@Injectable()
export class BioPassStrategy extends PassportStrategy(Strategy, 'bioPass') {

    constructor() {
        super({
            authorizationURl: `${process.env.AUTHORIZATION_URL}?${stringify({
                client_id: process.env.CLIENT_ID,
                redirect_uri: process.env.CALLBACK_URL,
                response_type: process.env.RESPONSE_TYPE,
                scope: process.env.SCOPE
            })}`,
            tokenURL: process.env.TOKEN_URL,
            clientID: process.env.CLIENT_ID,
            callbackURL: process.env.CALLBACK_URL,
            scope: process.env.SCOPE
        })
    }
}