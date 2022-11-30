import React from "react";
import tvShowApi from "~/api/tvShowApi";
import MediaDiscover from "~/components/MediaDiscover/MediaDiscover";

function Popular() {
  return (
    <MediaDiscover
      api={tvShowApi.getTvShowPopular.bind(tvShowApi)}
      title="Popular TV Shows"
    />
  );
}

export default Popular;
