import { configureStore } from "@reduxjs/toolkit";

import DataCollectorSlice from "./slices/DataCollectorSlice";
// ...

export const store = configureStore({
  reducer: {
    DataCollectorReducer: DataCollectorSlice,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
