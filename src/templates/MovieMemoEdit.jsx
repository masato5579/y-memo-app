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
    [categories, setCategories] = useState([]),
    [videoid, setVideoid] = useState(""),
    [youtubeurl, setYoutubeurl] = useState(""),
    [thumenail, setThumenail] = useState("");

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

  useEffect(() => {
    db.collection("categories")
      .orderBy("order", "asc")
      .get()
      .then((snapshots) => {
        const list = [];
        snapshots.forEach((snapshot) => {
          const data = snapshot.data();
          list.push({
            id: data.id,
            name: data.name,
          });
        });
        setCategories(list);
        console.log(list);
      });
  }, []);

  useEffect(() => {
    if (id !== "") {
      db.collection("memos")
        .doc(id)
        .get()
        .then((snapshot) => {
          const data = snapshot.data();
          setTitle(data.title);
          setMemo(data.memo);
          console.log(data.category);
          setCategory(data.category);
          setVideoid(data.videoid);
          setYoutubeurl(data.youtubeurl);
          setThumenail(data.thumenail);
        });
    }
  }, [id]);

  return (
    <section className="editflex ">
      <div className="edit-half-width  ">
        <MovieCard url={youtubeurl} />
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
                category,
                videoid,
                youtubeurl,
                thumenail
              )
            )
          }
        />
      </div>
    </section>
  );
};

export default MovieMemoEdit;
