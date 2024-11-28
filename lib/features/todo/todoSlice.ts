import { createSlice } from "@reduxjs/toolkit";

interface TodoState {}

const initialState: TodoState = {};

const todoSlice = createSlice({
  name: "todo_slice",
  initialState,
  reducers: {},
});

export const todoReducer = todoSlice.reducer;
export const {} = todoSlice.actions;
