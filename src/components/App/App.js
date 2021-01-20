import React from 'react';
import { HashRouter as Router, Route, NavLink } from 'react-router-dom';
import Card from '@material-ui/core/Card';
import MenuList from '@material-ui/core/MenuList';
import styles from './App.module.css';
import About from '../About/About';
import Todo from '../Todo/Todo';

const App = () =>
(<Router>
  <div className={styles.wrap}>
    <Card className={styles.sidebar}>
      <MenuList className = {styles.menu}>
        <NavLink exact to='/' className={styles.link} activeClassName={styles.active}>
          Обо мне
        </NavLink>
        <NavLink to='/todo' className={styles.link} activeClassName={styles.active}>
          Мои дела
        </NavLink>
      </MenuList>
    </Card>
    <Card className={styles.content}>
      <Route path='/' exact component={About} />
      <Route path='/todo' component={Todo} />
    </Card>
  </div>
</Router>)

export default App;