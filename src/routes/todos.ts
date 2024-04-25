import { Request, Response, Router } from 'express'
import { getToDos, getToDoById, addToDo, updateToDo, deleteToDoById } from '../services/data.js'
import { ToDo as ToDo } from '../types/todo.js'
import { hasAuthentication } from '../middleware/auth.js'

export const todosRouter = Router()


todosRouter.post('/', hasAuthentication, (req: Request, res: Response) => {

  const todo: string = req.body.todo
  const deadline: string = req.body.deadline
  const assignee: string = req.body.assignee
  const owner: string = req.body.owner
  const status: "not started" | "in progress" | "ready for review" | "in review" | "done" = req.body.status

  // Überprüfe ob der eingegebene Status gültig ist

  if (!["not started", "in progress", "ready for review", "in review", "done"].includes(status)) {
    res.status(400).send("Ungültiger Statuswert.");
    return;
  }

  // Füge das TODO hinzu
  addToDo(todo, deadline, assignee, owner, status)
  res.status(204).send()
})


todosRouter.get('/', hasAuthentication, (req: Request, res: Response) => {
  const owner = req.headers.authorization!;
  const assignee = req.query.assignee as string | undefined;
  const creator = req.query.creator as string | undefined;
  let todos: ToDo[] = getToDos().filter(todo => {
    return (!assignee || todo.assignee === assignee) && (!creator || todo.owner === creator);
  });

  res.status(200).send(todos);
})


todosRouter.get('/:id', hasAuthentication, (req: Request, res: Response) => {

  const id: number = parseInt(req.params.id);
  const todo: ToDo | undefined = getToDoById(id);

  if (todo === undefined) {
    res.status(404).send(`Die ToDo-Aufgabe mit der ID ${id} wurde nicht gefunden.`);
  } else {
    res.status(200).send(todo);
  }
})


todosRouter.put('/:id', hasAuthentication, (req: Request, res: Response) => { 

  const todo: string = req.body.todo
  const deadline: string = req.body.deadline
  const assignee: string = req.body.assignee
  const owner: string = req.body.owner
  const status: "not started" | "in progress" | "ready for review" | "in review" | "done" = req.body.status
  const id: number = parseInt(req.params.id)
  const oldToDo: ToDo | undefined = getToDoById(id)


  if (oldToDo === undefined) {
    res.status(404).send(`Die ToDo-Aufgabe mit der ID ${id} wurde nicht gefunden.`)
    return
  }



  // Überprüfen Sie, ob der eingegebene Status gültig ist
  if (!["not started", "in progress", "ready for review", "in review", "done"].includes(status)) {
    res.status(400).send("Ungültiger Statuswert.");
    return;
  }

  // Aktualisieren Sie das TODO
  updateToDo(id, todo, deadline, assignee, owner, status)

  res.status(204).send()
})


todosRouter.patch('/:id', hasAuthentication, (req: Request, res: Response) => {

  const id: number = parseInt(req.params.id)
  const oldToDo: ToDo | undefined = getToDoById(id)

  // Überprüfen Sie, ob der eingegebene Status gültig ist
  // const status: string = req.body.status ?? oldToDo.status;
  const status: "not started" | "in progress" | "ready for review" | "in review" | "done" = (oldToDo !== undefined) ? req.body.status ?? oldToDo.status : req.body.status;

  if (!["not started", "in progress", "ready for review", "in review", "done"].includes(status)) {
    res.status(400).send("Ungültiger Statuswert.");
    return;
  }

  // Überprüfen, ob die Aufgabe existiert
  if (oldToDo === undefined) {
    res.status(404).send(`Die ToDo-Aufgabe mit der ID ${id} wurde nicht gefunden.`)
    return
  }

  const todo: string = req.body.todo ?? oldToDo.todo
  const deadline: string = req.body.deadline ?? oldToDo.deadline
  const assignee: string = req.body.assignee ?? oldToDo.assignee
  const owner: string = req.body.owner ?? oldToDo.owner

  updateToDo(id, todo, deadline, assignee, owner, status)

  res.status(204).send()
 })


todosRouter.delete('/:id', hasAuthentication, (req: Request, res: Response) => { 

  const id: number = parseInt(req.params.id)
  const oldToDo: ToDo | undefined = getToDoById(id)

  if (oldToDo === undefined) {
    res.status(404).send(`Die ToDo-Aufgabe mit der ID ${id} wurde nicht gefunden.`)
    return
  }

  deleteToDoById(id)

  res.status(204).send()
})