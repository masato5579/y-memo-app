import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import IconButton from "@material-ui/core/IconButton";
import FavoriteIcon from "@material-ui/icons/Favorite";
import { push } from "connected-react-router";
import { useDispatch } from "react-redux";
import { deleteMemo } from "../../reducks/memos/operations";
import { savefavo } from "../../reducks/users/operations";
import { db, FirebaseTimeStamp } from "../../firebase/index";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    height: 200,
    alignItems: "center",
    justifyContent: "space-between",
  },
  details: {
    display: "flex",
    flexDirection: "column",
  },
  cover: {
    width: 280,
    height: 200,
  },
  content: {
    width: "100%",
    height: 200,
    position: "relative",
  },
}));

const ListCard = (props) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const [favo, setFavo] = useState(props.favo);

  const username = props.username;

  useEffect(() => {
    const favoRef = db
      .collection("users")
      .doc(props.uid)
      .collection("favo")
      .doc(props.id);

    favoRef.get().then((doc) => {
      const data = doc.data();
      if (data !== undefined) {
        const AuthFavo = data.favo;
        setFavo(AuthFavo);
      }
    });
  }, [props.id, props.uid]);

  const addFavo = () => {
    const timestamp = FirebaseTimeStamp.now();
    const newfavo = !favo;
    setFavo(newfavo);
    dispatch(
      savefavo({
        added_at: timestamp,
        thumenail: props.thumenail,
        id: props.id,
        title: props.title,
        memo: props.memo,
        category: props.category,
        videoid: props.videoid,
        youtubeurl: props.youtubeurl,
        favo: newfavo,
        username: username,
      })
    );
  };

  return (
    <Card className={classes.root}>
      <div className={classes.detail}>
        <CardMedia
          className={classes.cover}
          image={props.thumenail}
          title={props.title}
        />
      </div>
      <CardContent className={classes.content}>
        <Typography component="h5" variant="h5">
          {props.title}
        </Typography>
        <div className="spacer--extra-small " />
        <Typography
          variant="subtitle1"
          color="textSecondary"
          className="over-flow-wrap"
          maxLength="3"
        >
          {props.memo}
        </Typography>
        <div className="spacer--extra-extra-small" />
        <div className="right-bottom-position">
          ユーザー名{username}
          <IconButton
            onClick={() => {
              addFavo();
            }}
          >
            <FavoriteIcon style={{ color: favo ? "red" : "#000" }} />
          </IconButton>
          <IconButton
            onClick={() => dispatch(push("/moviememo/edit/" + props.id))}
          >
            <EditIcon />
          </IconButton>
          <IconButton
            onClick={() => {
              dispatch(deleteMemo(props.id));
            }}
          >
            <DeleteIcon />
          </IconButton>
        </div>
      </CardContent>
    </Card>
  );
};

export default ListCard;
