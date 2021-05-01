import React, { useState, useCallback, useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  MovieCard,
  TextInput,
  PrimaryButton,
  SelectBox,
} from "../components/Ulkit";
import { db } from "../firebase";

import { saveMemo } from "../reducks/memos/operations";

const MovieMemoEdit = (props) => {
  const dispatch = useDispatch();

  let id = window.location.pathname.split("/moviememo/edit")[1];

  if (id !== "") {
    id = id.split("/")[1];
  }

  const [title, setTitle] = useState(""),
    [memo, setMemo] = useState(""),
    [category, setCategory] = useState(""),
    [videoid, setVideoid] = useState(""),
    [youtubeurl, setYoutubeurl] = useState(""),
    [thumenail, setThumenail] = useState(""),
    [favo, setFavo] = useState(false);

  const InputTitle = useCallback(
    (e) => {
      setTitle(e.target.value);
    },
    [setTitle]
  );

  const InputMemo = useCallback(
    (e) => {
      setMemo(e.target.value);
    },
    [setMemo]
  );

  const FavoToggle = () => {
    setFavo(!favo);
  };

  const categories = [
    {
      id: "music",
      name: "音楽",
    },
    {
      id: "variety",
      name: "お笑い",
    },
    {
      id: "anime",
      name: "アニメ",
    },
  ];

  useEffect(() => {
    if (id !== "") {
      db.collection("memos")
        .doc(id)
        .get()
        .then((snapshot) => {
          const data = snapshot.data();
          setTitle(data.title);
          setMemo(data.memo);
          setCategory(data.category);
          setVideoid(data.videoid);
          setYoutubeurl(data.youtubeurl);
          setThumenail(data.thumenail);
          setFavo(data.favo);
        });
    }
  }, [id]);

  return (
    <section className="flex display-block">
      <div className="half-width ">
        <MovieCard url={youtubeurl} favo={favo} FavoToggle={FavoToggle} />
      </div>
      <div className="section-container-narrow-top half-width ">
        <TextInput
          fullWidth={true}
          label={"タイトル"}
          multiline={false}
          required={true}
          onChange={InputTitle}
          rows={1}
          value={title}
          type={"text"}
        />
        <div className="spacer--small" />
        <h3>サムネイル</h3>
        <div className="spacer--extra-extra-small" />
        <img src={thumenail + "/default.jpg"} alt="thumenail" />
        <div className="spacer--extra-extra-small" />
        <p>URL　:　{thumenail + "/default.jpg"} </p>
        <div className="spacer--small" />
        <SelectBox
          label={"カテゴリー"}
          required={true}
          options={categories}
          select={setCategory}
          value={category}
        />

        <TextInput
          fullWidth={true}
          label={"メモ"}
          multiline={true}
          required={true}
          onChange={InputMemo}
          rows={15}
          value={memo}
          type={"text"}
        />
        <div className="spacer--small" />
        <PrimaryButton
          label={"メモを編集する"}
          onClick={() =>
            dispatch(
              saveMemo(
                id,
                title,
                memo,
                videoid,
                category,
                youtubeurl,
                thumenail,
                favo
              )
            )
          }
        />
      </div>
    </section>
  );
};

export default MovieMemoEdit;
