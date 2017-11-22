import * as React from 'react';
import * as classNames from 'classnames';
import { TodoFilter } from '../../../models';
import * as styles from './todos-footer.component.scss';

interface TodosFooterProps {
  setTodoFilter: (TodoFilter) => void;
  removeCompleted: () => void;
  totalCount: number;
  remainingCount: number;
  currentFilter: TodoFilter;
}

export class TodosFooter extends React.PureComponent<TodosFooterProps> {
  render() {
    const { totalCount } = this.props;
    const filterClasses = classNames();

    return (
      <div className={styles.footerWrap}>
        <div className={styles.footerItem}>
          <div className={styles.footerLabel}>status:</div>
          <div>{this.renderStatus()}</div>
        </div>
        <div className={styles.footerItem}>
          <div className={styles.footerLabel}>filters:</div>
          <div className={styles.filterWrap}>{this.renderFilters()}</div>
        </div>
        <div className={styles.footerItem}>
          {this.renderRemoveCompleted()}
        </div>
      </div>
    );
  }

  renderStatus() {
    const { remainingCount } = this.props;

    return remainingCount === 0
    ? <i className='fa fa-smile-o'></i>
    : remainingCount === 1
      ? <i className='fa fa-meh-o'></i>
      : <i className='fa fa-frown-o'></i>;
  }

  renderFilters() {
    const { setTodoFilter, currentFilter } = this.props;
    const filters = Object.keys(TodoFilter).map(x => TodoFilter[x]);
    const classes = classNames(styles.filterWrap, styles.footerItem);

    return filters.map(filter => {
      const classes = classNames(styles.footerButton, {
        [styles.active]: filter === currentFilter
      });

      return (
        <div
          key={filter}
          className={classes}
          onClick={() => setTodoFilter(filter)}>
          {filter}
        </div>
      );
    });
  }

  renderRemoveCompleted() {
    const { removeCompleted } = this.props;

    return <div className={styles.removeCompleted} onClick={removeCompleted}><i className='fa fa-trash-o'></i> completed</div>;
  }
}
