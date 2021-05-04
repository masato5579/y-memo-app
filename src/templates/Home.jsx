import React, { useState, useCallback } from "react";
import { PrimaryButton, TextInput } from "../components/Ulkit/";
import { useHistory } from "react-router";
import { MovieMemoList } from "./index";

const Home = () => {
  const history = useHistory();

  const [url, setUrl] = useState("");

  const InputUrl = useCallback(
    (e) => {
      setUrl(e.target.value);
    },
    [setUrl]
  );

  const PageTransition = () => {
    if (url !== "") {
      const urlid = url.match(
        /(?:https?:\/{2})?(?:w{3}\.)?youtu(?:be)?\.(?:com|be)(?:\/watch\?v=|\/)([^\s&]+)/
      );

      const videoid = urlid[1];

      history.push(`/moviememo`, { videoid: videoid });
    } else {
      alert("URLが貼り付けられていません。");
    }
  };

  return (
    <section>
      <div className="spacer--small" />
      <div className="width-fifty section-container-narrow">
        <h3>YoutubeのURLを貼ってください</h3>
        <div className="spacer--small" />
        <TextInput
          fullWidth={true}
          label={"YoutubeURL"}
          multiline={false}
          required={true}
          rows={1}
          value={url}
          type={"text"}
          onChange={InputUrl}
        />
        <div className="spacer--small" />
        <PrimaryButton
          onClick={PageTransition}
          label={"Youtubeメモを開始する"}
        />
      </div>
      <div className="spacer--medium" />
      <div>
        <MovieMemoList />
      </div>
    </section>
  );
};

export default Home;
