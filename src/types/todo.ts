/**
 * Repräsentiert eine ToDo-Aufgabe.
 */
export class ToDo {
  id: number; // Die eindeutige ID der Aufgabe
  todo: string; // Der Titel oder die Beschreibung der Aufgabe
  deadline: string; // Das Fälligkeitsdatum der Aufgabe
  assignee: string; // Der Verantwortliche für die Aufgabe
  owner: string; // Der Ersteller der Aufgabe
  status: "not started" | "in progress" | "ready for review" | "in review" | "done"; // Der Status der Aufgabe

  /**
   * Erstellt eine neue ToDo-Aufgabe.
   * @param id Die eindeutige ID der Aufgabe.
   * @param todo Der Titel oder die Beschreibung der Aufgabe.
   * @param deadline Das Fälligkeitsdatum der Aufgabe.
   * @param assignee Der Verantwortliche für die Aufgabe.
   * @param owner Der Ersteller der Aufgabe.
   * @param status Der Status der Aufgabe.
   */
  constructor(id: number, todo: string, deadline: string, assignee: string, owner: string, status: "not started" | "in progress" | "ready for review" | "in review" | "done") {
    this.id = id;
    this.todo = todo;
    this.deadline = deadline;
    this.assignee = assignee;
    this.owner = owner;
    this.status = status;
  }
}
