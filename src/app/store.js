import { configureStore } from "@reduxjs/toolkit";
import musicReducer from "../feature/ZingChartPage/musicSlice";

const rootReducer = {
  music: musicReducer,
};

const store = configureStore({
  reducer: rootReducer,
});

export default store;
