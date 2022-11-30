import React from "react";
import tvShowApi from "~/api/tvShowApi";
import MediaDiscover from "~/components/MediaDiscover/MediaDiscover";

function OnTv() {
  return (
    <MediaDiscover
      api={tvShowApi.getTvShowAiringTVShow.bind(tvShowApi)}
      title="Currently Airing TV Shows"
    />
  );
}

export default OnTv;
