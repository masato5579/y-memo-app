import React, { useState, useCallback } from "react";
import { getUserId, getUserName } from "../reducks/users/selectors";
import { useDispatch, useSelector } from "react-redux";
import { signOut } from "../reducks/users/operations";
import { PrimaryButton, TextInput } from "../components/Ulkit/";
import { useHistory } from "react-router";

const Home = () => {
  const dispatch = useDispatch();
  const selector = useSelector((state) => state);
  const uid = getUserId(selector);
  const username = getUserName(selector);

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

      history.push(`/moviememo/edit`, { videoid: videoid });
    } else {
      alert("URLが貼り付けられていません。");
    }
  };

  return (
    <section>
      <button onClick={() => dispatch(signOut())}>SIGNOUT</button>
      <p>ユーザーID:{uid}</p>
      <p>ユーザー名{username}</p>
      <div className="width-fifty section-container-narrow">
        <h3>YoutubeのURLを貼ってください</h3>
        <TextInput
          fullWidth={true}
          label={"YoutubeURL"}
          multiline={false}
          required={true}
          rows={1}
          value={url}
          type={URL}
          onChange={InputUrl}
        />
        <div className="spacer--small" />
        <PrimaryButton
          onClick={PageTransition}
          label={"Youtubeメモを開始する"}
        />
      </div>
    </section>
  );
};

export default Home;
