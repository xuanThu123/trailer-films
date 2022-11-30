import React from "react";
import tvShowApi from "~/api/tvShowApi";
import MediaDiscover from "~/components/MediaDiscover/MediaDiscover";

function AiringToday() {
  return (
    <MediaDiscover
      api={tvShowApi.getTvShowAiringToday.bind(tvShowApi)}
      title="TV Shows Airing Today"
    />
  );
}

export default AiringToday;
