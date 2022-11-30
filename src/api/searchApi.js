import axiosClient from "./axiosClient";

const searchApi = {
  resource: "search",

  searchByKeywordsInListMovies(params) {
    const uri = `${this.resource}/movie`;
    return axiosClient.get(uri, { params });
  },

  searchByKeywordsInTvShow(params) {
    const uri = `${this.resource}/tv`;
    return axiosClient.get(uri, { params });
  },
};

export default searchApi;
