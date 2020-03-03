import { action , observable } from 'mobx';
import { Todo } from '../models';

export class TodoStore {
  @observable todos: Todo[] = [];

  @action
  addTodo = (todo: Partial<Todo>): void => {
    this.todos.push(new Todo(todo.text, todo.completed));
  }

  @action
  editTodo = (id: number, data: Partial<Todo>): void => {
    this.todos = this.todos.map(x => x.id !== id
      ? x
      : {
        ...x,
        text: data.text ? data.text.toString() : x.text,
        completed: !!data.completed,
      });
  }

  @action
  removeTodo = (id: number): void => {
    this.todos = this.todos.filter(x => x.id !== id);
  }

  @action
  toggleCompleted = (completed: boolean = true): void => {
    this.todos = this.todos.map(x => ({
      ...x,
      completed
    }));
  }

  @action
  removeCompleted = (): void => {
    this.todos = this.todos.filter(x => !x.completed);
  }
}
