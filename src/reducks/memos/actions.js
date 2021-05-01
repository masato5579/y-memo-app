export const FETCH_MEMOS = "FETCH_MEMOS";
export const fetchMemosAction = (memos) => {
  return {
    type: "FETCH_MEMOS",
    payload: memos,
  };
};
