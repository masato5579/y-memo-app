import React, { useEffect, useState } from "react";
import { db } from "../../firebase/index";
import { DescriptionCard } from "./index";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import { useDispatch } from "react-redux";
import { push } from "connected-react-router";

const useStyles = makeStyles((theme) => ({
  button: {
    "& > *": {
      color: "#F84BAC",
      fontSize: "1rem",
    },
  },
}));

const PcMemoMethod = () => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const [pcmemomethod, setPcmemomethod] = useState();

  useEffect(() => {
    db.collection("pcmemomethod")
      .orderBy("order")
      .get()
      .then((snapshots) => {
        const list = [];
        snapshots.forEach((snapshot) => {
          const data = snapshot.data();
          list.push({
            url: data.url,
            heading: data.heading,
            link: data.link,
            paragraph: data.paragraph,
          });
        });
        setPcmemomethod(list);
      });
  }, []);

  return (
    <>
      <section className="section-container-narrow">
        <div className="center">
          <h2 className="heading-one center">YoutubeMemoの使い方</h2>
          <div className="spacer--extra-small" />
          <div>
            <h3 className="subheading">PC版</h3>
            {pcmemomethod &&
              pcmemomethod.map((pcmemo) => (
                <div key={pcmemo.id}>
                  <DescriptionCard
                    key={pcmemo.id}
                    url={pcmemo.url}
                    heading={pcmemo.heading}
                    link={pcmemo.link}
                    paragraph={pcmemo.paragraph}
                  />
                  <div className="spacer--medium " />
                </div>
              ))}
          </div>
          <div className="flex">
            <Button
              className={classes.button}
              onClick={() => {
                dispatch(push("/description/psmemomethod"));
              }}
            >
              メモの仕方(スマホ版)をみる
            </Button>
            <Button
              className={classes.button}
              onClick={() => {
                dispatch(push("/description/pcstart"));
              }}
            >
              メモの始め方(PC版)をみる
            </Button>
          </div>
        </div>
      </section>
    </>
  );
};

export default PcMemoMethod;
