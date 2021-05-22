import React, { useEffect, useState } from "react";
import { db } from "../../firebase/index";
import { DescriptionCard } from "./index";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import { useDispatch } from "react-redux";
import { push } from "connected-react-router";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles((theme) => ({
  button: {
    "& > *": {
      color: "#F84BAC",
      fontSize: "1rem",
    },
  },
  media: {
    height: 200,
    width: "100%",
  },
  actionarea: {
    marginBottom: 30,
  },
}));

const Description = () => {
  const dispatch = useDispatch();
  const classes = useStyles();

  return (
    <>
      <section className="section-container-narrow">
        <div className="center">
          <h2 className="heading-one center">YoutubeMemo使い方リスト</h2>
          <div className="spacer--extra-small" />

          <Card className={classes.root}>
            <CardActionArea
              className={classes.actionarea}
              onClick={() => {
                dispatch(push("/description/pcstart"));
              }}
            >
              <CardMedia
                className={classes.media}
                image="https://firebasestorage.googleapis.com/v0/b/y-memo-app.appspot.com/o/image%2FPCStart.PNG?alt=media&token=81c4a77d-7e13-496a-ba4c-785767d54662"
                title="YoutubeMEMOの始め方(PC版)"
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="h2">
                  YoutubeMEMO始め方(PC版)
                </Typography>
              </CardContent>
            </CardActionArea>
            <CardActionArea
              className={classes.actionarea}
              onClick={() => {
                dispatch(push("/description/pcmemomethod"));
              }}
            >
              <CardMedia
                className={classes.media}
                image="https://firebasestorage.googleapis.com/v0/b/y-memo-app.appspot.com/o/image%2FPCuse.PNG?alt=media&token=f5946581-7861-475e-a6f6-7dc483c565e3"
                title="YoutubeMEMOの使い方(PC版)"
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="h2">
                  YoutubeMEMO使い方(PC版)
                </Typography>
              </CardContent>
            </CardActionArea>
            <CardActionArea
              className={classes.actionarea}
              onClick={() => {
                dispatch(push("/description/psstart"));
              }}
            >
              <CardMedia
                className={classes.media}
                image="https://firebasestorage.googleapis.com/v0/b/y-memo-app.appspot.com/o/image%2FPSStart.PNG?alt=media&token=0855f3da-5269-4ca8-ae11-3cd3e5b40bf0"
                title="YoutubeMEMOの始め方(スマホ版)"
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="h2">
                  YoutubeMEMO始め方(スマホ版)
                </Typography>
              </CardContent>
            </CardActionArea>
            <CardActionArea
              className={classes.actionarea}
              onClick={() => {
                dispatch(push("/description/psmemomethod"));
              }}
            >
              <CardMedia
                className={classes.media}
                image="https://firebasestorage.googleapis.com/v0/b/y-memo-app.appspot.com/o/image%2FPSuse.PNG?alt=media&token=e243efa9-8178-44ce-abed-ed98a79bd8d4"
                title="YoutubeMEMOの使い方(スマホ版)"
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="h2">
                  YoutubeMEMO使い方(スマホ版)
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </div>
      </section>
    </>
  );
};

export default Description;
