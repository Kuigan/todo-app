import * as fs from 'node:fs' // Import der Filesystem-Bibliothek von Node.js
import { ToDo as ToDo } from '../types/todo.js' // Import des ToDo-Typs

type ToDoRaw = {
  todo: ToDo[]
}

/**
 * Liest die Liste der ToDo-Aufgaben aus einer JSON-Datei.
 * @returns Ein Array von ToDo-Objekten.
 */

export function getToDos(): ToDo[] {
  const toDosRaw = fs.readFileSync('data/todos.json', 'utf8') // Lesen der Datei 'data/todos.json'
  const aufgaben = JSON.parse(toDosRaw) as ToDoRaw // Parsen der JSON-Daten
  const array = aufgaben.todo // Extrahieren der ToDo-Liste aus dem geparsten Objekt
  return array // Rückgabe der ToDo-Liste
}

/**
 * Sucht eine ToDo-Aufgabe anhand ihrer ID.
 * @param id Die ID der gesuchten ToDo-Aufgabe.
 * @returns Die gefundenen ToDo-Aufgabe oder undefined, wenn keine gefunden wurde.
 */

export function getToDoById(id: number): ToDo | undefined {
  const toDos = getToDos()  // Abrufen der Liste von ToDo-Aufgaben
  const toDo = toDos.find(todo => todo.id === id) // Suchen der ToDo-Aufgabe mit der angegebenen ID
  return toDo // Rückgabe der gefundenen ToDo-Aufgabe oder undefined
}

/**
 * Schreibt die ToDo-Daten in eine JSON-Datei.
 * @param oldToDos Die zu schreibenden ToDo-Daten.
 */

export function writeToDoToFile(oldToDos: ToDo[]): void { 
  const newToDos: ToDoRaw = { todo: oldToDos } // Konvertieren der ToDo-Daten in das benötigte Format
  fs.writeFileSync('data/todos.json', JSON.stringify(newToDos)) // Schreiben der Daten in die Datei 'data/todos.json'
}

/**
 * Fügt eine neue ToDo-Aufgabe hinzu.
 * @param todo Der Titel der Aufgabe.
 * @param deadline Das Fälligkeitsdatum der Aufgabe.
 * @param assignee Der Verantwortliche für die Aufgabe.
 * @param owner Der Ersteller der Aufgabe.
 * @param status Der Status der Aufgabe.
 */

export function addToDo(todo: string, deadline: string, assignee: string, owner: string, status: "not started" | "in progress" | "ready for review" | "in review" | "done"): void {
  const oldToDos = getToDos() || []; // Abrufen der vorhandenen ToDo-Liste oder Initialisieren mit einem leeren Array
  const id = oldToDos.length + 1; // Generieren einer neuen ID
  if (!["not started", "in progress", "ready for review", "in review", "done"].includes(status)) { // Überprüfen, ob der Status gültig ist
    throw new Error("Ungültiger Statuswert."); // Fehler werfen, wenn der Status ungültig ist
  }
  const newToDo: ToDo = new ToDo(id, todo, deadline, assignee, owner, status); // Erstellen eines neuen ToDo-Objekts
  oldToDos.push(newToDo); // Hinzufügen des neuen ToDo-Objekts zur Liste
  writeToDoToFile(oldToDos); // Schreiben der aktualisierten ToDo-Daten in die Datei
}

/**
 * Aktualisiert eine vorhandene ToDo-Aufgabe.
 * @param id Die ID der zu aktualisierenden ToDo-Aufgabe.
 * @param todo Der aktualisierte Titel der Aufgabe.
 * @param deadline Das aktualisierte Fälligkeitsdatum der Aufgabe.
 * @param assignee Der aktualisierte Verantwortliche für die Aufgabe.
 * @param owner Der aktualisierte Ersteller der Aufgabe.
 * @param status Der aktualisierte Status der Aufgabe.
 */

export function updateToDo(id: number, todo: string, deadline: string, assignee: string, owner: string, status: "not started" | "in progress" | "ready for review" | "in review" | "done"): void {
  const oldToDos = getToDos() // Abrufen der vorhandenen ToDo-Liste
  const filteredToDos = oldToDos.filter(todo => todo.id !== id) // Filtern der ToDo-Liste, um die zu aktualisierende Aufgabe auszuschließen
  if (!["not started", "in progress", "ready for review", "in review", "done"].includes(status)) { // Überprüfen, ob der Status gültig ist
    throw new Error("Ungültiger Statuswert."); // Fehler werfen, wenn der Status ungültig ist
  }
  const newToDo: ToDo = new ToDo(id, todo, deadline, assignee, owner, status) // Erstellen eines neuen ToDo-Objekts mit den aktualisierten Daten
  filteredToDos.push(newToDo) // Hinzufügen des aktualisierten ToDo-Objekts zur Liste
  writeToDoToFile(filteredToDos) // Schreiben der aktualisierten ToDo-Daten in die Datei
}

/**
 * Löscht eine ToDo-Aufgabe anhand ihrer ID.
 * @param id Die ID der zu löschenden ToDo-Aufgabe.
 */

export function deleteToDoById(id: number): void {
  const oldToDos = getToDos() // Abrufen der vorhandenen ToDo-Liste
  const filteredToDos = oldToDos.filter(todo => todo.id !== id) // Filtern der ToDo-Liste, um die zu löschende Aufgabe auszuschließen
  writeToDoToFile(filteredToDos) // Schreiben der aktualisierten ToDo-Daten in die Datei
}
