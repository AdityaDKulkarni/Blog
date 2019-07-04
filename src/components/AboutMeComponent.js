import React from 'react';
import aditya from '../assets/aditya.jpeg';
import Card from 'react-bootstrap/Card';

export default class AboutMeComponent extends React.Component{
	render(){
		return(
			<div className="row montserrat">
				<div className="col-md-6">
					<img className="profile" src={aditya} alt='picture'/>
				</div>
				<div className="col-md-6">
					<div>
						<Card style={{padding: "10px", margin: "10px"}}>
							<center>
								<div style={{display: "flex", flexDirection: "column", padding: "20px"}}>

									<h3>Aditya D. Kulkarni</h3>
									<h4>DOB: 31/12/1997</h4>
									<h5>
										I'm studying B.E.(Computer) at MMCOE, Pune.<br/>
										I was born in Kolhapur, Maharashtra.<br/>
										Completed my school and junior college in Kolhapur.<br/>
										Studied dimploma from Sanjay Ghodawat Polytechnic.<br/>
										I'm a freelancer. Specialized in Android application development. 
									</h5>
								</div>
							</center>

						</Card>
					</div>
				</div>
			</div>
		);
	}
}
