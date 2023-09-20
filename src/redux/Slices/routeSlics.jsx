import { createSlice } from "@reduxjs/toolkit";

const routeSlice = createSlice({
  name: "currentPage",
  initialState: {
    path: "",
    api: "",
  },

  reducers: {
    setCurrentPage: (state, action) => {
      console.log(action.payload);
      const { title, path } = action.payload;
      console.log(title);
      state.path = title;
      state.api = path;
    },
  },
});

export const { setCurrentPage } = routeSlice.actions;

export default routeSlice.reducer;
