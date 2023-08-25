import jwt from "jsonwebtoken";
import { JWT_KEY } from '../config/environments';


export const jwtService = {
  signgetToken : (payload : string | object | Buffer , expiration : string) => {
    return jwt.sign(payload,JWT_KEY,{
      expiresIn: expiration
    })
  } ,
  verifyToken:(
    token:string,
    callbackfn:jwt.VerifyCallback
  ) => {
    jwt.verify(token,JWT_KEY,callbackfn)
  }

}