/*global swal*/

import React, { Component } from 'react';
import logo from './logo.svg';
import loading from './loading.svg';
import './App.css';
import Sound from 'react-sound';
import Button from './Button';

const apiToken = 'BQD5qgwXbzXqrMr_rqV8w_CDPPNAkvfWTOQclKlQx1kFMC9RYNhjLFAVgVcod8aspUtf9pmBWQZ9-xoGvZ4duG_LiPTzJM263WM-Jitz0KaB3zmGDv-4EA0ziD4gxSJQc4D7wKtxmB8V9LqwOdziVUerwAR0m1xc1gYFwRc';
var musicData = "";

function shuffleArray(array) {
    let counter = array.length;

    while (counter > 0) {
        let index = getRandomNumber(counter);
        counter--;
        let temp = array[counter];
        array[counter] = array[index];
        array[index] = temp;
    }

    return array;
}

/* Return a random number between 0 included and x excluded */
function getRandomNumber(x) {
    return Math.floor(Math.random() * x);
}

class App extends Component {

    constructor() {
        super();
        this.state = {
            text: "Initialisation",
            tracks: {},
            songsLoaded: false
        };
    }

    componentDidMount() {
        fetch('https://api.spotify.com/v1/me/tracks', {
                method: 'GET',
                headers: {
                    Authorization: 'Bearer ' + apiToken,
                },
            })
            .then(response => response.json())
            .then((data) => {
                console.log("Reponse reçue ! Voilà ce que j'ai reçu : ", data);
                this.setState({
                	text: "Musique récupérée",
                    tracks: data.items,
                    songsLoaded: true
                });
                musicData = data;
            })
    }

    render() {
        if (this.state.songsLoaded) {
			const track0 = this.state.tracks[0];
			const track1 = this.state.tracks[1];
        	
            return ( < div className = "App" >
                < header className = "App-header" >
                	< img src = { logo } className = "App-logo" alt = "logo" / >
                	< h1 className = "App-title" > Bienvenue sur le Blindtest </h1> 
                </header > 
                < div className = "App-images" >
                	<AlbumCover track={this.state.tracks[0]} />
                	<Sound url={this.state.tracks[0].track.preview_url} playStatus={"PLAYING"} />
                	< p > { this.state.tracks.length } musiques sont disponibles pour notre BlindTest ! La première musique disponible est { this.state.tracks[0].track.name }
                	 { this.state.text } < /p>  
                	}
                </div > 
                < div className = "App-buttons" >
                    <Button>{track0.track.name}</Button>
            		<Button>{track1.track.name}</Button>
              	</div> 
            </div >
            );
        } else {
            return ( < div className = "App" >
                < header className = "App-header" >
                < img src = { logo } className = "App-logo"
                alt = "logo" / >
                < h1 className = "App-title" > Bienvenue sur le Blindtest < /h1> < /
                header > < div className = "App-images" >
                < p > 
                < img src = { loading } className = "App-images"
                alt = "loading" / >
                 < /p> < /
                div > < div className = "App-buttons" >
                </div> < /div >
            );
        }
    }
}

class AlbumCover extends Component {
	render() {
		const src = this.props.track.track.album.images[0].url; // A changer ;)
		return (<img src={src} style={{ width: 400, height: 400 }} />);
	}
}


export default App;