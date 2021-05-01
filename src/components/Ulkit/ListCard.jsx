import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import IconButton from "@material-ui/core/IconButton";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import { push } from "connected-react-router";
import { useDispatch } from "react-redux";
import { deleteMemo } from "../../reducks/memos/operations";

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

  const thumenail = props.thumenail + "/default.jpg";

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
          maxlength="3"
        >
          {props.memo}
        </Typography>
        <div className="spacer--extra-extra-small" />
        <div className="right-bottom-position">
          <IconButton
          // onClick={() => {
          //   dispatch(deleteMemo(props.id));
          // }}
          >
            <FavoriteBorderIcon />
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
