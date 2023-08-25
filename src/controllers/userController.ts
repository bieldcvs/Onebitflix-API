
import { Response } from "express";
import { AuthentificatedRequest } from "../middlewares/auth";
import { userService } from "../services/userService";

export const usersController = {

   //GET /users/current
   show: async(req:AuthentificatedRequest, res:Response) => {
    try {
      const currentUser = req.user!
      return res.json(currentUser)
    } catch (err) {
      if (err instanceof Error) {
        return res.status(400).json({ message: err.message })
      }
    }
  },
  //PUT /users/current/pass
  updatePassword: async(req:AuthentificatedRequest, res:Response) => {
    const user = req.user!
    const {
      currentPassword,
      newPassword
    } = req.body

    try {
      user.checkPassword(currentPassword, async (err , isSame)=>{
        if (err) throw err;
        if (!isSame) throw new Error("Senha incorreta");
        
        await userService.updatePassword(user.id, newPassword)
        return res.status(204).send()
      })
    } catch (err) {
      if (err instanceof Error) {
        return res.status(400).json({ message: err.message })
      }
    }
  },
  
  //PUT /users/current
  update: async (req: AuthentificatedRequest, res: Response) => {
    const { id } = req.user!
    const { firstName, lastName, phone, email, birth } = req.body

    try {
      const updatedUser = await userService.update(id, {
        firstName,
        lastName,
        phone,
        email,
        birth
      })
      return res.json(updatedUser)
    } catch (err) {
      if (err instanceof Error) {
        return res.status(400).json({ message: err.message })
      }
    }
  },
 

  // GET /users/current/watching
  watching: async (req: AuthentificatedRequest, res: Response) => {
    const { id } = req.user!

    try {
      const watching = await userService.getKeepWatchingList(id)
      return res.json(watching)
    } catch (err) {
      if (err instanceof Error) {
        return res.status(400).json({ message: err.message })
      }
    }
  }
}