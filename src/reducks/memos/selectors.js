import { createSelector } from "reselect";

const memosSelector = (state) => state.memos;

export const getMemos = createSelector([memosSelector], (state) => state.list);
