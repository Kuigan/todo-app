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
  const status: string = req.body.status

  addToDo(todo, deadline, assignee, owner, status )

  res.status(204).send()
})


todosRouter.get('/', hasAuthentication, (req: Request, res: Response) => {
  const owner = req.headers.authorization!

  const todos: ToDo[] = getToDos().filter(todo => todo.owner === owner)

  res.status(200).send(todos)
})


todosRouter.get('/:id', hasAuthentication, (req: Request, res: Response) => {

  const id: number = parseInt(req.params.id)
  const todo: ToDo | undefined = getToDoById(id)

  if (todo === undefined) {
    res.status(404).send(`Die ToDo-Aufgabe mit der ID ${id} wurde nicht gefunden.`)
  } else {
    res.status(200).send(todo)
  }
})


todosRouter.put('/:id', hasAuthentication, (req: Request, res: Response) => { 

  const todo: string = req.body.todo
  const deadline: string = req.body.deadline
  const assignee: string = req.body.assignee
  const owner: string = req.body.owner
  const status: string = req.body.status
  const id: number = parseInt(req.params.id)
  const oldToDo: ToDo | undefined = getToDoById(id)


  if (oldToDo === undefined) {
    res.status(404).send(`Die ToDo-Aufgabe mit der ID ${id} wurde nicht gefunden.`)
    return
  }

  updateToDo(id, todo, deadline, assignee, owner, status)

  res.status(204).send()
})


todosRouter.patch('/:id', hasAuthentication, (req: Request, res: Response) => {

  const id: number = parseInt(req.params.id)
  const oldToDo: ToDo | undefined = getToDoById(id)

  if (oldToDo === undefined) {
    res.status(404).send(`Die ToDo-Aufgabe mit der ID ${id} wurde nicht gefunden.`)
    return
  }

  const todo: string = req.body.todo ?? oldToDo.todo
  const deadline: string = req.body.deadline ?? oldToDo.deadline
  const assignee: string = req.body.assignee ?? oldToDo.assignee
  const owner: string = req.body.owner ?? oldToDo.owner
  const status: string = req.body.status ?? oldToDo.status

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