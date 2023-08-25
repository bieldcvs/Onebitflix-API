import { Response } from 'express';
import { AuthentificatedRequest } from '../middlewares/auth';
import { favoriteService } from '../services/favoriteService';

export const favoritesController  = {

  index:async (req:AuthentificatedRequest,res:Response)=>{
    const userId = req.user!.id

    try {
      const favorites = await favoriteService.findByUserId(userId)
      return res.json(favorites)
    } catch (err) {
      if (err instanceof Error) {
     
        return res.status(400).json({ message: err.message })
        
      }
      
    }
  },

  save : async (req: AuthentificatedRequest, res: Response) => {
    const userId = req.user!.id
    const { courseId } = req.body
    try {
      const favorite = await favoriteService.create(userId,Number(courseId))
      return res.status(201).json(favorite)
    } catch (err) {
      if (err instanceof Error) {
     
        return res.status(400).json({ message: err.message })
        
      }
    }
  },
  //delete /favorites/:id
  delete: async(req:AuthentificatedRequest,res:Response)=>{
    const userId = req.user!.id
    const courseId = req.params.id
    try {
      await favoriteService.delete(userId,Number(courseId))
      return res.status(204).send()
    } catch (err ) {
      if (err instanceof Error) {
     
        return res.status(400).json({ message: err.message })
        
      }
    }
  }
}