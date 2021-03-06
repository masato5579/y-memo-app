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
import { useDispatch, useSelector } from "react-redux";
import { deleteMemo } from "../../reducks/memos/operations";
import { savefavo } from "../../reducks/users/operations";
import { db, FirebaseTimeStamp } from "../../firebase/index";
import { getUserId } from "../../reducks/users/selectors";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    height: 250,
    alignItems: "center",
    justifyContent: "space-between",
    [theme.breakpoints.down("sm")]: {
      display: "block",
      height: "auto",
    },
  },
  details: {
    display: "flex",
    flexDirection: "column",
  },
  cover: {
    minWidth: 288,
    height: 250,
  },
  content: {
    width: "100%",
    height: 250,
    position: "relative",
  },
  icons: {
    position: "absolute",
    right: "10px",
    top: "180px",
  },
  icon: {
    textAlign: "right",
  },
}));

const ListCard = (props) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const selector = useSelector((state) => state);
  const uid = getUserId(selector);

  const thumenail = props.thumenail + "/default.jpg";

  const [favo, setFavo] = useState();

  const [userName, setUserName] = useState("");

  useEffect(() => {
    if (props.uid !== undefined) {
      const usersRef = db.collection("users").doc(props.uid);
      usersRef.get().then((doc) => {
        const data = doc.data();
        const userName = data.username;
        setUserName(userName);
      });
    }
  }, [props.uid]);

  useEffect(() => {
    const favoRef = db
      .collection("users")
      .doc(uid)
      .collection("favo")
      .doc(props.id);

    favoRef.get().then((doc) => {
      const data = doc.data();
      if (data !== undefined) {
        const AuthFavo = data.favo;
        setFavo(AuthFavo);
      }
    });
  }, [props.id, uid]);

  const addFavo = () => {
    const timestamp = FirebaseTimeStamp.now();
    const newfavo = !favo;
    setFavo(newfavo);
    dispatch(
      savefavo({
        added_at: timestamp,
        thumenail: thumenail,
        id: props.id,
        title: props.title,
        memo: props.memo,
        category: props.category,
        videoid: props.videoid,
        youtubeurl: props.youtubeurl,
        favo: newfavo,
        username: userName,
      })
    );
  };

  return (
    <Card className={classes.root}>
      <div className={classes.detail}>
        <CardMedia
          className={classes.cover}
          image={thumenail}
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
        <div className="spacer--extra-small " />
        <div className="spacer--extra-small " />
        <div className={classes.icons}>
          <div className={classes.username}>
            <p>???????????????{userName}</p>
          </div>
          <div className={classes.icon}>
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
        </div>
      </CardContent>
    </Card>
  );
};

export default ListCard;
