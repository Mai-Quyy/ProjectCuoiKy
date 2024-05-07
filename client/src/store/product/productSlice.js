import { createSlice } from "@reduxjs/toolkit";
import { getNewProducts } from "./asynsAction";
export const productSlice = createSlice({
  name: "product",
  initialState: {
    newProducts: null,
    errorMessage: "",
  },
  reducers: {
    // logout: (state) => {
    //   state.isLoading = false;
    // },
  },
  extraReducers: (builder) => {
    // Bắt đầu thực hiện action login
    builder.addCase(getNewProducts.pending, (state) => {
      // Bat trang thai loading
      state.isLoading = true;
    });
    // KHi thực hiện action login thành công
    builder.addCase(getNewProducts.fulfilled, (state, action) => {
      // tắt trạng thái loading, lưuu thông tin user vào store
      state.isLoading = false;
      state.newProducts = action.payload;
    });
    // KHi thực hiện action login thất bại

    builder.addCase(getNewProducts.rejected, (state, action) => {
      //  tắt trạng thái loading,,lưu tb lỗi vào store
      state.isLoading = false;
      state.errorMessage = action.payload.message;
    });
  },
});
// export const {} = productSlice.actions;
export default productSlice.reducer;
