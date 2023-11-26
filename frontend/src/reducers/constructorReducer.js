import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  id: "",
  name: "",
  image: null,
  cookingTime: 10,
  servingsNum: 1,
  cookingComplexity: "easy",
  category: "soups",
  commentary: "",
  ingredients: [{ weight: "", unit: "g", name: "" }],
  steps: [{ text: "" }],
};

const constructorReducer = createSlice({
  name: "constructor",
  initialState,
  reducers: {
    changeName: (state, action) => {
      state.name = action.payload;
    },
    changeMainImg: (state, action) => {
      state.image = action.payload;
    },
    changeTime: (state, action) => {
      state.cookingTime = action.payload;
    },
    changeServingsNum: (state, action) => {
      state.servingsNum = action.payload;
    },
    changeComplexity: (state, action) => {
      state.cookingComplexity = action.payload;
    },
    changeCategory: (state, action) => {
      state.category = action.payload;
    },
    changeCommentary: (state, action) => {
      state.commentary = action.payload;
    },
    addIngredient: (state) => {
      state.ingredients.push({ weight: "", unit: "g", name: "" });
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
    addStep: (state) => {
      state.steps.push({ text: "" });
    },
    removeStep: (state, action) => {
      state.steps.splice(action.payload, 1);
    },
    changeStepText: (state, action) => {
      const { index, text } = action.payload;
      state.steps[index].text = text;
    },
    clearConstructor: () => initialState,
  },
});

export const {
  changeName,
  changeMainImg,
  changeTime,
  changeServingsNum,
  changeComplexity,
  changeCategory,
  changeCommentary,
  addIngredient,
  removeIngredient,
  changeIngredientWeight,
  changeIngredientUnit,
  changeIngredientName,
  addStep,
  removeStep,
  changeStepText,
  clearConstructor,
} = constructorReducer.actions;

export default constructorReducer.reducer;
