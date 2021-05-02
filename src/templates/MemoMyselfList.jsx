import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ListCard } from "../components/Ulkit";
import { fetchMemos } from "../reducks/memos/operations";
import { getMemos } from "../reducks/memos/selectors";
import { getUserId } from "../reducks/users/selectors";

const MemoMyselfList = () => {
  const selector = useSelector((state) => state);
  const loginUserId = getUserId(selector);
  let memos = getMemos(selector);

  memos = memos.filter((memo) => memo.uid === loginUserId);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchMemos());
  }, [dispatch]);

  return (
    <section className="ninety-width-center">
      <div className="spacer--medium" />
      <h2 className="heading-two">自分のメモ一覧</h2>
      <div className="spacer--medium" />
      {memos.length > 0 &&
        memos.map((memo) => (
          <div>
            <ListCard
              thumenail={memo.thumenail}
              key={memo.id}
              id={memo.id}
              title={memo.title}
              memo={memo.memo}
              favo={memo.favo}
              uid={memo.uid}
            />
            <div className="spacer--medium" />
          </div>
        ))}
    </section>
  );
};

export default MemoMyselfList;
