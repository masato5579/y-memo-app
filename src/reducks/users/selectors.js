import { createSelector } from "reselect";

const usersSelector = (state) => state.users;

//uidの取得
export const getUserId = createSelector([usersSelector], (state) => state.uid);

//usernameの取得
export const getUserName = createSelector(
  [usersSelector],
  (state) => state.username
);
