import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import logo from './logo.svg';
import git from './assets/git.png';
import facebook from './assets//facebook.svg';
import * as serviceWorker from './serviceWorker';
import { Route, BrowserRouter as Router } from 'react-router-dom';
import App from './App';
import PostComponent from './components/PostComponent';
import Form from './components/Form';
import PostDetailsComponent from './components/PostDetailsComponent';
import AboutMeComponent from './components/AboutMeComponent';
import Navbar from 'react-bootstrap/Navbar';
import NavLink from 'react-bootstrap/NavLink';
import NavItem from 'react-bootstrap/NavItem';
import { MDBCol, MDBContainer, MDBRow, MDBFooter } from "mdbreact";
import AdSense from 'react-adsense';

const router = (
	<Router>
		<div>
			<Navbar bg='dark' expand='lg' className="row">
				<Navbar.Brand className="col-md-9">
					<NavLink href="/">
						<NavItem className="white montserrat">
							<img
								alt=""
								src={logo}
								width="30"
								height="30"
								className="d-inline-block align-top"
							/>
							Kotlin
						</NavItem>
					</NavLink>
				</Navbar.Brand>
				<div style={{ display: "flex", flexDirection: "row"}}>
					<NavLink href="/aboutme/">
						<NavItem style={{marginRight: "10px"}} className="montserrat white">About me</NavItem>
					</NavLink>
					<NavLink href="/aboutme/">
						<NavItem style={{marginRight: "10px"}} className="montserrat white">Contact Me</NavItem>
					</NavLink>
				</div>
			</Navbar>
			<Route exact path="/" component={App} />
			<Route path="/posts/:category/" component={PostComponent} />
			<Route path="/post/:category/:post/" component={PostDetailsComponent} />
			<Route path="/create/" component={Form} />
			<Route path="/aboutme/" component={AboutMeComponent} />
			<MDBFooter hidden={true} className="bg-dark font-small pt-4 mt-4">
				<MDBContainer fluid className="text-center text-md-left montserrat white">
					<MDBRow>
						<MDBCol md="6">
							<h5 className="title">Kotlin</h5>
							<p>
								Name: Aditya Kulkarni.<br/>
								This blog was developed by me using ReactJS and Django.<br/>
								Contact: +918329410794<br/>
								Email: kulkarniaditya1997@gmail.com
							</p>
						</MDBCol>
						<MDBCol md="6">
							<h5 className="title">Links</h5>
							<p className="list-unstyled">
								<a href="https://github.com/AdityaDKulkarni" className="white">
									<img src={git} alt='github'/>
								</a>
							</p>
							<p className="list-unstyled">
								<a href="https://facebook.com/adk1997" className="white">
									<img src={facebook} alt='facebook' style={{ height:"36px", width: "36px"}}/>
								</a>
							</p>
							<p className="list-unstyled">
								<a href="#!" className="white">Link 3</a>
							</p>
							<p className="list-unstyled">
								<a href="#!" className="white">Link 4</a>
							</p>
						</MDBCol>
					</MDBRow>
				</MDBContainer>
				<div className="footer-copyright text-center py-3 white">
					<MDBContainer fluid >
						Developed by: Aditya D. Kulkarni
						</MDBContainer>
				</div>
			</MDBFooter>
		</div>
	</Router>
)

ReactDOM.render(router, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
