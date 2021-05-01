export const DELETE_MEMO = "DELETE_MEMOS";
export const deleteMemoAction = (memos) => {
  return {
    type: "DELETE_MEMOS",
    payload: memos,
  };
};

export const FETCH_MEMOS = "FETCH_MEMOS";
export const fetchMemosAction = (memos) => {
  return {
    type: "FETCH_MEMOS",
    payload: memos,
  };
};
