import React from 'react';
import io from 'socket.io-client';

export default class TextBox extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
			messages: []
		}
		this.handleSubmit = this.handleSubmit.bind(this);

	}

	componentDidMount() {
		this.socket = io('/');
		this.socket.on('message', message => {
			console.log('message', message);
			// let newMessage = JSON.parse(message.body);
			// console.log('newMessage', newMessage.data.translations[0].translatedText);
			this.setState({ messages: [message, ...this.state.messages] });
			console.log('this.state', this.state);
		})
	}

	handleSubmit(event) {
		const newMessage = event.target.value;
		if(event.keyCode === 13 && newMessage) {
			const message = {
				body: newMessage,
				from: 'Me'
			}
			this.setState({ messages: [message, ...this.state.messages] });
			this.socket.emit('message', newMessage);
			event.target.value = '';
		}
	}

	render() {

		return (
			<div className="container" style={styles.container}>

				<ul>
					{this.state.messages.map((message, index) => {
						return <li key={index}>{message.body}</li>
					})}
				</ul>

				<div className="row" style={styles.sendMessage}>
					<input
						className="col-md-8 col-xs-8 col-sm-8"
						type="text"
						placeholder="Enter a message.."
						onKeyUp={this.handleSubmit}
						style={styles.textBox}
						/>

					<button className="btn btn-success-outline btn-lg">
						Send
					</button>
				</div>

		</div>
		)
	}
}

const styles = {
	container: {
	},

	sendMessage: {
		bottom: 10,
		position: 'fixed',
		width: '100%'
	},
	textBox: {
		height: 50,
		marginRight: 10
	}
}
