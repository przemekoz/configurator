import { configureStore } from "@reduxjs/toolkit";
import { filterReducer } from "./features/filter/filter-store";
import { orderReducer } from "./features/order/order-store";
import { PreviewReducer } from "./features/preview/preview-store";

export const store = configureStore({
  reducer: {
    order: orderReducer,
    filter: filterReducer,
    preview: PreviewReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
