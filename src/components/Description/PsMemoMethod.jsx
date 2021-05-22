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

const PsMemoMethod = () => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const [psmemomethod, setPsmemomethod] = useState();

  useEffect(() => {
    db.collection("psmemomethod")
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
        setPsmemomethod(list);
      });
  }, []);

  return (
    <>
      <section className="section-container-narrow">
        <div className="center">
          <h2 className="heading-one center">YoutubeMemoの使い方</h2>
          <div className="spacer--extra-small" />
          <div>
            <h3 className="subheading">スマホ版</h3>
            {psmemomethod &&
              psmemomethod.map((psmemo) => (
                <div key={psmemo.id}>
                  <DescriptionCard
                    key={psmemo.id}
                    url={psmemo.url}
                    heading={psmemo.heading}
                    link={psmemo.link}
                    paragraph={psmemo.paragraph}
                  />
                  <div className="spacer--medium " />
                </div>
              ))}
          </div>
          <div className="flex">
            <Button
              className={classes.button}
              onClick={() => {
                dispatch(push("/description/pcmemomethod"));
              }}
            >
              メモの仕方(PC版)をみる
            </Button>
            <Button
              className={classes.button}
              onClick={() => {
                dispatch(push("/description/psstart"));
              }}
            >
              メモの始め方(スマホ版)をみる
            </Button>
          </div>
        </div>
      </section>
    </>
  );
};

export default PsMemoMethod;
