import React from 'react';
import PropTypes from 'prop-types';
import styles from './Footer.module.css';
import Button from '@material-ui/core/Button';

const Footer = ({count, e, countDone, countAll, onClickDelAll, onClickFilter}) => (
  <div className={styles.footer}>
    <div className={styles.subtitle}>Невыполненные:{count}</div>
    <div className={styles.subtitle}>Завершенные: {countDone}</div>
    <div className={styles.subtitle}>Все: {countAll}</div>
    <Button className={styles.btn} color="secondary" onClick={onClickDelAll}>Delete completed tasks</Button>
  </div>
)

Footer.defaultProps = {
    count: 0
};

Footer.propTypes = {
     count: PropTypes.number.isRequired
};

export default Footer;