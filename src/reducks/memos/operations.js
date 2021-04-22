import { FirebaseTimeStamp, db } from "../../firebase/";
import { push } from "connected-react-router";

const memosRef = db.collection("memos");

export const saveMemo = (
  id,
  title,
  memo,
  category,
  videoid,
  youtubeurl,
  thumenail
) => {
  return async (dispatch) => {
    const timestamp = FirebaseTimeStamp.now();

    const data = {
      title: title,
      memo: memo,
      category: category,
      videoid: videoid,
      youtubeurl: youtubeurl,
      thumenail: thumenail,
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
          alert("メモの登録が完了しました。");
          dispatch(push("/"));
        })
        .catch((error) => {
          throw new Error(error);
        });
    } else {
      return memosRef
        .doc(id)
        .set(data, { merge: true })
        .then(() => {
          alert("メモの編集が完了しました");
          dispatch(push("/"));
        })
        .catch((error) => {
          throw new Error(error);
        });
    }
  };
};
