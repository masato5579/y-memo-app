import { FirebaseTimeStamp, db } from "../../firebase/";
import { push } from "connected-react-router";

const memosRef = db.collection("memos");

export const saveMemo = (title, memo, category, youtubeurl, thumenail) => {
  return async (dispatch) => {
    const timestamp = FirebaseTimeStamp.now();

    const data = {
      title: title,
      memo: memo,
      category: category,
      youtubeurl: youtubeurl,
      thumenail: thumenail,
      updated_at: timestamp,
    };

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
  };
};
