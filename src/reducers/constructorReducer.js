import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  image: null,
  cookingTime: undefined,
  servingsNum: 1,
  cookingComplexity: "easy",
  commentary: "",
  ingredients: [{ weight: "", unit: "g", name: "" }],
  steps: [],
};

const constructorReducer = createSlice({
  name: "constructor",
  initialState,
  reducers: {
    changeMainImg: (state, action) => {
      state.image = action.payload;
    },
    changeCommentary: (state, action) => {
      state.commentary = action.payload;
    },
    addIngredient: (state, action) => {
      state.ingredients.push(action.payload);
    },
    removeIngredient: (state, action) => {
      state.ingredients.splice(action.payload, 1);
    },
    changeIngredientWeight: (state, action) => {
      const { index, weight } = action.payload;
      state.ingredients[index].weight = weight;
    },
    changeIngredientUnit: (state, action) => {
      const { index, unit } = action.payload;
      state.ingredients[index].unit = unit;
    },
    changeIngredientName: (state, action) => {
      const { index, name } = action.payload;
      state.ingredients[index].name = name;
    },
    clearConstructor: () => initialState,
  },
});

export const {
  changeMainImg,
  changeCommentary,
  addIngredient,
  removeIngredient,
  changeIngredientWeight,
  changeIngredientUnit,
  changeIngredientName,
} = constructorReducer.actions;

export default constructorReducer.reducer;
