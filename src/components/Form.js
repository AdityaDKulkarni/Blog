import React from 'react';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
export default class Form extends React.Component{

	constructor(props){
		super(props);

		this.state = {
			gists: [],
			categories: [],
			tags: [],
			gistId: undefined,
			gistName: undefined,
			gistDesc: undefined
		}
	}

	componentWillMount(){
		var self = this;
		axios.get("http://74714d2c.ngrok.io/api/gist/")
		.then(res => {
			self.setState({gists: res.data})
			console.log(self.state.gists)
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
		axios.get("http://74714d2c.ngrok.io/api/tag/")
		.then(res => {
			self.setState({tags: res.data})
			console.log(self.state.tags)
		})
		.catch(err => {
			console.log(err)
		})
	}

	createGist = function(){
		var self = this;
		if(this.state.gistId === undefined || this.state.gistName === undefined || this.state.gistDesc === undefined){
			alert("All fields required!");
		}else{
			axios({
				method: 'post',
				url: 'http://74714d2c.ngrok.io/api/gist/',
				headers:{
					'Content-Type': 'application/json'
				},
				data:{
					'id': self.state.gistId,
					'name': self.state.gistName,
					'description': self.state.gistDesc
				}
			}).then(res => {
				alert("Gist created");
			}).catch(err => {
				console.log(err)
			})
		}
	}

	onChangeGistId = function(event){
		this.setState({
			gistId: event.target.value
		})
		console.log(event.target.value);
	}

	onChangeGistName = function(event){
		this.setState({
			gistName: event.target.value
		})
		console.log(event.target.value);
	}

	onChangeGistDesc = function(event){
		this.setState({
			gistDesc: event.target.value
		})
		console.log(event.target.value);
	}

	render(){
		return(
			<div>
				<div className="row">
					<div className="col-md-6">
						<center>Create A Gist</center>
						<form  style={{ margin: "5px"}}>
							<div className="form-group">
								<span>Gist ID</span>
								<input type="text" className="form-control" onChange={this.onChangeGistId.bind(this)}/>
							</div>
							<div className="form-group">
								<span>Name</span>
								<input type="text" className="form-control" onChange={this.onChangeGistName.bind(this)}/>
							</div>
							<div className="form-group">
								<span>Description</span>
								<textarea cols="20" rows="5" className="form-control" onChange={this.onChangeGistDesc.bind(this)}/>
							</div>
							<center>
								<Button
									variant="primary"
									onClick={this.createGist.bind(this)}>Submit</Button></center>
						</form>
					</div>
					<div className="col-md-6">
						<center>Create A Post</center>
						<form  style={{ margin: "5px"}}>
							<div className="form-group">
								<span>Title</span>
								<input type="text" className="form-control"/>
							</div>
							<div className="form-group">
								<span>Description</span>
								<textarea rows="5" cols="20" className="form-control"/>
							</div>
							<div className="form-group">
								<span>YouTube url</span>
								<input type="text" className="form-control"/>
							</div>
							<div className="form-group">
								<span>Content</span>
								<textarea rows="5" cols="20" className="form-control"/>
							</div>
							<div className="form-group">
								<span>Gists&nbsp;<small className="description">Hold "ctrl" to select multiple</small></span>
								<select className="form-control" multiple>
									<option value="">Select Gists</option>
									{
										this.state.gists.map((gist, key) =>
											<option value={gist.name}>{gist.name} - ({gist.id})</option>
										)
									}
								</select>
							</div>
							<div className="form-group">
								<span>Category</span>
								<select className="form-control">
									<option value="">Select a Category</option>
									{
										this.state.categories.map((cat, key) =>
											<option value={cat.word}>{cat.word}</option>
										)
									}
								</select>
							</div>
							<div className="form-group">
								<span>Tags&nbsp;<small className="description">Hold "ctrl" to select multiple</small></span>
								<select className="form-control" multiple>
									<option value="">Select Tags</option>
									{
										this.state.categories.map((tag, key) =>
											<option value={tag.word}>{tag.word}</option>
										)
									}
								</select>
							</div>
							<div className="form-group">
								<span>Summary</span>
								<textarea rows="5" cols="20" className="form-control"/>
							</div>
							<center><Button variant="primary">Submit</Button></center>
						</form>
					</div>
				</div>
			</div>
		)
	}
}
