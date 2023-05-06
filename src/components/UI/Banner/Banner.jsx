import React from "react";
import styles from "./Banner.module.scss";
import { Container } from "@mui/material";
import { ArrowBottomIcon } from "components/Icons";

const Banner = () => {
  return (
    <>
      <div className={styles.banner}>
        <Container>
          <div className={styles.banner__content}>
            <img src="/images/banner.png" alt="banner" />
            <h1>THE BEST WEBSITE ABOUT BLOGGERS</h1>
            <p>
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry.
            </p>
            <div className={styles.banner__content__search}>
              <input type="text" />
              <div>
                <h4>ADVANCER SEARCH</h4>
                <ArrowBottomIcon />
              </div>
            </div>
          </div>
        </Container>
      </div>
      <div className={styles.arcuate}></div>
    </>
  );
};

export default Banner;
