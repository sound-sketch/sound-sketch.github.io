import React, {Component} from "react";
import "./SongSearch.css";
import AudioAnalysis from "../AudioAnalysis/AudioAnalysis";

var SpotifyWebApi = require('spotify-web-api-node');
var spotifyApi = new SpotifyWebApi({
    clientId: "f5d032c8b8954a9689dbf60afdce056f",
    clientSecret: "ccbec7c26bf448ecae57839f642c3148",
    redirectUri: "http://localhost:8888/callback"
  });

class SongSearch extends Component {
    constructor(props) {
        super(props);
        this.state = {
            searchSong: "",
            searchArtist: "",
            token: props.token,
            audioAnalysis: ""
        };
        this.handleSongChange = this.handleSongChange.bind(this);
        this.handleArtistChange = this.handleArtistChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.searchTrackCallback = this.searchTrackCallback.bind(this);
    }

    searchTrackCallback(response)
    {
        console.log(response);
    }

    handleSubmit(event) {
        event.preventDefault();
        this.setState(
            {searchSong: "",
            searchArtist: "",
            audioAnalysis: ""}
        );
        spotifyApi.setAccessToken(this.state.token);
        var search = 'track: ' + this.state.searchSong + ' artist: ' + this.state.searchArtist;
        spotifyApi.searchTracks(search).then(
            (response) => {
                console.log("I got ", response.body.tracks.total, " responses");
                var results = response.body.tracks.items;
                var trackID = results[0].id;
                /* Get Audio Features for a Track */
                spotifyApi.getAudioFeaturesForTrack(trackID).then(
                    (data) => {
                        this.setState({audioAnalysis: data.body})
                    }, function(err) {
                        console.log(err);
                    }
                );
            }
        ).catch(function(err) {
            console.log("Something went wrong:", err.message);
        });
    }

    handleSongChange(event) {
        this.setState({searchSong: event.target.value});
    }

    handleArtistChange(event) {
        this.setState({searchArtist: event.target.value});
    }

    render() {
        if (this.state.audioAnalysis !== "") {
            return(<div className="SongSearch">
                <form onSubmit={this.handleSubmit}>
                    <label>
                        Song Name:
                        <input type="text" value={this.state.searchSong}
                        onChange={this.handleSongChange}
                        name="songName" />
                    </label>
                    <label>
                        Artist:
                        <input type="text" value={this.state.searchArtist}
                        onChange={this.handleArtistChange}
                        name="artistName" />
                        <input type="submit" value="Submit" />
                    </label>
                </form>
                <br></br>
                <div>Audio Analysis:
                    <AudioAnalysis audioAnalysis={this.state.audioAnalysis}/>
                </div>
            </div>)
        } else {
            return(<div className="SongSearch">
            <form onSubmit={this.handleSubmit}>
                <label>
                    Song Name:
                    <input type="text" value={this.state.searchSong}
                    onChange={this.handleSongChange}
                    name="songName" />
                </label>
                <label>
                    Artist:
                    <input type="text" value={this.state.searchArtist}
                    onChange={this.handleArtistChange}
                    name="artistName" />
                    <input type="submit" value="Submit" />
                </label>
            </form>
            <br></br>
            </div>)
        }
    }
}

export default SongSearch;