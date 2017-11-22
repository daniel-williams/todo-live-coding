import * as React from 'react';
import * as classNames from 'classnames';
import { Todo } from '../../../models';
import { TodoItemActions } from './todo-item-actions';
import { TodoItemEditor } from './todo-item-editor.component';
import { TodoItemPresenter } from './todo-item-presenter.component';
import * as styles from './todo-item.component.scss';

interface TodoItemProps extends TodoItemActions {
  todo: Todo;
}

interface TodoItemState {
  editing: boolean;
}

export class TodoItem extends React.Component<TodoItemProps, TodoItemState> {
  state = { editing: false };

  private handleEdit = () => {
    const { todo } = this.props;

    if(!todo.completed) {
      this.setState({ editing: true });
    }
  }

  private handleSave = (text: string) => {
    this.updateTodo({text});
  }

  private handleToggleCompleted = () => {
    const { todo } = this.props;

    this.updateTodo({ completed: !todo.completed });
  }

  private handleRemove = () => {
    const { todo, removeTodo } = this.props;

    removeTodo(todo.id);
  }

  private updateTodo = (data: Partial<Todo>) => {
    const { todo } = this.props;

    if (data.text !== undefined && data.text.trim().length === 0) {
      this.props.removeTodo(todo.id);
    } else {
      this.props.editTodo(todo.id, data);
    }

    this.setState({ editing: false });
  }

  render() {
    const { todo } = this.props;
    const elClasses = classNames(styles.itemWrap, {
      [styles.completed]: todo.completed,
    });
    const completedClasses = classNames(styles.icon, styles.completedIcon, 'fa', {
      'fa-square-o': !todo.completed,
      'fa-check-square-o': todo.completed
    });
    const deletedClasses = classNames(styles.icon, 'fa', 'fa-times');
    const editorEl = this.state.editing
      ? <TodoItemEditor text={todo.text} onSave={this.handleSave} />
      : null;

    return (
      <li className={elClasses}>
        <i className={completedClasses} onClick={this.handleToggleCompleted}></i>
        <div className={styles.item}>
          {editorEl}
          <TodoItemPresenter text={todo.text} completed={todo.completed} onEdit={this.handleEdit} />
        </div>
        <i className={deletedClasses} onClick={this.handleRemove}></i>
      </li>
    );
  }
}
