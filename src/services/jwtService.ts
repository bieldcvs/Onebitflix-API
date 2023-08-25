import jwt from "jsonwebtoken";

const secret = 'chave'

export const jwtService = {
  signgetToken : (payload : string | object | Buffer , expiration : string) => {
    return jwt.sign(payload,secret,{
      expiresIn: expiration
    })
  } ,
  verifyToken:(
    token:string,
    callbackfn:jwt.VerifyCallback
  ) => {
    jwt.verify(token,secret,callbackfn)
  }

}