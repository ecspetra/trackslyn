import React, {useContext} from "react";
import {ResultsContext} from "../Context/ResultsContext/ResultsContext";
import "./assets/index.scss";
import SearchListTrack from "../SearchListTrack/SearchListTrack";

const SearchResults = () => {
    const {result} = useContext(ResultsContext);

    const getTracks = () => {
        return result.tracks.items.map((item) => {
            return {
                track: {
                    id: item.id,
                    album: {
                        name: item.name,
                        images: item.album.images,
                    },
                    name: item.name,
                    artists: item.artists,
                    preview_url: item.preview_url,
                }
            }
        })
    }

    if (!result.tracks.items.length) return <div className="search-results">No results</div>

    return (
        <div className="search-results">
            {getTracks().map((item) => (
                <SearchListTrack key={item.track.id} trackInfo={item} />
            ))}
        </div>
    );
};

export default SearchResults;