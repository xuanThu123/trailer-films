import axiosClient from "./axiosClient";

const movieApi = {
  resource: "movie",
  getMoviePopular(params) {
    const uri = `${this.resource}/popular`;
    return axiosClient.get(uri, { params });
  },
  getMovieNowPlaying(params) {
    const uri = `${this.resource}/now_playing`;
    return axiosClient.get(uri, { params });
  },
  getMovieUpcoming(params) {
    const uri = `${this.resource}/upcoming`;
    return axiosClient.get(uri, { params });
  },
  getMovieTopRated(params) {
    const uri = `${this.resource}/top_rated`;
    return axiosClient.get(uri, { params });
  },
  getMovieDetails(id, params) {
    const uri = `${this.resource}/${id}`;
    return axiosClient.get(uri, { params });
  },
  getTrailersMovieById(id, params) {
    const uri = `${this.resource}/${id}/videos`;
    return axiosClient.get(uri, { params });
  },
};

export default movieApi;
