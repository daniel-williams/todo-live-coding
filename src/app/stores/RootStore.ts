import { TodoStore } from './TodoStore';

const todos = new TodoStore();

// MobX rootStore
export const rootStore = {
  todos,
};

export const stores = {
  todos: 'todos',
}
