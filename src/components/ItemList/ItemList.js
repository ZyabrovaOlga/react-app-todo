import React from 'react';
import PropTypes from 'prop-types';
import Item from '../Item/Item';
import classnames from 'classnames';
import styles from './ItemList.module.css';

const ItemList = ({ items, onClickDone, onClickDelete, onClickDelAll, onClickFilter }) => (
    <ul className={styles.list}>
    {items.map(item => <li key={item.value} className={classnames({
           [styles.done]: item.isDone
         })
         }>
              <Item
              value={item.value}
              isDone={item.isDone}
              id={item.id}
              onClickDone={onClickDone}
              onClickDelete={onClickDelete}
              onClickDelAll={onClickDelAll}
              onClickFilter={onClickFilter}
              />
         </li>)}
    </ul>
);

ItemList.propTypes = {
	items: PropTypes.array
};

export default ItemList;