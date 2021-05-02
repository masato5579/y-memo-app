import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ListCard } from "../components/Ulkit";
import { fetchMemos } from "../reducks/memos/operations";
import { getMemos } from "../reducks/memos/selectors";
import { db } from "../firebase/index";

const MovieMemoList = () => {
  const dispatch = useDispatch();
  const selector = useSelector((state) => state);
  const memos = getMemos(selector);

  useEffect(() => {
    dispatch(fetchMemos());
  }, [dispatch]);

  return (
    <section className="ninety-width-center">
      <div className="spacer--medium" />
      <h2 className="heading-two">メモ一覧</h2>
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

export default MovieMemoList;
