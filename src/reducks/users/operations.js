import { push } from "connected-react-router";
import { auth, db, FirebaseTimeStamp } from "../../firebase/index";
import { signInAction, signOutAction, fetchFavosAction } from "./actions";

//もしログインしていたらホーム、していなかったら、signinに遷移
export const listenAuthState = () => {
  return async (dispatch) => {
    return auth.onAuthStateChanged((user) => {
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
          });
      } else {
        dispatch(push("/signin"));
      }
    });
  };
};

//パスワードリセット
export const ResetPassword = (email) => {
  return async (dispatch) => {
    if (email === "") {
      alert("必須項目が未入力です");
      return false;
    } else {
      auth
        .sendPasswordResetEmail(email)
        .then(() => {
          alert("入力されたアドレスにパスワードリセット用のメールを送りました");
          dispatch(push("/signin"));
        })
        .catch(() => {
          alert("パスワードリセットに失敗しました。");
        });
    }
  };
};

//signin
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
          })
          .catch(() => {
            alert(
              "サインインに失敗しました。記入内容を確認し、もう一度お試しください"
            );
          });
      }
    });
  };
};

//signup
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
            })
            .catch(() => {
              alert(
                "サインアップに失敗しました。記入内容を確認し、もう一度お試しください"
              );
            });
        }
      });
  };
};

//signout
export const signOut = () => {
  return async (dispatch) => {
    auth.signOut().then(() => {
      dispatch(signOutAction());
      dispatch(push("/signin"));
    });
  };
};

//profileの変更
export const updateProfile = (username, email) => {
  return async (dispatch) => {
    let user = auth.currentUser;
    user
      .updateEmail(email)
      .then(() => {
        if (user) {
          const uid = user.uid;
          const timestamp = FirebaseTimeStamp.now();

          db.collection("users")
            .doc(uid)
            .set(
              { email: email, updated_at: timestamp, username: username },
              { merge: true }
            )
            .then(() => {
              dispatch(push("/profile"));
              alert("プロフィールの変更が完了しました。");
            })
            .catch(() => {
              alert(
                "プロフィールの変更に失敗しました。再度変更お願いいたします。"
              );
            });

          db.collection("users").doc(uid).get();
        }
      })
      .catch(() => {
        alert(
          "プロフィールの変更に失敗しました。再度ログインし、変更お願いします。"
        );
        let result = window.confirm("ログアウトしますか？");
        if (result) {
          signOut();
        }
      });
  };
};

//お気に入りの保存
export const savefavo = (addedfavo) => {
  return async (dispatch, getState) => {
    const uid = getState().users.uid;
    const favoRef = db
      .collection("users")
      .doc(uid)
      .collection("favo")
      .doc(addedfavo.id);
    addedfavo["favoId"] = favoRef.id;
    addedfavo["uid"] = uid;

    await favoRef.set(addedfavo, { merge: true });

    if (addedfavo.favo === false) {
      favoRef.delete();
    }
  };
};

//fanoデータの参照
export const fetchFavos = () => {
  return async (dispatch, getState) => {
    const uid = getState().users.uid;
    db.collection("users")
      .doc(uid)
      .collection("favo")
      .get()
      .then((snapshots) => {
        const favoList = [];
        snapshots.forEach((snapshot) => {
          const favo = snapshot.data();
          favoList.push(favo);
        });
        dispatch(fetchFavosAction(favoList));
      });
  };
};
