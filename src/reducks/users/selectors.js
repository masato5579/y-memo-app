import { createSelector } from "reselect";

const usersSelector = (state) => state.users;

//signinしているかどうかのBoolean取得
export const getIsSignedIn = createSelector(
  [usersSelector],
  (state) => state.isSignedIn
);

// export const getMemoMyself = createSelector(
//   [usersSelector],
//   (state) => state.memomyself
// );

//uidの取得
export const getUserId = createSelector([usersSelector], (state) => state.uid);

//usernameの取得
export const getUserName = createSelector(
  [usersSelector],
  (state) => state.username
);
