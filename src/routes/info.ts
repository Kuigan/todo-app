import { Request, Response, Router } from 'express'

export const infoRouter = Router()

infoRouter.get('/', (req: Request, res: Response) => {
  res.send('GET - Anfrage angekommen.')
})

infoRouter.post('/', (req: Request, res: Response) => {
  res.send('POST - Anfrage angekommen.')
})