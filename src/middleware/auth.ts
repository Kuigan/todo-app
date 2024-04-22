import { Request, Response, NextFunction } from "express"
import { getAdmins } from "../services/auth.js"


export function hasAuthentication(req: Request, res: Response, next: NextFunction) {
    const authorization = req.headers.authorization

    if (authorization === undefined) {
        res.status(401).send("Unauthorized")
    } else {
        next()
    }

}