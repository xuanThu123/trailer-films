import axiosClient from "./axiosClient";

const trendingApi = {
  resource: "trending",
  getTrendingOfDay(params) {
    const uri = `${this.resource}/all/day`;
    return axiosClient.get(uri, { params });
  },
  getTrendingOfWeek(params) {
    const uri = `${this.resource}/all/week`;
    return axiosClient.get(uri, { params });
  },
};

export default trendingApi;
