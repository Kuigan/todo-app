export class ToDo {
    id: number;
    todo: string;
    deadline: string;
    assignee: string;
    owner: string;
    status: "not started" | "in progress" | "ready for review" | "in review" | "done"; // Typdefinition für den Status

  
    constructor(id: number, todo: string, deadline: string, assignee: string, owner: string, status: "not started" | "in progress" | "ready for review" | "in review" | "done") {
      this.id = id;
      this.todo = todo;
      this.deadline = deadline;
      this.assignee = assignee;
      this.owner = owner;
      this.status = status;
    }
  }