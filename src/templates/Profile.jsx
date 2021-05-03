import React, { useCallback, useState } from "react";
import { TextInput, PrimaryButton } from "../components/Ulkit/";
import { useDispatch, useSelector } from "react-redux";
import { getUserName } from "../reducks/users/selectors";
import { updateProfile } from "../reducks/users/operations";
import { auth } from "../firebase/index";

const Profile = () => {
  const dispatch = useDispatch();
  const user = auth.currentUser;
  const LoginUserEmail = user.email;

  const selector = useSelector((state) => state);
  const LoginUserName = getUserName(selector);

  const [username, setUsername] = useState(LoginUserName),
    [email, setEmail] = useState(LoginUserEmail);

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

  return (
    <div className="section-container-narrow full-height ">
      <div className="width-sixty">
        <h2 className="heading-one center ">プロフィール</h2>
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
        <div className="spacer--big" />
        <div className="center">
          <PrimaryButton
            label={"プロフィール情報を変更する"}
            onClick={() => dispatch(updateProfile(username, email))}
          />
          <div className="spacer--small" />
        </div>
      </div>
    </div>
  );
};

export default Profile;
