import React, { useRef } from "react";
import styles from "./Banner.module.scss";
import { Container } from "@mui/material";
import { ArrowBottomIcon, SearchIcon } from "components/Icons";
import MainButton from "../MainButton/MainButton";

const Banner = () => {
  const inputRef = useRef(null);

  const handleFocusInput = () => {
    inputRef.current.focus();
  };

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
            <div
              className={styles.banner__content__search}
              onClick={handleFocusInput}
            >
              <div className={styles.banner__content__search__input}>
                <input
                  type="text"
                  placeholder="Search blogger ..."
                  ref={inputRef}
                />
                <div className={styles.banner__content__search__input__button}>
                  <MainButton
                    text="SEARCH"
                    icon={<SearchIcon />}
                    sx={{
                      padding: "20px 34px",
                      boxShadow: "0px 4px 16px rgba(79, 70, 229, 0.16)",
                      borderRadius: "50px !important",
                    }}
                    variant="contained"
                  />
                </div>
              </div>
              <div className={styles.banner__content__search__more}>
                <div className={styles.banner__content__search__more__content}>
                  <h4>ADVANCER SEARCH</h4>
                  <ArrowBottomIcon />
                </div>
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
