export class ToDo {
    id: number;
    todo: string;
    deadline: string;
    assignee: string;
    owner: string;
    status: string;

  
    constructor(id: number, todo: string, deadline: string, assignee: string, owner: string, status:  string) {
      this.id = id;
      this.todo = todo;
      this.deadline = deadline;
      this.assignee = assignee;
      this.owner = owner;
      this.status = status;
    }
  }