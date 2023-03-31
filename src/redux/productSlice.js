import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Axios from "axios";
import { URL } from "../routes/featureroutes/Root";

// API REQUEST
// FUNCTION FOR ADDING PRODUCT TO DATABASE
export const addProduct = createAsyncThunk(
  "product/add",
  async (dispatchData) => {
    const { formData, user_id } = dispatchData;

    try {
      const { data } = await Axios.post(
        `${URL}/products/${user_id}`,
        formData,
        { withCredentials: true }
      );
      return data;
    } catch (error) {
      console.log("error", error);
    }
  }
);

// REQUEST FOR READING ALL PRODUCT FORM DATABASE
export const readAllProduct = createAsyncThunk(
  "product/read",
  async (user_id) => {
    try {
      const { data } = await Axios.get(`${URL}/products/${user_id}`, {
        withCredentials: true,
      });
      return data;
    } catch (error) {
      console.log("error", error);
    }
  }
);

// DELETE PRODUCT FROM DATABASE
export const deleteProduct = createAsyncThunk(
  "product/delete",
  async (productAndUserId) => {
    const { user_id, product_id } = productAndUserId;
    try {
      const { data } = await Axios.delete(
        `${URL}/products/${user_id}/${product_id}`,
        { withCredentials: true }
      );
      return data;
    } catch (error) {
      console.log("error", error);
    }
  }
);

// UPDATING PRODUCT FROM DATABASE
export const updateProduct = createAsyncThunk(
  "product/update",
  async (updatedData) => {
    const { user_id, product_id, formData } = updatedData;
    try {
      const { data } = await Axios.put(
        `${URL}/products/${user_id}/${product_id}`,
        formData,
        { withCredentials: true }
      );
      return data;
    } catch (error) {
      console.log("error", error);
    }
  }
);

// UPDATE PRODUCT QUANTITY UPON SUCCESSFULL TRANSACTION
export const updateProductQty = createAsyncThunk(
  "product/updateQuantity",
  async (updateProductData) => {
    const { user_id, counterItems } = updateProductData;
    try {
      const { data } = await Axios.put(
        `${URL}/products/${user_id}`,
        counterItems,
        { withCredentials: true }
      );

      return data;
    } catch (error) {
      console.log("counterItems", counterItems);
      console.log("error", error);
    }
  }
);

// CREATING PRODUCT SLICE
export const productSlice = createSlice({
  name: "product",
  initialState: {
    productData: [],
    allProductData: [],
    productDetail: [],
    filteredProductData: [],
    productIndex: [],
    isLoadingProduct: false,
    isSavingProduct: false,
  },
  reducers: {
    getProductDetail: (state, { payload }) => {
      state.productDetail = payload;
    },

    getProductIndex: (state, { payload }) => {
      state.productIndex = payload;
    },

    getNextProductDetail: (state, { payload }) => {
      if (payload < state.allProductData.length - 1) {
        state.productDetail = state.allProductData[payload + 1];
      } else if (state.allProductData.length < 2) {
        state.productDetail = [];
      } else {
        state.productDetail = state.allProductData[0];
        state.productIndex = 0;
      }
    },

    filterProductData: (state, { payload }) => {
      if (payload === "all") {
        state.filteredProductData = state.allProductData;
      } else {
        state.filteredProductData = state.allProductData.filter((type) => {
          return type.product_type === payload;
        });
      }
    },

    resetFilteredProductData: (state, { payload }) => {
      state.filteredProductData = state.allProductData;
    },

    searchFilter: (state, { payload }) => {
      state.filteredProductData = state.allProductData.filter((product) => {
        return product.product_name
          .toLowerCase()
          .includes(payload.toLowerCase());
      });
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addProduct.pending, (state, { payload }) => {
        state.isSavingProduct = true;
      })
      .addCase(addProduct.fulfilled, (state, { payload }) => {
        state.productData = payload;
        state.isSavingProduct = false;
      })
      .addCase(addProduct.rejected, (state, { payload }) => {
        state.productData = payload;
        state.isSavingProduct = false;
      })

      .addCase(readAllProduct.pending, (state, { payload }) => {
        state.isLoadingProduct = true;
      })
      .addCase(readAllProduct.fulfilled, (state, { payload }) => {
        state.allProductData = payload;
        state.filteredProductData = payload;
        state.productDetail = payload[0];
        state.isLoadingProduct = false;
      })
      .addCase(readAllProduct.rejected, (state, { payload }) => {
        state.isLoadingProduct = false;
      })

      .addCase(deleteProduct.pending, (state, { payload }) => {
        state.isSavingProduct = true;
      })
      .addCase(deleteProduct.fulfilled, (state, { payload }) => {
        state.productData = payload;
        state.isSavingProduct = false;
      })
      .addCase(deleteProduct.rejected, (state, { payload }) => {
        state.isSavingProduct = false;
      })

      .addCase(updateProduct.pending, (state, { payload }) => {
        state.isSavingProduct = true;
      })
      .addCase(updateProduct.fulfilled, (state, { payload }) => {
        state.productDetail = payload;
        state.productData = payload;
        state.isSavingProduct = false;
      })
      .addCase(updateProduct.rejected, (state, { payload }) => {
        state.isSavingProduct = false;
      })
      .addCase(updateProductQty.pending, (state, { payload }) => {
        state.isSavingProduct = true;
      })
      .addCase(updateProductQty.fulfilled, (state, { payload }) => {
        state.isSavingProduct = false;
        state.productData = [""];
      })

      .addCase(updateProductQty.rejected, (state, { payload }) => {
        state.isSavingProduct = false;
      });
  },
});
export const {
  getProductDetail,
  getProductIndex,
  getNextProductDetail,
  filterProductData,
  resetFilteredProductData,
  searchFilter,
} = productSlice.actions;
export default productSlice.reducer;
