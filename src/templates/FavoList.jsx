import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FavoListCard } from "../components/Ulkit";
import { fetchFavos } from "../reducks/users/operations";
import { getFavos } from "../reducks/users/selectors";

const FavoList = () => {
  const dispatch = useDispatch();
  const selector = useSelector((state) => state);
  const favos = getFavos(selector);

  //favoの取得
  useEffect(() => {
    dispatch(fetchFavos());
  }, [dispatch]);

  return (
    <section className="ninety-width-center">
      <div className="spacer--medium" />
      <h2 className="heading-two">お気に入り一覧</h2>
      <div className="spacer--medium" />
      {favos !== undefined &&
        favos.map((favo) => (
          <div key={favo.id}>
            <FavoListCard
              thumenail={favo.thumenail}
              id={favo.id}
              key={favo.id}
              title={favo.title}
              memo={favo.memo}
              category={favo.category}
              videoid={favo.videoid}
              youtubeurl={favo.youtubeurl}
              uid={favo.uid}
              username={favo.username}
              favo={favo.favo}
            />
            <div className="spacer--medium" />
          </div>
        ))}
    </section>
  );
};

export default FavoList;
