import * as React from 'react';
import * as classNames from 'classnames';

import * as styles from './todo-item-editor.component.scss';

interface TodoItemEditorProps {
  text?: string;
  placeholder?: string;
  newTodo?: boolean;
  editing?: boolean;
  onSave: (text: string) => any;
}

export interface TodoItemEditorState {
  text: string;
};

export class TodoItemEditor extends React.Component<TodoItemEditorProps, TodoItemEditorState> {
  constructor(props?: TodoItemEditorProps, context?: any) {
    super(props, context);

    this.state = {
      text: this.props.text || '',
    };
  }

  private handleKeyDown = (e) => {
    const text = e.target.value.trim();

    if(e.which === 13) {
      this.props.onSave(text);

      if(this.props.newTodo) {
        this.setState({ text: '' });
      }
    }
  }

  private handleChange = (e) => {
    this.setState({ text: e.target.value });
  }

  private handleBlur = (e) => {
    const text = e.target.value.trim();

    if(!this.props.newTodo) {
      this.props.onSave(text);
    }
  }

  render () {
    const { text, onSave } = this.props;
    const classes = classNames({
      [styles.editing]: !this.props.newTodo,
      [styles.new]: this.props.newTodo
    });

    return (
      <div className={styles.inputWrap}>
        <input className={classes}
          type="text"
          autoFocus
          placeholder={this.props.placeholder || 'remove'}
          value={this.state.text}
          onBlur={this.handleBlur}
          onChange={this.handleChange}
          onKeyDown={this.handleKeyDown} />
      </div>
    );
  }
}