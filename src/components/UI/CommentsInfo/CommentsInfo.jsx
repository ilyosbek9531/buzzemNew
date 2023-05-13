import React from "react";
import styles from "./CommentsInfo.module.scss";
import CRating from "../Rating/Rating";
import { LikeIcon, LikeIconReverse, ProhibetIcon } from "components/Icons";

const CommentsInfo = () => {
  return (
    <div className={styles.info}>
      <img src="/images/avatar.png" alt="avatar" />
      <div className={styles.info__content}>
        <h3>Somebody 1</h3>
        <div className={styles.info__content__rating}>
          <div className={styles.info__content__rating__item}>
            <CRating value={1.5} name="read-only" />
            <span>1.5</span>
          </div>
          <div className={styles.info__content__rating__platform}>
            <p>
              For: <span>Youtube</span>
            </p>
          </div>
        </div>
        <div className={styles.info__content__information}>
          From the consumers point of view, how much faster is 5G compared to 4G
          in terms of data transfer much faster?
        </div>
        <div className={styles.info__content__bottom}>
          <div className={styles.info__content__bottom__like}>
            <div className={styles.info__content__bottom__like__item}>
              <LikeIcon />
              <h6>5985</h6>
            </div>
            <div className={styles.info__content__bottom__like__item}>
              <LikeIconReverse />
              <h6>899</h6>
            </div>
          </div>
          <div className={styles.info__content__bottom__report}>
            <ProhibetIcon />
            <h6>Report</h6>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommentsInfo;
