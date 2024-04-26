import { Request, Response, Router } from 'express'

/**
 * Router zur Behandlung von Anfragen an die Info-Ressource.
 * Definiert GET- und POST-Routen für die Info-Ressource.
 * GET-Routen geben eine Bestätigungsmeldung zurück, dass die GET-Anfrage erfolgreich angekommen ist.
 * POST-Routen geben eine Bestätigungsmeldung zurück, dass die POST-Anfrage erfolgreich angekommen ist.
 */

export const infoRouter = Router()

infoRouter.get('/', (req: Request, res: Response) => {
  res.send('GET - Anfrage angekommen.')
})

infoRouter.post('/', (req: Request, res: Response) => {
  res.send('POST - Anfrage angekommen.')
})