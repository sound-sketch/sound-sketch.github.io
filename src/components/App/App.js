import React from "react";
import TitleBar from "../TitleBar/TitleBar";
import SongSearch from "../SongSearch/SongSearch";
import './App.css';

function App(props) {
  return(
    <div>
      <TitleBar/>
      <SongSearch
        searchSong=""
        searchArtist=""
        token={props.token}
      />
    </div>
  );
}

export default App;
