import React from 'react';
import './App.css';
import axios from 'axios';
import CategoryListComponent from './components/CategoryListComponent';

class App extends React.Component {

	constructor(props){
		super(props);

		this.state = {
			categories: [],
		};
	}

	componentWillMount () {
		var self = this;
		axios.get("http://74714d2c.ngrok.io/api/category/")
		.then(res => {
			self.setState({categories: res.data})
			console.log(self.state.categories)
		})
		.catch(err => {
			console.log(err)
		})
	}

	render(){
		return (
			<div className="App">
				<div className="row" style={{ margin: "20px"}}>
					<div className="col-md-12">
						<CategoryListComponent categories = {this.state.categories}/>
					</div>
				</div>
			</div>
		);
	}
}

export default App;
