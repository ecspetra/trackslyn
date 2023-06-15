import React from "react";
import TrackList from "../TrackList/TrackList";
import AudioPlayer from "../AudioPlayer/AudioPlayer";

const Home = ({ ...rest }) => {
    return (
        <div className="home">
            <AudioPlayer />
            <TrackList {...rest} />
        </div>
    )
}

export default Home;