import jwt from 'jsonwebtoken'
import config from '../config'
import StringValue from 'ms';
import { TokenPayload } from '../config/type.D';
import { InvalidItemException } from '../util/exeptions/repositoryException';
import { InvalidTokenException, TokenExepiredException } from '../util/exeptions/http/AuthenticationException';
import logger from '../util/logger';
import { ServiceException } from '../util/exeptions/ServiceException';
export class AuthenticationService{
    constructor(private secretKey = config.auth.secretKey,private tokenExpiration = config.auth.tokenExpiration
    ){

    }
        generateToken(userId:string):string{ 
            return jwt.sign(
                {userId},
                this.secretKey,
                {expiresIn:this.tokenExpiration},
            )
        }
        verirfyToken(token:string):TokenPayload{
            try{
                return (jwt.verify(token,this.secretKey) )as TokenPayload;
            }catch(error){
                logger.error("Token verification failed",error);
                if(error instanceof(jwt.TokenExpiredError)){
                    throw new TokenExepiredException();
                }
                if(error instanceof(jwt.JsonWebTokenError)){
                    throw new InvalidTokenException();
                }
                throw new ServiceException("toke verification failed ");
            }
        }

        clear (){
            // to do later from now on we will go to the controller to bound everything we have 
        }
}