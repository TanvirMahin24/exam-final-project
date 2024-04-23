import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ExamType, ResultType } from "../../types/Exam";

type ExamSliceType = {
  created: ExamType[] | null;
  upcoming: ExamType[] | null;
  results: ResultType[] | null;
};

const initialState = {
  created: null,
  upcoming: null,
  results: null,
} as ExamSliceType;

export const exam = createSlice({
  name: "exam",
  initialState,
  reducers: {
    setCreated: (state, action: PayloadAction<any>) => {
      state.created = action.payload;
    },
    setUpcoming: (state, action: PayloadAction<any>) => {
      state.upcoming = action.payload;
    },
    setResults: (state, action: PayloadAction<any>) => {
      state.results = action.payload;
    },
    setData: (state, action: PayloadAction<any>) => {
      state.results = action.payload.results;
      state.created = action.payload.created;
      state.upcoming = action.payload.exams;
    },
  },
});

export const { setCreated, setResults, setUpcoming, setData } = exam.actions;
export default exam.reducer;
