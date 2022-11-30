import movieApi from "~/api/movieApi";
import MediaDiscover from "~/components/MediaDiscover/MediaDiscover";

function Popular() {
  return (
    <MediaDiscover
      api={movieApi.getMoviePopular.bind(movieApi)}
      title="Popular Movies"
    />
  );
}

export default Popular;
