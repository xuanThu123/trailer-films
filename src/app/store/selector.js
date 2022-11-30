export const searchBoxSelector = (state) => state.search.isShowSearchBox;
export const searchResultSelector = (state) => state.search.searchResult.entities;

export const tokenSelector = (state) => state.auth.token;
export const moviePopularSelector = (state) => state.movie.popular.entities;
export const tvShowPopularSelector = (state) => state.tv.popular.entities;
export const trendingWeekSelector = (state) => state.trending.week.entities;
export const trendingDaySelector = (state) => state.trending.day.entities;
export const mediaDetailSelector = (state) => state.mediaDetail.isShowPosterModal;
export const trailerModalSelector = (state) => state.mediaDetail.isShowTrailerModal;
