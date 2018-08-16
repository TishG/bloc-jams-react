import React, { Component } from 'react';
import albumData from './../data/albums';
import { Link } from 'react-router-dom';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink
} from 'reactstrap';


class Library extends Component {
	constructor(props) {
	super(props);
  this.toggle = this.toggle.bind(this);
	this.state = {
		albums: albumData,
    isOpen: false,
    isHovered: false
	};
}

toggle() {
  this.setState({ isOpen: !this.state.isOpen });
}

	render() {
	 return (
		 <div className="library-page">
		 <section className="library-header" style={{ height: "70px"}}>
		 <Navbar light expand="sm" style={{ backgroundColor: "maroon"}}>
			 <NavbarBrand><Link to="/" className="nav-brand"><span className="icon ion-md-microphone"></span>BlocJams</Link></NavbarBrand>
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
		 </section>
		 <div className="album-container" style={{ backgroundColor: "#e5e5d8"}}>
     <h1 style={{color:"maroon", textDecoration: "underline"}}>Choose your sound:</h1>
		 <section className='library'>
		 {
			 this.state.albums.map( (album, index) =>
			 <Link style={{ color: "maroon"}}
        to={`/album/${album.slug}`}
        key={index}>
			 	<img src={album.albumCover} alt={album.title} />
			 	<div>{album.title}</div>
			 	<div>{album.artist}</div>
			 	<div>{album.songs.length} songs</div>
       </Link>
			)
		}
		 </section>
		 </div>
		 </div>
		);
	}
}

export default Library;
