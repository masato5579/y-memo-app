import React, { useState, useEffect } from "react";
import { PrimaryButton, SelectBox } from "../components/Ulkit";
import { MovieMemoList } from "./index";
import { useDispatch } from "react-redux";
import { db } from "../firebase";
import { push } from "connected-react-router";

const Category = () => {
  const dispatch = useDispatch();
  const [categories, setCategories] = useState([]),
    [category, setCategory] = useState("");

  //categoryページに遷移
  const selectMenu = (category) => {
    dispatch(push(`/category/?category=${category}`));
  };

  useEffect(() => {
    //firebaseからcategoriesコレクションの取得
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
      });
  }, []);

  return (
    <section className="display-block">
      <div className="spacer--small" />
      <div className="width-fifty section-container-narrow">
        <h3>カテゴリーを選択してください</h3>
        <div className="spacer--small" />
        <SelectBox
          label={"カテゴリー"}
          required={true}
          options={categories}
          select={setCategory}
          value={category}
        />
        <div className="spacer--small" />
        <PrimaryButton
          onClick={() => selectMenu(category)}
          label={"カテゴリ抽出する"}
        />
      </div>
      <div className="spacer--medium" />
      <MovieMemoList />
    </section>
  );
};

export default Category;
