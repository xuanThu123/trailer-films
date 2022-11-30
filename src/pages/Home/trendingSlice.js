import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import trendingApi from "~/api/trendingApi";
import { formatData } from "~/app/services/services";

const trendingSlice = createSlice({
  name: "trending",
  initialState: {
    week: {
      status: "idle",
      error: "",
      entities: [],
    },
    day: {
      status: "idle",
      error: "",
      entities: [],
    },
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getTrendingOfWeek.pending, (state) => {
        state.week.status = "loading";
      })
      .addCase(getTrendingOfWeek.fulfilled, (state, { payload }) => {
        state.week.status = "idle";
        state.week.entities = formatData(payload);
      })
      .addCase(getTrendingOfWeek.rejected, (state, action) => {
        state.week.status = "idle";
        state.week.error = action.message;
      })
      .addCase(getTrendingOfDay.pending, (state) => {
        state.day.status = "loading";
      })
      .addCase(getTrendingOfDay.fulfilled, (state, { payload }) => {
        state.day.status = "idle";
        state.day.entities = formatData(payload);
      })
      .addCase(getTrendingOfDay.rejected, (state, action) => {
        state.day.status = "idle";
        state.day.error = action.message;
      });
  },
});

export const getTrendingOfWeek = createAsyncThunk(
  "trending/getTrendingOfWeek",
  async (param) => {
    const response = await trendingApi.getTrendingOfWeek(param);
    return response.results;
  }
);
export const getTrendingOfDay = createAsyncThunk(
  "trending/getTrendingOfDay",
  async (param) => {
    const response = await trendingApi.getTrendingOfDay(param);
    return response.results;
  }
);

export default trendingSlice.reducer;
