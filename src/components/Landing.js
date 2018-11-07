import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
	Container,
	Row,
	Col,
  Button
} from 'reactstrap';

class Landing extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false
    };
  }

  toggle() {
    this.setState({ isOpen: !this.state.isOpen })
  }

	render() {
	return (
	<section className="landing">
	<header>
		<Navbar color="faded" light expand="sm">
			<NavbarBrand><Link to="/" className="nav-brand"><span className="icon ion-md-microphone"></span>WebJams</Link></NavbarBrand>
			<NavbarToggler onClick={this.toggle} />
			<Collapse isOpen={this.state.isOpen} navbar>
			<Nav className="ml-auto" navbar>
      <NavItem>
				<NavLink><Link to="/" className="brand">Landing</Link></NavLink>
      </NavItem>
      <NavItem>
				<NavLink><Link to="/library">Library</Link></NavLink>
      </NavItem>
		   </Nav>
		</Collapse>
		</Navbar>
		</header>
		<Container>
		<Row className="selling-points">
			<Col sm="12" md="4" className="point">
				<h2 className="point-title"> Choose your music </h2>
				<p className="point-description">
				The world is full of music; Why should you have to listen to music that someone else chose?
				</p>
			</Col>
			<Col sm="12" md="4" className="point">
				<h2 className="point-title"> Unlimited, streaming, ad-free </h2>
				<p className="point-description">
				No arbitrary limits. No distractions.
				</p>
			</Col>
			<Col sm="12" md="4" className="point">
				<h2 className="point-title"> Mobile enabled </h2>
				<p className="point-description">
				Listen to music on the go. This streaming service is available on all mobile platforms.
				</p>
			</Col>
			</Row>
      	<hr />
      <Row>
        <Col>
          <h2 className="latest-albums"> Listen to these latest albums </h2>
          <p className="music"> "The Colors" and "The Telephone" </p>
          <img src="./assets/images/album_covers/01.jpg" alt="the-colors-album-colver" width="200px"/>
          <img src="./assets/images/album_covers/02.jpg" alt="the-telephone-album-color" width="200px"/>
        </Col>
      </Row>
      <Row>
        <Col>
          <Button className="view-music" color="primary"><Link to="/library">View Music</Link></Button>
        </Col>
      </Row>
			</Container>
      <footer>
        <Row>
        <Col>
        <li><a href="">About</a></li>
        <li><a href="">Contact Us</a></li>
        <li><a href="">Request New Music</a></li>
        <li><a href="">Employment</a></li>
        </Col>
        </Row>
        <Row>
          <Col>
            <small>&copy; WebJams 2018</small>
          </Col>
        </Row>
      </footer>
		</section>
		);
	}
}

export default Landing;
