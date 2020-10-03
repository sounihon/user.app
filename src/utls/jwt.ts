import { IDBUser } from "src/db/entities/user";
import {defaults} from 'lodash';
import {sign, verify} from 'jsonwebtoken';

interface IJWTokenOptionsParams {
    expiration?: number | string;
}

interface IJWTokenOptions {
    expiration: number | string;
}

export class JWToken {
    public static singToken(userData: IDBUser, options: IJWTokenOptionsParams = {}): string {
        options  =  defaults<IJWTokenOptionsParams, IJWTokenOptions>(options, {
            expiration: '24h'
        }) as IJWTokenOptions;
        
        return sign({
            data: {
                id: userData.id,
                login: userData.login
            }
        }, process.env.JWT_SECRET, {
            expiresIn: options.expiration
        });
    }

    public static async verifyToken(token: string) {            
        return await new Promise((resolve, reject) => {                
            verify(token, process.env.JWT_SECRET, (err, result) => {
                if(err) {
                    reject(err);
                    return;
                }
                resolve(result);
            })
        });
    }
}