import React, { Component } from 'react';
import albumData from './../data/albums';
import PlayerBar from './PlayerBar';
import { Link } from 'react-router-dom';
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
  Col
} from 'reactstrap';
import './Album.css';

class Album extends Component {
	constructor(props) {
	super(props);

			const album = albumData.find( album => {
				return album.slug === this.props.match.params.slug
			});

			this.state = {
				album: album,
				currentSong: album.songs[null],
				currentTime: 0,
				duration: album.songs[0].duration,
				currentVol: .5,
				isPlaying: false,
				isHovered: false
			};

			this.audioElement = document.createElement('audio');
			this.audioElement.src = album.songs[0].audioSrc;
		}
//called by React when a component has been added to the DOM, and it's useful to add API calls and event handlers to this method.
		componentDidMount() {
			this.eventListeners = {
				timeupdate: e => {
					this.setState({ currentTime: this.audioElement.currentTime });
				},
				durationchange: e => {
					this.setState({ duration: this.audioElement.duration });
				},
				volchange: e => {
					this.setState({ currentVol: this.audioElement.currentVol });
				}
			};
			this.audioElement.addEventListener("timeupdate", this.eventListeners.timeupdate);
			this.audioElement.addEventListener("durationchange", this.eventListeners.durationchange);
			this.audioElement.addEventListener("volchange", this.eventListeners.volchange);
		}

		componentWillUnmount() {
			//stops audio playback
			this.audioElement.src = null;
			//terminate the timeupdate, durationchange, and volchange event listeners.
			this.audioElement.removeEventListener("timeupdate", this.eventListeners.timeupdate);
			this.audioElement.removeEventListener("durationchange", this.eventListeners.durationchange);
			this.audioElement.removeEventListener("volchange", this.eventListeners.volchange);
		}

			play() {
				this.audioElement.play();
				this.setState({ isPlaying: true });
			}

			pause() {
				this.audioElement.pause();
				this.setState({ isPlaying: false });
			}

			setSong(song) {
				this.audioElement.src = song.audioSrc;
				this.setState({ currentSong: song })
			}

			handleSongClick(song) {
				const isSameSong = this.state.currentSong === song;
				if (this.state.isPlaying && isSameSong) {
					this.pause();
				} else {
					if (!isSameSong) {
						this.setSong(song);
							}
						this.play();
					}
				}

				handlePrevClick() {
					//find the index of the song - .findIndex()
					const currentIndex = this.state.album.songs.findIndex(song => this.state.currentSong === song);
					//calculate new index by subtracting one but not going below 1st track with 0 index - Math.max()
					const newIndex = Math.max(0, currentIndex - 1);
					// newSong equals index calculated from newIndex
					const newSong = this.state.album.songs[newIndex];
					//call set song with the new index
					this.setSong(newSong);
					//play the song
					this.play();
				}

				handleNextClick() {
					//find the index of the song - .findIndex()
					const currentIndex = this.state.album.songs.findIndex(song => this.state.currentSong === song);
					//calculate new index by adding one but not going past last track with songs.length-1 index - Math.min()
					const newIndex = Math.min(this.state.album.songs.length-1, currentIndex + 1);
					// newSong equals index calculated from newIndex
					const newSong = this.state.album.songs[newIndex];
					//call set song with the new index
					this.setSong(newSong);
					//play the song
					this.play()
				}

				handleTimeChange(e) {
					//calculate by multiplying this.audioElement.duration by the value of the range input.
					const newTime = this.audioElement.duration * e.target.value;
					//Set the currentTime property of this.audioElement to the new time.
					this.audioElement.currentTime = newTime;
					//Update this.state.currentTime to the new time.
					this.setState({ currentTime: newTime });
				}

				formatTime(time) {
					//incase passed an invalid or non-numeric value
						if (isNaN(time)) {
							return " -:-- ";
						}
						//Math.floor() returns the largest whole number, less than or equal to a number.
						//convert seconds to integers
						const seconds = Math.floor(time);
						const minutes = Math.floor(seconds / 60);
						const remainingSeconds = seconds % 60;
						let timer = minutes + ":";
						//if the seconds that remain are less than 10, then timer = timer + 0
						if (remainingSeconds < 10) {
							timer += "0";
						}
						timer += remainingSeconds;
						return timer;
				}

				handleVolChange(e) {
					//set new volume to value attributes value in volume control section of player bar
					const newVol = e.target.value;
					//set the volume property of this.audioElement to the new volume
					this.audioElement.volume = newVol;
					//update state to new volume
					this.setState({ currentVol: newVol });
				}

				renderIcons(song, index) {
					const isSameSong = this.state.currentSong === song;
					if (this.state.isPlaying && isSameSong) {
						return <span className="icon ion-md-pause" style={{color:"blue"}}></span>
					} else if (!this.state.isPlaying && isSameSong) {
						return <span className="icon ion-md-play"></span>
					} else if (this.state.isHovered === index + 1) {
						return <span className="icon ion-md-play"></span>
					} else {
						return <span className="song-num"> {index + 1} </span>
					}
				}

		render() {
		return (
			<section className="album">
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
				<section id="album-info">
					<img
					id="album-cover-art"
					src={ this.state.album.albumCover}
					alt={ this.state.album.title}
          className="album-img"
					/>
					<div className="album-details">
						<h1 id="album-title">{ this.state.album.title }</h1>
						<h2 className="artist">{ this.state.album.artist }</h2>
						<div id="release-info"> { this.state.album.releaseInfo }</div>
					</div>
				</section>
        <Container>
          <Row>
            <Col className="music-selection-table" sm="12" md="4">
				<table id="song-list">
					<colgroup>
						<col id="song-number-column" />
						<col id="song-title-column" />
						<col id="song-duration-column" />
					</colgroup>
					<tbody>
					{ this.state.album.songs.map( (song, index) =>
						<tr className="song" key={ index }
						onClick={(e) => this.handleSongClick(song)}
						onMouseEnter={(e) => this.setState({ isHovered: index + 1})}
						onMouseLeave={(e) => this.setState({ isHovered: false})}
						>
							<td>{this.renderIcons(song, index)}</td>
							<td>{ this.state.album.songs[index].title}</td>
							<td>{ this.formatTime(this.state.album.songs[index].duration) }</td>
						</tr>
					)}
					</tbody>
				</table>
            </Col>
          </Row>
        </Container>
				<PlayerBar
				isPlaying={this.state.isPlaying}
				currentSong={this.state.currentSong}
				currentTime={this.audioElement.currentTime}
				formatTime={(e) => this.formatTime(e)}
				duration={this.audioElement.duration}
				currentVol={this.audioElement.volume}
				handleSongClick={() => this.handleSongClick(this.state.currentSong)}
				handlePrevClick={() => this.handlePrevClick()}
				handleNextClick={() => this.handleNextClick()}
				handleTimeChange={(e) => this.handleTimeChange(e)}
				handleVolChange={(e) => this.handleVolChange(e)}
				/>
			</section>
			);
		}
	}

export default Album;
