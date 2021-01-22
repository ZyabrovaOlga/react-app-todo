import React, { useState, useEffect } from 'react';
import Card from '@material-ui/core/Card';
import ItemList from '../ItemList/ItemList';
import InputItem from '../InputItem/InputItem';
import Button from '@material-ui/core/Button';
import Footer from '../Footer/Footer';
import styles from './Todo.module.css';
import ButtonGroup from '@material-ui/core/ButtonGroup';

const Todo = () => {
  const initialState = {
    items: JSON.parse(localStorage.getItem('items')) || [
      {
        value: 'Работа',
        isDone: false,
        id: 1,
      },
      {
        value: 'Учеба',
        isDone: false,
        id: 2,
      },
      {
        value: 'Сон',
        isDone: true,
        id: 3,
      }
    ],
    count: JSON.parse(localStorage.getItem('count')) || 2,
    countDone: JSON.parse(localStorage.getItem('countDone')) || 1,
    countAll: JSON.parse(localStorage.getItem('countAll')) || 3,
  };

  const [items, setItems] = useState (initialState.items);
  const [visibleItems, setVisibleItems] = useState (initialState.items);
  const [filter, setFilter] = useState('all');
  const [count, setCount] = useState (initialState.count);
  const [countDone, setCountDone] = useState (initialState.countDone);
  const [countAll, setCountAll] = useState (initialState.countAll);

  useEffect(() => {
    setVisibleItems(items);
 }, [items]);

 useEffect(() => {
   onClickFilter(filter);
 }, [items]);

 useEffect(() => {
   localStorage.setItem('items', JSON.stringify(items));
 });

 useEffect(() => {
   localStorage.setItem('count', JSON.stringify(count));
 });

 useEffect(() => {
   localStorage.setItem('countDone', JSON.stringify(countDone));
 });

 useEffect(() => {
   localStorage.setItem('countAll', JSON.stringify(countAll));
 });

  const onClickDone = id => {
    const newItemList = items.map(item => {
      const newItem = { ...item };
      if (item.id === id) {
        newItem.isDone = !item.isDone;
      }
      return newItem;
    });
    const newCount = newItemList.filter(newItem => newItem.isDone !== true).length;
    const newCountDone = newItemList.filter(newItem => newItem.isDone === true).length;
    const newCountAll = newItemList.length;
    setItems(newItemList);
    setCount(newCount);
    setCountDone(newCountDone);
    setCountAll(newCountAll);
  };

    const onClickDelete = id => {
      const deleteItemList = items.filter(item => item.id !==id);
      deleteItemList.forEach(item => {
        if (item.id > id) {
          item.id--
        };
      });

      const newCount = deleteItemList.filter(newItem => newItem.isDone !== true).length;
      const newCountDone = deleteItemList.filter(newItem => newItem.isDone === true).length;
      const newCountAll = deleteItemList.length;
      setItems(deleteItemList);
      setCount(newCount);
      setCountDone(newCountDone);
      setCountAll(newCountAll);
    };

    const onClickAdd = (value) => {
        const newItemList = [
          ...items,
          {
            value,
            isDone: false,
            id: countAll + 1,
          }
        ];

      setItems(newItemList);
      setCount(count => count + 1);
      setCountAll(countAll => countAll + 1);
    };

    const onClickDelAll = isDone => {
      const deleteItemList = items.filter(item => item.isDone !== true);
      const newCountAll = deleteItemList.length;
      setItems(deleteItemList);
      setCountDone(0);
      setCountAll(newCountAll);
    };

    const onClickFilter = e => {
      let filterItemList = items;
      switch (e) {
        case 'all':
          filterItemList = items;
          break;
        case 'active':
          filterItemList = items.filter(item => item.isDone !== true);
          break;
        case 'completed':
          filterItemList = items.filter(item => item.isDone === true);
          break;
        default:
          filterItemList = initialState.items;
      }
      setVisibleItems(filterItemList);
      setFilter(e);
    }


  return (
    <div className={styles.wrap}>
      <h1 className={styles.title}>Список дел:</h1>
      <InputItem
        items={items}
        onClickAdd={onClickAdd}/>
      <Card className = {styles.card}>
        <ItemList
          items={visibleItems}
          onClickDone={onClickDone}
          onClickDelete={onClickDelete}
          onClickFilter={onClickFilter}
        />
		<ButtonGroup className={styles.btn} variant="text" size="small" color="secondary" aria-label="text primary button group">
          <Button id="all" onClick={(e) => onClickFilter('all')}>All</Button>
          <Button id="active" onClick={(e) => onClickFilter('active')}>Active</Button>
          <Button id="completed" onClick={(e) => onClickFilter('completed')}>Completed</Button>
        </ButtonGroup>
        <Footer
          count={count}
          countDone={countDone}
          countAll={countAll}
          onClickDelAll={onClickDelAll}/>
      </Card>
    </div>
  )
}

export default Todo;
