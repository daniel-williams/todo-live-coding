import { Todo } from '../../../models';

export interface TodoItemActions {
  addTodo?: (data: Partial<Todo>) => void;
  editTodo?: (id: number, data: Partial<Todo>) => void;
  removeTodo?: (id: number) => void;
}
