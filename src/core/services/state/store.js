import { configureStore } from "@reduxjs/toolkit";
import { DomainsApiSlice } from "./domains/domainsApiSlice";

export const store = configureStore({
  reducer: {
    [DomainsApiSlice.reducerPath]: DomainsApiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(DomainsApiSlice.middleware);
  },
});
