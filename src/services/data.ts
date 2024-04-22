import * as fs from 'node:fs'
import { ToDo as ToDo } from '../types/todo.js'

type ToDoRaw = {
  todo: ToDo[]
}

export function getToDos(): ToDo[] {
  const toDosRaw = fs.readFileSync('data/todos.json', 'utf8')
  const aufgaben = JSON.parse(toDosRaw) as ToDoRaw
  const array = aufgaben.todo
  return array
}

export function getToDoById(id: number): ToDo | undefined {
  const toDos = getToDos() 
  const toDo = toDos.find(todo => todo.id === id)
  return toDo
}

export function writeToDoToFile(oldToDos: ToDo[]): void { 
  const newToDos: ToDoRaw = { todo: oldToDos }
  fs.writeFileSync('data/notes.json', JSON.stringify(newToDos))
}

export function addToDo(todo: string, deadline: string, assignee: string, owner: string, status: string): void {
  const oldToDos = getToDos()
  const id = oldToDos.length + 1
  const newToDo: ToDo = new ToDo(id, todo, deadline, assignee, owner, status)
  oldToDos.push(newToDo)
  writeToDoToFile(oldToDos)
}

export function updateToDo(id: number, todo: string, deadline: string, assignee: string, owner: string, status: string): void {
  const oldToDos = getToDos()
  const filteredToDos = oldToDos.filter(todo => todo.id !== id)
  const newToDo: ToDo = new ToDo(id, todo, deadline, assignee, owner, status)
  filteredToDos.push(newToDo)
  writeToDoToFile(filteredToDos)
}

export function deleteToDoById(id: number): void {
  const oldToDos = getToDos()
  const filteredToDos = oldToDos.filter(todo => todo.id !== id)
  writeToDoToFile(filteredToDos)
}