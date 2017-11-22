import { computed, observable } from 'mobx';


export class Todo {
  static nextId = 1;

  readonly id: number;
  readonly created: Date;

  @observable public text: string;
  @observable public completed: boolean;

  constructor(text: string, completed: boolean = false) {
    this.id = Todo.generateId();
    this.created = new Date;

    this.text = text;
    this.completed = completed;
  };

  static generateId() {
    return this.nextId++;
  }
}
