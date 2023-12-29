import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { manageSavedRecipes } from "../utils/firebaseUtils";

const initialState = {
  nickname: null,
  fullName: null,
  email: null,
  uid: null,
  description: null,
  saved: [],
};

export const addToSaved = createAsyncThunk(
  "user/addToSavedAsync",
  async (payload, thunkAPI) => {
    const { uid } = thunkAPI.getState().user;
    try {
      await manageSavedRecipes(uid, payload);
      return payload;
    } catch (error) {
      throw error;
    }
  }
);

export const removeFromSaved = createAsyncThunk(
  "user/removeFromSavedAsync",
  async (payload, thunkAPI) => {
    const { uid } = thunkAPI.getState().user;
    try {
      await manageSavedRecipes(uid, payload);
      return payload;
    } catch (error) {
      throw error;
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState: initialState,
  reducers: {
    setUser(state, action) {
      const { nickname, fullName, email, uid, description } = action.payload;
      state.nickname = nickname;
      state.fullName = fullName;
      state.email = email;
      state.uid = uid;
      state.description = description;
    },
    setSaved(state, action) {
      state.saved = action.payload
    },
    removeUser(state) {
      state.nickname = null;
      state.fullName = null;
      state.email = null;
      state.uid = null;
      state.description = null;
      state.saved = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addToSaved.fulfilled, (state, action) => {
        state.saved.push(action.payload);
      })
      .addCase(addToSaved.rejected, (state, action) => {
        console.error(action.error);
        toast.error("Error!");
      })
      .addCase(removeFromSaved.fulfilled, (state, action) => {
        state.saved = state.saved.filter((id) => id !== action.payload);
      })
      .addCase(removeFromSaved.rejected, (state, action) => {
        console.error(action.error);
        toast.error("Error!");
      });
  },
});

export const { setUser, removeUser, setSaved } = userSlice.actions;

export default userSlice.reducer;