import { action, computed , observable } from 'mobx';
import { Todo, TodoFilter } from '../models';

export class TodoStore {
  @observable todos: Todo[] = [];
  @observable filter: TodoFilter = TodoFilter.All;

  @computed
  get active() {
    return this.todos.filter(x => !x.completed);
  }

  @computed
  get completed() {
    return this.todos.filter(x => x.completed);
  }

  @computed
  get filtered(): Todo[] {
    let filteredTodos: Todo[] = [];

    switch(this.filter) {
      case TodoFilter.Active:
        filteredTodos = this.active;
        break;
      case TodoFilter.Completed:
        filteredTodos = this.completed;
        break;
      default:
        filteredTodos = this.todos;
        break;
    }

    return filteredTodos;
  }

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

  @action
  setTodoFilter = (filter: TodoFilter): void => {
    this.filter = filter;
  }
}
