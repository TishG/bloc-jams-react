import React, { Component } from 'react';
import albumData from './../data/albums';
import PlayerBar from './PlayerBar';

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
				}
			};
			this.audioElement.addEventListener("timeupdate", this.eventListeners.timeupdate);
			this.audioElement.addEventListener("durationchange", this.eventListeners.durationchange);
		}

		componentWillUnmount() {
			//stops audio playback
			this.audioElement.src = null;
			//terminate the timeupdate and durationchange event listeners.
			this.audioElement.removeEventListener("timeupdate", this.eventListeners.timeupdate)
			this.audioElement.removeEventListener("durationchange", this.eventListeners.durationchange);
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

				renderIcons(song, index) {
					const isSameSong = this.state.currentSong === song;
					if (this.state.isPlaying && isSameSong) {
						return <span className="icon ion-md-pause"></span>
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
				<section id="album-info">
					<img
					id="album-cover-art"
					src={ this.state.album.albumCover}
					alt={ this.state.album.title}
					/>
					<div className="album-details">
						<h1 id="album-title">{ this.state.album.title }</h1>
						<h2 className="artist">{ this.state.album.artist }</h2>
						<div id="release-info"> { this.state.album.releaseInfo }</div>
					</div>
				</section>
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
							<td>{ this.state.album.songs[index].duration }</td>
						</tr>
					)}
					</tbody>
				</table>
				<PlayerBar
				isPlaying={this.state.isPlaying}
				currentSong={this.state.currentSong}
				currentTime={this.audioElement.currentTime}
				duration={this.audioElement.duration}
				handleSongClick={() => this.handleSongClick(this.state.currentSong)}
				handlePrevClick={() => this.handlePrevClick()}
				handleNextClick={() => this.handleNextClick()}
				handleTimeChange={(e) => this.handleTimeChange(e)}
				/>
			</section>
			);
		}
	}

export default Album;

//git feature branch for assignment already created
//complete assignment-audio-playback
