import axiosClient from "./axiosClient";

const tvShowApi = {
  resource: "tv",
  getTvShowPopular(params) {
    const uri = `${this.resource}/popular`;
    return axiosClient.get(uri, { params });
  },
  getTvShowAiringToday(params) {
    const uri = `${this.resource}/airing_today`;
    return axiosClient.get(uri, { params });
  },
  getTvShowAiringTVShow(params) {
    const uri = `${this.resource}/on_the_air`;
    return axiosClient.get(uri, { params });
  },
  getTvShowTopRated(params) {
    const uri = `${this.resource}/top_rated`;
    return axiosClient.get(uri, { params });
  },
  getTvShowDetails(id, params) {
    const uri = `${this.resource}/${id}`;
    return axiosClient.get(uri, { params });
  },
};

export default tvShowApi;
