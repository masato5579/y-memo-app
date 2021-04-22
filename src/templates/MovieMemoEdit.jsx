import React, { useState, useCallback } from "react";
import { useDispatch } from "react-redux";
import {
  MovieCard,
  TextInput,
  PrimaryButton,
  SelectBox,
} from "../components/Ulkit";

import { saveMemo } from "../reducks/memos/operations";

const MovieMemoEdit = (props) => {
  const dispatch = useDispatch();

  const url = props.location.state.url;

  const videoid = url.match(
    /(?:https?:\/{2})?(?:w{3}\.)?youtu(?:be)?\.(?:com|be)(?:\/watch\?v=|\/)([^\s&]+)/
  );

  const youtubeurl = `https://www.youtube.com/embed/${videoid[1]}`;

  const thumenail = `https://img.youtube.com/vi/${videoid[1]}`;

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
      <div className="section-container-narrow half-width full-height border-pink">
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
          rows={18}
          value={memo}
          type={"text"}
        />
        <div className="spacer--small" />
        <PrimaryButton
          label={"メモを保存する"}
          onClick={() =>
            dispatch(saveMemo(title, memo, category, youtubeurl, thumenail))
          }
        />
      </div>
    </section>
  );
};

export default MovieMemoEdit;
