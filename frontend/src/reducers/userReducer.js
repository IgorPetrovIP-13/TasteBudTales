import { createSlice } from "@reduxjs/toolkit";
import produce from "immer";

const initialState = {
  nickname: null,
  fullName: null,
  email: null,
  uid: null,
};

const userReducer = createSlice({
  name: "user",
  initialState: initialState,
  reducers: {
    setUser(state, action) {
      return produce(state, (draftState) => {
        draftState.nickname = action.payload.nickname;
        draftState.fullName = action.payload.fullName;
        draftState.email = action.payload.email;
        draftState.uid = action.payload.uid;
      });
    },
    removeUser(state) {
      return produce(state, (draftState) => {
        draftState.nickname = null;
        draftState.fullName = null;
        draftState.email = null;
        draftState.uid = null;
      });
    },
  },
});

export const { setUser, removeUser } = userReducer.actions;

export default userReducer.reducer;
