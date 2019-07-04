import React from 'react';
import Card from 'react-bootstrap/Card';
import CardColumns from 'react-bootstrap/CardColumns';
import '../CategoryList.css';
import '../style.css';
import {Link} from 'react-router-dom';

export default class CategoryListComponent extends React.Component{

	render(){
		return(
			<div>
				<h3 className="montserrat">All Categories</h3>
				<h5 className="montserrat description">Select a category to start with</h5>
				<center>
				<div className="grid-list">
					<CardColumns>
					{this.props.categories.map((item, key) =>
						<Card key={key} className="grid-item" style={{ width: '18rem' }}>
							<Card.Img variant="top" src={'http://74714d2c.ngrok.io/api' + item.cover} />
							<Card.Body>
								<Card.Title className="montserrat">{ item.word }</Card.Title>
								<Card.Text className="montserrat description">{ item.description }</Card.Text>
								<Link className="montserrat btn-link" to={"posts/" + item.id + "/"}><strong>Get started</strong></Link>
							</Card.Body>
						</Card>
					)}
					</CardColumns>
				</div>
				</center>
			</div>
		);
	}
}
