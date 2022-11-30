import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import tvShowApi from "~/api/tvShowApi";
import { formatData } from "~/app/services/services";

const tvShowSlice = createSlice({
  name: "tv",
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
      .addCase(getTvShowPopular.pending, (state) => {
        state.popular.status = "loading";
      })
      .addCase(getTvShowPopular.fulfilled, (state, { payload }) => {
        state.popular.status = "idle";
        state.popular.entities = formatData(payload);
      })
      .addCase(getTvShowPopular.rejected, (state, action) => {
        state.popular.status = "idle";
        state.popular.error = action.message;
      });
  },
});

export const getTvShowPopular = createAsyncThunk(
  "tv/getTvShowPopular",
  async (params) => {
    const res = await tvShowApi.getTvShowPopular(params);
    return res.results;
  }
);

export default tvShowSlice.reducer;
