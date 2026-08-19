import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import apiKeysReducer from "./slices/apiKeysSlice";
import analyticsReducer from "./slices/analyticsSlice";
import billingReducer from "./slices/billingSlice";

export const makeStore = () =>
  configureStore({
    reducer: {
      auth: authReducer,
      apiKeys: apiKeysReducer,
      analytics: analyticsReducer,
      billing: billingReducer,
    },
  });

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
