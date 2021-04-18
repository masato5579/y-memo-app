import React, { useCallback, useState } from "react";
import { TextInput, PrimaryButton } from "../components/Ulkit/";
import { signIn } from "../reducks/users/operations";
import { useDispatch } from "react-redux";

const SignIn = () => {
  const dispatch = useDispatch();

  const [email, setEmail] = useState(""),
    [password, setPassword] = useState("");

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

  return (
    <div className="section-container-narrow full-height ">
      <div className="width-sixty">
        <h2 className="heading-one center ">＊サインイン＊</h2>
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
        <div className="spacer--big" />
        <div className="center">
          <PrimaryButton
            label={"サインイン"}
            onClick={() => dispatch(signIn(email, password))}
          />
        </div>
      </div>
    </div>
  );
};

export default SignIn;
