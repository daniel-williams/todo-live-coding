import { action , observable } from 'mobx';
import { Todo } from '../models';

export class TodoStore {
  @observable todos: Todo[] = [];

  @action
  addTodo = (todo: Partial<Todo>): void => {
    this.todos.push(new Todo(todo.text, todo.completed));
  }

  @action
  editTodo = (id: number, todo: Partial<Todo>): void => {
    this.todos[id] = {...this.todos[id], ...todo};
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
