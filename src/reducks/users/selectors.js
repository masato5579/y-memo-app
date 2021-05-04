import { createSelector } from "reselect";

const usersSelector = (state) => state.users;

//signinしているかどうかのBoolean取得
export const getIsSignedIn = createSelector(
  [usersSelector],
  (state) => state.isSignedIn
);

//uidの取得
export const getUserId = createSelector([usersSelector], (state) => state.uid);

//usernameの取得
export const getUserName = createSelector(
  [usersSelector],
  (state) => state.username
);

//favoの取得
export const getFavos = createSelector([usersSelector], (state) => state.favos);
