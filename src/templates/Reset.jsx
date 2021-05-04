import React, { useCallback, useState } from "react";
import { TextInput, PrimaryButton } from "../components/Ulkit";
import { ResetPassword } from "../reducks/users/operations";
import { useDispatch } from "react-redux";
import { push } from "connected-react-router";

const Reset = () => {
  const dispatch = useDispatch();

  const [email, setEmail] = useState("");

  const InputEmail = useCallback(
    (e) => {
      setEmail(e.target.value);
    },
    [setEmail]
  );

  return (
    <div className="section-container-narrow">
      <div className="width-sixty">
        <h2 className="heading-one center ">＊パスワードリセット＊</h2>
        <div className="spacer--medium" />
        <TextInput
          fullWidth={true}
          label={"メールアドレス"}
          multiline={false}
          required={true}
          rows={1}
          value={email}
          type={"email"}
          onChange={InputEmail}
        />
        <div className="spacer--big" />
        <div className="center">
          <PrimaryButton
            label={"リセットパスワード"}
            onClick={() => dispatch(ResetPassword(email))}
          />
          <div className="spacer--small" />
          <p
            className="cursor-pointer "
            onClick={() => dispatch(push("/signin"))}
          >
            ログイン画面に戻る
          </p>
        </div>
      </div>
    </div>
  );
};

export default Reset;
