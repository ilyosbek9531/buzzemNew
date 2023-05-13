import React from "react";
import styles from "./Reviews.module.scss";
import { Grid } from "@mui/material";
import CRating from "../Rating/Rating";

const ratings = [
  {
    id: 1,
    platformName: "Telegram",
    rating: 4.5,
    ratingName: "GOOD",
  },
  {
    id: 2,
    platformName: "Telegram",
    rating: 4.5,
    ratingName: "GOOD",
  },
  {
    id: 3,
    platformName: "Telegram",
    rating: 4.5,
    ratingName: "GOOD",
  },
  {
    id: 4,
    platformName: "Telegram",
    rating: 4.5,
    ratingName: "GOOD",
  },
  {
    id: 5,
    platformName: "Telegram",
    rating: 4.5,
    ratingName: "GOOD",
  },
  {
    id: 6,
    platformName: "Telegram",
    rating: 4.5,
    ratingName: "GOOD",
  },
  {
    id: 7,
    platformName: "Telegram",
    rating: 4.5,
    ratingName: "GOOD",
  },
  {
    id: 8,
    platformName: "Telegram",
    rating: 4.5,
    ratingName: "GOOD",
  },
  {
    id: 9,
    platformName: "Telegram",
    rating: 4.5,
    ratingName: "GOOD",
  },
];

const Reviews = () => {
  return (
    <div className={styles.reviews}>
      <h4>Reviews</h4>
      <div className={styles.reviews__cards}>
        <Grid container spacing={{ xs: 2 }}>
          {ratings.map((rate) => (
            <Grid item xs={12} sm={6} md={4} key={rate.id}>
              <div className={styles.reviews__single}>
                <h6>{rate.platformName}</h6>
                <CRating value={1.5} name="read-only" />
                <h2>{rate.ratingName}</h2>
              </div>
            </Grid>
          ))}
        </Grid>
      </div>
    </div>
  );
};

export default Reviews;
