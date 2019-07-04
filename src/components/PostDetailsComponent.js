import React from 'react';
import axios from 'axios';
import Gist from 'react-gist';
import ReactHtmlParser from 'react-html-parser';
import YouTube from 'react-youtube';
import { Link } from 'react-router-dom';

export default class PostDetailsComponent extends React.Component{

	constructor(props){
		super(props);

		this.state = {
			currentPost: null,
			allPosts: [],
			tags: [],
			tokens: []
		}
	}

	componentWillMount(){
		var self = this;
		axios.get('http://74714d2c.ngrok.io/api/post/' + this.props.match.params.post + '/')
		.then(res => {
			self.setState({
				currentPost: res.data,
				tokens: res.data.content.split("**"),
				tags: res.data.tags.split(",")
			})
			console.log(self.state.tags)

		})
		.catch(err => {
			console.log(err)
		})

		axios.get('http://74714d2c.ngrok.io/api/post/?category=' + this.props.match.params.category)
		.then(res => {
			self.setState({
				allPosts: res.data,
			})
			console.log(self.state.allPosts)

		})
		.catch(err => {
			console.log(err)
		})
	}

	componentDidUpdate(prevProps){
		if(this.props.match.params.post !== prevProps.match.params.post){
			var self = this;
			axios.get('http://74714d2c.ngrok.io/api/post/' + this.props.match.params.post + '/')
			.then(res => {
				self.setState({
					currentPost: res.data,
					tokens: res.data.content.split("**"),
					tags: res.data.tags.split(",")
				})
				console.log(self.state.tags)

			})
			.catch(err => {
				console.log(err)
			})
		}
	}

	updatePost(){
		var self = this;
		axios.get('http://74714d2c.ngrok.io/api/post/' + this.props.match.params.post + '/')
		.then(res => {
			self.setState({
				currentPost: res.data,
				tokens: res.data.content.split("**")
			})
			console.log(self.state.currentPost)
			window.location = '/post/' + self.props.match.params.category + '/' + self.props.match.params.post + '/';
		})
		.catch(err => {
			console.log(err)
		})
	}

	isAComponent(token){
		if(token[0] === '<' ||(isNaN(parseFloat(token[0])))){
			return true;
		}else{
			return false;
		}
	}

	renderYoutube(){
		if(this.state.currentPost.youTubeUrl === null){
			return null;
		}
		return(
			<YouTube videoId={this.state.currentPost.youTubeUrl}/>
		);
	}

	renderTitle(){
		if(this.state.currentPost === null || this.state.currentPost === undefined || this.state.currentPost === []){
			return null;
		}
		return (
			<div>
				<h1>{ReactHtmlParser(this.state.currentPost.title)}</h1>
				<hr/>
				<h4 className="description">{ReactHtmlParser(this.state.currentPost.description)}</h4>
				<hr/>
				{this.renderYoutube()}
				<hr/>
			</div>
		);
	}

	renderSummary(){
		if(this.state.currentPost === null || this.state.currentPost === undefined || this.state.currentPost === []){
			return null;
		}
		return (
			<div>
				<h1>{ReactHtmlParser(this.state.currentPost.summary)}</h1>
			</div>
		);
	}

	isTagEmpty(){
		return (this.state.tags === null || this.state.tags === undefined || this.state.tags === [] || this.state.tags.length == 0);
	}

	render(){
		return(
			<div className="row" style={{ marginTop: "20px"}}>
				<div className="col-md-2">
					{
						this.state.allPosts.map((post, key)=>
							<div>
								<Link to={ '/post/' + this.props.match.params.category + '/' + post.id + '/' }
									onClick={this.updatePost.bind(this)}
									style={{ marginLeft: "10px"}}>
									{post.title}
								</Link>
								<hr/>
							</div>
						)
					}
				</div>
				<div className="col-md-8 montserrat" style={{ borderLeft: "1px solid #78909c"}}>
					<div>
						{this.renderTitle()}
					</div>
					<div>
						{
							this.state.tokens.map((item, key) =>
								this.isAComponent(item) ?
									<h3>{ReactHtmlParser(item)}</h3>
								: <div><Gist id={item}/></div>
							)
						}
					</div>
					<div>
						<hr/>
						{this.renderSummary()}
					</div>
				</div>
				<div className="col-md-2">
					<center>
					<div style={{ display: "inline-block"}}>
						{
							this.isTagEmpty() ? null :
							this.state.tags.map((tag, key) =>
								<div className="tag white montserrat">{tag}</div>
							)
						}
					</div>
					</center>
				</div>
			</div>
		);
	}
}
