import * as React from 'react';
import { inject, observer } from 'mobx-react';
import { Todo } from '../../models';
import { stores, TodoStore } from '../../stores';
import { TodosHeader } from './todos-header';
import { TodoList } from './todo-list';
import { TodosFooter } from './todos-footer';
import * as styles from './todos.component.scss';

@inject(stores.todos)
@observer
export class Todos extends React.Component<{}> {
  todoStore: TodoStore;

  constructor(props) {
    super(props);

    this.todoStore = this.props[stores.todos] as TodoStore;
  }

  render() {
    const { addTodo, filtered, setTodoFilter, removeCompleted, filter } = this.todoStore;
    const totalCount = filtered.length;
    const remainingCount = filtered.filter(x => !x.completed).length;

    return (
      <div className={styles.todoWrap}>
        <TodosHeader
          showToggle={!!filtered.length}
          addTodo={addTodo}
          toggleAll={this.handleToggleAll}
        />
        <div className={styles.todoItemsWrap}>
          {this.renderTodos(filtered)}
        </div>
        <TodosFooter
          totalCount={totalCount}
          remainingCount={remainingCount}
          setTodoFilter={setTodoFilter}
          removeCompleted={removeCompleted}
          currentFilter={filter}/>
      </div>
    );
  }

  renderTodos(todos: Todo[]) {
    const { editTodo, removeTodo, toggleCompleted } = this.todoStore;

    return todos.length
      ? <TodoList
          todos={todos}
          editTodo={editTodo}
          removeTodo={removeTodo}
          toggleCompleted={toggleCompleted} />
      : null;
  }

  private handleToggleAll = () => {
    const { filtered, toggleCompleted } = this.todoStore;

    toggleCompleted(!filtered.every(x => x.completed));
  }
}
