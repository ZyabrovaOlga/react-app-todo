import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import styles from './Item.module.css';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';

class Item extends React.Component {

  render() {
    const { value, id, isDone, onClickDone, onClickDelete} = this.props;
    return (
      <span>
        <span className={classnames({
        [styles.item]: true,
        [styles.done]: isDone
        })
      } 
      onClick = {() => onClickDone(id)}>
          {value}
        </span>
        <IconButton aria-label="delete" onClick = {() => onClickDelete(id)}>
          <DeleteIcon />
        </IconButton>
      </span>
    )
  }
}

Item.propTypes = {
	value: PropTypes.string,
    isDone: PropTypes.bool
};

Item.defaultProps = {
    isDone: false
};

export default Item;