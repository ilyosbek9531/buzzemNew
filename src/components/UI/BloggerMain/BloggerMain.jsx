import React from "react";
import styles from "./BloggerMain.module.scss";
import {
  BloggerNameIcon,
  LocationIcon,
  ProfileLanguageIcon,
  RatingBigIcon,
} from "components/Icons";
import MainButton from "../MainButton/MainButton";
import CRating from "../Rating/Rating";

const BloggerMain = () => {
  return (
    <div className={styles.main}>
      <img
        src="/images/blogger.png"
        alt="blogger"
        className={styles.main__img}
      />
      <div className={styles.main__content}>
        <div className={styles.main__content__left}>
          <div className={styles.main__content__left__info}>
            <h6>Female</h6>
            <div>|</div>
            <h6>29 years old</h6>
          </div>
          <div className={styles.main__content__left__name}>
            <h2>Musaboyeva Nozima</h2>
            <BloggerNameIcon />
          </div>
          <div className={styles.main__content__left__info}>
            <LocationIcon />
            <h6>Uzbekistan</h6>
            <div>|</div>
            <h6>Joined at: 12:29PM, 12.23.2021</h6>
          </div>
          <div className={styles.main__content__left__buttons}>
            <MainButton
              text="English"
              variant="outlined"
              icon={<ProfileLanguageIcon />}
              sx={{
                padding: "3px 8px",
                height: "auto",
                background: "#F8F9FA",
                border: "1px solid #CED4DA",
                borderRadius: "4px",
                color: "#212529",

                "&:hover": {
                  border: "1px solid #CED4DA",
                },
              }}
            />
            <MainButton
              text="Russian"
              icon={<ProfileLanguageIcon />}
              variant="outlined"
              sx={{
                padding: "3px 8px",
                height: "auto",
                background: "#F8F9FA",
                border: "1px solid #CED4DA",
                borderRadius: "4px",
                color: "#212529",

                "&:hover": {
                  border: "1px solid #CED4DA",
                },
              }}
            />
          </div>
        </div>
        <div className={styles.main__content__right}>
          <div className={styles.main__content__right__item}>
            <CRating value={1.5} name="read-only" />
            <div className={styles.main__content__right__item__rating}>
              <RatingBigIcon />
              <h6>89</h6>
            </div>
          </div>
          <h5>405 people rated so far</h5>
        </div>
      </div>
    </div>
  );
};

export default BloggerMain;
