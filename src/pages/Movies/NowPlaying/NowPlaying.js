import React from "react";
import movieApi from "~/api/movieApi";
import MediaDiscover from "~/components/MediaDiscover/MediaDiscover";

function NowPlaying() {
  return (
    <MediaDiscover
      api={movieApi.getMovieNowPlaying.bind(movieApi)}
      title="Now Playing Movies"
    />
  );
}

export default NowPlaying;
