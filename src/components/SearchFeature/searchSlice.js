import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import searchApi from "~/api/searchApi";

const searchSlice = createSlice({
  name: "search",
  initialState: {
    isShowSearchBox: false,
    searchResult: {
      status: "idle",
      entities: [],
      error: "",
    },
  },
  reducers: {
    controlSearchBox: (state, action) => {
      state.isShowSearchBox = action.payload;
    },
  },
  extraReducers: (builder) => {},
});

export const searchByKeywords = createAsyncThunk(
  "search/searchByKeywords",
  async (searchText) => {
    const responseMovie = await searchApi.searchByKeywordsInListMovies(
      searchText
    );
    const responseTv = await searchApi.searchByKeywordsInTvShow(searchText);
    return responseMovie.results
      .slice(0, 6)
      .concat(responseTv.results.slice(0, 6));
  }
);

export const { controlSearchBox } = searchSlice.actions;
export default searchSlice.reducer;
