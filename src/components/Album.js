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
				isPlaying: false,
				isHovered: false
			};

			this.audioElement = document.createElement('audio');
			this.audioElement.src = album.songs[0].audioSrc;
		}

		//pause logo - <i class="icon ion-md-pause"></i>
		//play logo - <i class="icon ion-md-play"></i>
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
					return <i class="icon ion-md-pause"></i>;
				} else {
					if (!isSameSong) {
						this.setSong(song);
						return <i class="icon ion-md-play"></i>
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
				handleSongClick={() => this.handleSongClick(this.state.currentSong)}
				handlePrevClick={() => this.handlePrevClick()}
				/>
			</section>
			);
		}
	}

export default Album;

//git feature branch for assignment already created
//complete assignment-audio-playback
