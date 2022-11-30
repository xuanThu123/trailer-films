import React from "react";
import movieApi from "~/api/movieApi";
import MediaDiscover from "~/components/MediaDiscover/MediaDiscover";

function UpComing() {
  return (
    <MediaDiscover
      api={movieApi.getMovieUpcoming.bind(movieApi)}
      title="Upcoming Movies"
    />
  );
}

export default UpComing;
