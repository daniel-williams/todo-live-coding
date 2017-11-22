import * as React from 'react';
import { Todos } from '../../components';
import * as styles from './root.component.scss';

export const Root = () => (
  <section className={styles.todoSection}>
    <Todos />
  </section>
);
