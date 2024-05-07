import { createSlice } from "@reduxjs/toolkit";
import * as actions from "./asyncAction";
// import { Login } from "../pages/public";
export const appSlice = createSlice({
  name: "app",
  initialState: {
    categories: null,
    isLoading: false,
  },
  reducers: {
    // logout: (state) => {
    //   state.isLoading = false;
    // },
  },
  extraReducers: (builder) => {
    // Bắt đầu thực hiện action login
    builder.addCase(actions.getCategories.pending, (state) => {
      // Bat trang thai loading
      state.isLoading = true;
    });
    // KHi thực hiện action login thành công
    builder.addCase(actions.getCategories.fulfilled, (state, action) => {
      // tắt trạng thái loading, lưuu thông tin user vào store
      console.log(action);
      state.isLoading = false;
      state.categories = action.payload;
    });
    // KHi thực hiện action login thất bại

    builder.addCase(actions.getCategories.rejected, (state, action) => {
      //  tắt trạng thái loading,,lưu tb lỗi vào store
      state.isLoading = false;
      state.errorMessage = action.payload.message;
    });
  },
});
// export const {} = appSlice.actions;
export const { showModal, showCart } = appSlice.actions;
export default appSlice.reducer;
