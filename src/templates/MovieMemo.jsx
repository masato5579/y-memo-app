import React, { useState, useCallback } from "react";
import { useDispatch } from "react-redux";
import {
  MovieCard,
  TextInput,
  PrimaryButton,
  SelectBox,
} from "../components/Ulkit";
import { saveMemo } from "../reducks/memos/operations";

const MovieMemo = (props) => {
  const dispatch = useDispatch();

  let id = window.location.pathname.split("/moviememo")[1];

  if (id !== "") {
    id = id.split("/")[1];
  }

  const videoid = props.location.state.videoid;

  const youtubeurl = `https://www.youtube.com/embed/${videoid}`;

  const thumenail = `https://img.youtube.com/vi/${videoid}`;

  const [title, setTitle] = useState(""),
    [memo, setMemo] = useState(""),
    [category, setCategory] = useState("");

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

  return (
    <section className="flex display-block">
      <div className="half-width ">
        <MovieCard url={youtubeurl} />
      </div>
      <div className="section-container-narrow-top  half-width ">
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
          label={"メモを保存する"}
          onClick={() => {
            dispatch(
              saveMemo(
                id,
                title,
                memo,
                category,
                videoid,
                youtubeurl,
                thumenail
              )
            );
          }}
        />
      </div>
    </section>
  );
};

export default MovieMemo;
