import { createSlice } from "@reduxjs/toolkit";

const mediaDetailSlice = createSlice({
  name: "media-detail",
  initialState: {
    isShowPosterModal: false,
    isShowTrailerModal: false,
  },
  reducers: {
    controlPosterModal: (state, { payload }) => {
      state.isShowPosterModal = payload;
    },
    controlTrailerModal: (state, { payload }) => {
      state.isShowTrailerModal = payload;
    },
  },
});

export const { controlPosterModal, controlTrailerModal } =
  mediaDetailSlice.actions;
export default mediaDetailSlice.reducer;
