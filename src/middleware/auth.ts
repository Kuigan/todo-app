import { Request, Response, NextFunction } from "express"
import { getAdmins } from "../services/auth.js"

/**
 * Middleware zur Überprüfung der Autorisierung.
 * Überprüft, ob die Anforderung einen Autorisierungs-Header enthält.
 * Wenn kein Autorisierungs-Header vorhanden ist, wird ein Statuscode 401 zurückgegeben.
 * Andernfalls wird die Anfrage an die nächste Middleware oder Routen-Handler-Funktion weitergeleitet.
 * 
 * @param req Die Anfrage (Request) vom Client.
 * @param res Die Antwort (Response) an den Client.
 * @param next Die nächste Funktion in der Middleware-Kette.
 */

export function hasAuthentication(req: Request, res: Response, next: NextFunction) {
    const authorization = req.headers.authorization

    if (authorization === undefined) {
        res.status(401).send("Unauthorized")
    } else {
        next()
    }

}