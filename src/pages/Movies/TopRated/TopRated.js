import React from "react";
import movieApi from "~/api/movieApi";
import MediaDiscover from "~/components/MediaDiscover/MediaDiscover";

function TopRated() {
  return (
    <MediaDiscover
      api={movieApi.getMovieTopRated.bind(movieApi)}
      title="Top Rated Movies"
    />
  );
}

export default TopRated;
