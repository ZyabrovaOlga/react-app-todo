import React from 'react';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';
import styles from './InputItem.module.css';

class InputItem extends React.Component {
	state = {
		inputValue: '',
		items: [],
		inputLabel: 'Новое дело'
	};

	onButtonClick = () => {
		if(this.state.inputValue !== '') {
			if(this.props.items.some((item) => this.state.inputValue.toLowerCase() === item.value.toLowerCase())) {
				this.setState({
					inputValue: '',
					inputLabel: <span className={styles.color}>Такое дело уже есть</span>
				});
			} else {
				this.setState({
					inputValue: ''
				});
				this.props.onClickAdd(this.state.inputValue.charAt(0).toUpperCase() + this.state.inputValue.toLowerCase().slice(1));
			}	
		} else {
			this.setState({
				inputLabel: <span className={styles.color}>Ошибка: Пустое поле</span>
			});
		}	
		console.log(this.props.onClickAdd)
	}

	render() {
		//eslint-disable-next-line
		const { onClickAdd, items } = this.props;

		return (<div className={styles.input}>
			<TextField 
		        label={this.state.inputLabel}
		        className={styles.text}
		        value={this.state.inputValue}
		        onClick={() => this.setState({inputLabel: 'Новое дело'})}
		        onChange={event => this.setState({inputValue: event.target.value.toUpperCase()})}
		    />
		    <button 
		    	className={styles.button} 
			    onClick={this.onButtonClick}>
			    Добавить
			</button>
		</div>);
	}
}

InputItem.propTypes = {
	value: PropTypes.oneOfType([
		PropTypes.string,
		PropTypes.number
	])
};

export default InputItem;