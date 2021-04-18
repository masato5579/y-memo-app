import React, { useCallback, useState } from "react";
import { TextInput, PrimaryButton } from "../components/Ulkit/";
import { signUp } from "../reducks/users/operations";
import { useDispatch } from "react-redux";

const SignUp = () => {
  const dispatch = useDispatch();

  const [username, setUsername] = useState(""),
    [email, setEmail] = useState(""),
    [password, setPassword] = useState(""),
    [repassword, setRePassword] = useState("");

  const InputUserName = useCallback(
    (e) => {
      setUsername(e.target.value);
    },
    [setUsername]
  );

  const InputEmail = useCallback(
    (e) => {
      setEmail(e.target.value);
    },
    [setEmail]
  );

  const InputPassword = useCallback(
    (e) => {
      setPassword(e.target.value);
    },
    [setPassword]
  );

  const InputRePassword = useCallback(
    (e) => {
      setRePassword(e.target.value);
    },
    [setRePassword]
  );

  return (
    <div className="section-container-narrow full-height ">
      <div className="width-sixty">
        <h2 className="heading-one center ">＊アカウント登録＊</h2>
        <div className="spacer--medium" />
        <TextInput
          fullWidth={true}
          label={"ユーザー名"}
          multiline={false}
          required={true}
          rows={1}
          value={username}
          type={"text"}
          onChange={InputUserName}
        />
        <div className="spacer--small" />
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
        <div className="spacer--small" />
        <TextInput
          fullWidth={true}
          label={"パスワード"}
          multiline={false}
          required={true}
          rows={1}
          value={password}
          type={"password"}
          onChange={InputPassword}
        />
        <div className="spacer--small" />
        <TextInput
          fullWidth={true}
          label={"パスワード（確認）"}
          multiline={false}
          required={true}
          rows={1}
          value={repassword}
          type={"password"}
          onChange={InputRePassword}
        />
        <div className="spacer--big" />
        <div className="center">
          <PrimaryButton
            label={"アカウント登録！！"}
            onClick={() =>
              dispatch(signUp(username, email, password, repassword))
            }
          />
        </div>
      </div>
    </div>
  );
};

export default SignUp;
