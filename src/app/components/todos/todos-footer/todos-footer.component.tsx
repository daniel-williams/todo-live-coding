import * as React from 'react';
import * as styles from './todos-footer.component.scss';

interface TodosFooterProps {
  removeCompleted: () => void;
}

export class TodosFooter extends React.PureComponent<TodosFooterProps> {
  render() {
    const { removeCompleted } = this.props;

    return (
      <div className={styles.footerWrap}>
        <div className={styles.footerItem}>
          <div className={styles.removeCompleted} onClick={removeCompleted}><i className='fa fa-trash-o'></i> completed</div>
        </div>
      </div>
    );
  }

  renderRemoveCompleted() {
    const { removeCompleted } = this.props;

    return <div className={styles.removeCompleted} onClick={removeCompleted}><i className='fa fa-trash-o'></i> completed</div>;
  }
}
