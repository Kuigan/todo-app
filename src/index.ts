import express, { Request, Response } from 'express'
import { infoRouter } from './routes/info.js'
import { todosRouter } from './routes/todos.js';

// Definiert den Express-Server und den Port
const app = express();
const port = 3000;

// Setup custom middleware

// Verwendet das eingebaute Middleware-Modul von Express, um Anfragedaten zu parsen
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

// Setup routes

// Verwendet die definierten Routen-Module für verschiedene Pfade
app.use('/info', infoRouter)
app.use('/todos', todosRouter)

// Definiert einen Standard-GET-Endpunkt für die Startseite des Servers
app.get('/', (req: Request, res: Response) => {
    res.send('Hallo Welt! Ich bin ein Express-Server');
});

// Startet den Server und lauscht auf dem angegebenen Port
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}.`)
})
