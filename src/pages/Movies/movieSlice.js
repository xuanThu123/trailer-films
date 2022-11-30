import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import movieApi from "~/api/movieApi";
import { formatData } from "~/app/services/services";

const movieSlice = createSlice({
  name: "movie",
  initialState: {
    popular: {
      status: "idle",
      error: "",
      entities: [],
    },
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getMoviePopular.pending, (state, action) => {
        state.popular.status = "loading";
      })
      .addCase(getMoviePopular.fulfilled, (state, action) => {
        state.popular.status = "idle";
        state.popular.entities = formatData(action.payload);
      });
  },
});

export const getMoviePopular = createAsyncThunk(
  "movie/getMoviePopular",
  async (params) => {
    const response = await movieApi.getMoviePopular(params);
    return response.results;
  }
);

// export const {} = movieSlice.actions
export default movieSlice.reducer;
