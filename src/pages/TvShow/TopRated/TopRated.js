import React from "react";
import tvShowApi from "~/api/tvShowApi";
import MediaDiscover from "~/components/MediaDiscover/MediaDiscover";

function TopRated() {
  return (
    <MediaDiscover
      api={tvShowApi.getTvShowTopRated.bind(tvShowApi)}
      title="Top Rated TV Shows"
    />
  );
}

export default TopRated;
