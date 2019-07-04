import React from 'react';
import axios from 'axios';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import {Link} from 'react-router-dom';
import '../PostComponent.css';

export default class PostComponent extends React.Component{

	constructor(props){
		super(props);

		this.state = {
			posts: [],
			categories: []
		}
	}

	componentWillMount(){
		var self = this;
		axios.get("http://74714d2c.ngrok.io/api/post/?category=" + this.props.match.params.category)
		.then(res => {
			self.setState({
				posts: res.data
			})
		})
		.catch(err => {
			console.log(err)
		})

		axios.get("http://74714d2c.ngrok.io/api/category/")
		.then(res => {
			self.setState({categories: res.data})
			console.log(self.state.categories)
		})
		.catch(err => {
			console.log(err)
		})
	}

	componentDidUpdate(prevProps){
		if(this.props.match.params.category != prevProps.match.params.category){
			this.getPosts(this.props.match.params.category);
		}
	}

	getPosts(id){
		var self = this;
		axios.get("http://74714d2c.ngrok.io/api/post/?category=" + id)
		.then(res => {
			self.setState({
				posts: res.data
			})
			window.location = '/posts/' + id + '/';
		})
		.catch(err => {
			console.log(err)
		})
	}

	renderError(){
		if(this.state.posts.length == 0){
			return (<div><center><h3>Oops! No posts yet. We are working on it!</h3></center></div>)
		}
		return (<h3 className="montserrat">All Posts</h3>);
	}

	render(){
		return (
			<div>
				<div className="row" style={{ marginTop: "20px", marginBottom: "20px"}}>
					<div className="col-md-3">
						<h3 className="montserrat" style={{ marginLeft: "15px" }}>All Categories</h3>
						{
							/*this.state.categories.map((item, key) =>
								<Card
									key={key}
									className={ "list" + (item.id == this.props.match.params.category ? ' active' : '')}
									onClick={this.getPosts.bind(this, item.id)}>
									<Card.Title
										className="montserrat"
										style={{ textAlign: "center", paddingTop: "10px" }}>
										{item.word}
									</Card.Title>
								</Card>
							)*/

							this.state.categories.map((item, key) =>
									<Button
										key={key}
										className={(item.id == this.props.match.params.category ? ' list btn-success' : 'list btn-dark') }
										style={{ width: "100%" }}
										onClick={this.getPosts.bind(this, item.id)}>
										{item.word}
									</Button>
							)
						}
					</div>
					<div className="col-md-8">
						{this.renderError()}
						{
							this.state.posts.map((item, key) =>
								<Card key={key} className="list-item">
									<Card.Body>
										<Card.Title className="montserrat">{ item.title }</Card.Title>
										<hr/>
										<Card.Text className="montserrat description">{ item.description }</Card.Text>
										<hr/>
										<Link className="montserrat btn-link" to={ '/post/' + this.props.match.params.category + '/' + item.id + '/' }><strong>Get started</strong></Link>
									</Card.Body>
								</Card>
							)
						}
					</div>
				</div>
			</div>
		);
	}
}
