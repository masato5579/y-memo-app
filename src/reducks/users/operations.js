import { push } from "connected-react-router";
import { auth, db, FirebaseTimeStamp } from "../../firebase/index";
import { signInAction } from "./actions";

export const signIn = (email, password) => {
  //signInから2つの引数を受け取る
  return async (dispatch) => {
    //validation
    if (email === "" || password === "") {
      alert("必須項目が未入力です。");
      return false;
    }

    auth.signInWithEmailAndPassword(email, password).then((result) => {
      const user = result.user;
      //userがあったら、signInActionの発火
      if (user) {
        const uid = user.uid;
        db.collection("users")
          .doc(uid)
          .get()
          .then((snapshot) => {
            const data = snapshot.data();

            dispatch(
              signInAction({
                isSignedIn: true,
                role: data.role,
                uid: uid,
                username: data.username,
              })
            );
            dispatch(push("/"));
          });
      }
    });
  };
};

export const signUp = (username, email, password, repassword) => {
  //signUpから4つの引数を受け取る
  return async (dispatch) => {
    //validation
    if (
      username === "" ||
      email === "" ||
      password === "" ||
      repassword === ""
    ) {
      alert("必須項目が未入力です。");
      return false;
    }

    if (password !== repassword) {
      alert("パスワードが一致していません。もう一度お試しください。");
    }

    //authが成功したら user情報をusersというcollectionの中に保存する
    return auth
      .createUserWithEmailAndPassword(email, password)
      .then((result) => {
        const user = result.user;
        if (user) {
          const uid = user.uid;
          const timestamp = FirebaseTimeStamp.now();

          const userInitialData = {
            created_at: timestamp,
            email: email,
            role: "customer",
            updated_at: timestamp,
            username: username,
          };
          db.collection("users")
            .doc(uid)
            .set(userInitialData)
            .then(() => {
              dispatch(push("/"));
            });
        }
      });
  };
};
