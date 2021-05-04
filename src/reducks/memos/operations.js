import { FirebaseTimeStamp, db } from "../../firebase/";
import { push } from "connected-react-router";
import { deleteMemoAction, fetchMemosAction } from "./actions";

const memosRef = db.collection("memos");
const usersRef = db.collection("users");

export const deleteMemo = (id) => {
  return async (dispatch, getState) => {
    let result = window.confirm(
      "このメモを削除します。本当によろしいでしょうか？"
    );
    if (result) {
      memosRef
        .doc(id)
        .get()
        .then((doc) => {
          const data = doc.data();
          const uid = data.uid;
          usersRef.doc(uid).collection("favo").doc(id).delete();
          memosRef
            .doc(id)
            .delete()
            .then(() => {
              const prevMemos = getState().memos.list;
              const nextMemos = prevMemos.filter((memo) => memo.id !== id);
              dispatch(deleteMemoAction(nextMemos));
            });
        });
    } else {
      return;
    }
  };
};

export const fetchMemos = (category) => {
  return async (dispatch) => {
    let query = memosRef.orderBy("updated_at", "desc");
    if (category !== undefined) {
      query = category !== "" ? query.where("category", "==", category) : query;
    }

    query.get().then((snapshots) => {
      const memoList = [];
      snapshots.forEach((snapshot) => {
        const memo = snapshot.data();
        memoList.push(memo);
      });
      dispatch(fetchMemosAction(memoList));
    });
  };
};

export const saveMemo = (
  id,
  title,
  memo,
  category,
  videoid,
  youtubeurl,
  thumenail
) => {
  return async (dispatch, getState) => {
    const timestamp = FirebaseTimeStamp.now();
    const uid = getState().users.uid;

    const data = {
      title: title,
      memo: memo,
      category: category,
      videoid: videoid,
      youtubeurl: youtubeurl,
      thumenail: thumenail,
      uid: uid,
      updated_at: timestamp,
    };

    if (id === "") {
      const ref = memosRef.doc();
      const id = ref.id;
      data.id = id;
      data.created_at = timestamp;
      return memosRef
        .doc(id)
        .set(data)
        .then(() => {
          dispatch(push("/"));
          alert("メモの登録が完了しました。");
        })
        .catch((error) => {
          throw new Error(error);
        });
    } else {
      return memosRef
        .doc(id)
        .set(data, { merge: true })
        .then(() => {
          dispatch(push("/"));
          alert("メモの編集が完了しました");
        })
        .catch((error) => {
          throw new Error(error);
        });
    }
  };
};
