import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Axios from "axios";
import { URL } from "../routes/featureroutes/Root";

// handle submit funtion for user registration
export const sendRegister = createAsyncThunk(
  "user/register",
  async (formData) => {
    try {
      const { data } = await Axios.post(`${URL}/users`, formData);
      return data;
    } catch (error) {
      console.log("error", error.message);
    }
  }
);

// handle submit function for user login
export const userLogin = createAsyncThunk("user/login", async (loginData) => {
  try {
    const { data } = await Axios.post(`${URL}/users/login`, loginData, {
      withCredentials: true,
    });
    localStorage.setItem("userData", JSON.stringify(data));
    return data;
  } catch (error) {
    const { status } = error.response.data;
    return status;
  }
});

// handle log out funtion
export const userLogout = createAsyncThunk("user/logout", async () => {
  try {
    await Axios.get(`${URL}/users/logout`, {
      withCredentials: true,
    });
    localStorage.removeItem("userData");
  } catch (error) {
    console.log("error", error);
  }
});

// CREATE SLICE
export const userSlice = createSlice({
  name: "user",
  initialState: {
    userData: [],
    isLoading: false,
  },
  reducers: {
    resetUserData: (state) => {
      state.isSuccess = false;
      state.userData = [];
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(sendRegister.pending, (state, { payload }) => {
        state.isLoading = true;
      })
      .addCase(sendRegister.fulfilled, (state, { payload }) => {
        state.userData = payload;
        state.isLoading = false;
      })

      .addCase(userLogin.pending, (state, { payload }) => {
        state.isLoading = true;
      })
      .addCase(userLogin.fulfilled, (state, { payload }) => {
        state.userData = payload;
        state.isLoading = false;
      })
      .addCase(userLogout.pending, (state, { payload }) => {
        state.isLoading = true;
      })
      .addCase(userLogout.fulfilled, (state, { payload }) => {
        state.userData = [];
        state.isLoading = false;
      })
      .addCase(userLogout.rejected, (state, { payload }) => {
        state.isLoading = false;
      });
  },
});

export const { resetUserData } = userSlice.actions;

export default userSlice.reducer;
