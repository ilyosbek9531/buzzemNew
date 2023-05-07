import React from "react";
import styles from "./Review.module.scss";
import { Container } from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";
import { Grid, Pagination } from "swiper";
import ReviewCard from "../ReviewCard/ReviewCard";

const reviewData = [
  {
    id: 1,
    name: "John Doe",
    about: "Asror Majid",
    info: "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. ",
    rating: 2.7,
  },
  {
    id: 2,
    name: "John Doe",
    about: "Asror Majid",
    info: "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. ",
    rating: 2.7,
  },
  {
    id: 3,
    name: "John Doe",
    about: "Asror Majid",
    info: "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. ",
    rating: 2.7,
  },
  {
    id: 4,
    name: "John Doe",
    about: "Asror Majid",
    info: "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. ",
    rating: 2.7,
  },
  {
    id: 5,
    name: "John Doe",
    about: "Asror Majid",
    info: "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. ",
    rating: 2.7,
  },
  {
    id: 6,
    name: "John Doe",
    about: "Asror Majid",
    info: "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. ",
    rating: 2.7,
  },
  {
    id: 7,
    name: "John Doe",
    about: "Asror Majid",
    info: "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. ",
    rating: 2.7,
  },
  {
    id: 8,
    name: "John Doe",
    about: "Asror Majid",
    info: "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. ",
    rating: 2.7,
  },
  {
    id: 9,
    name: "John Doe",
    about: "Asror Majid",
    info: "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. ",
    rating: 2.7,
  },
  {
    id: 10,
    name: "John Doe",
    about: "Asror Majid",
    info: "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. ",
    rating: 2.7,
  },
  {
    id: 11,
    name: "John Doe",
    about: "Asror Majid",
    info: "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. ",
    rating: 2.7,
  },
  {
    id: 12,
    name: "John Doe",
    about: "Asror Majid",
    info: "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. ",
    rating: 2.7,
  },
  {
    id: 13,
    name: "John Doe",
    about: "Asror Majid",
    info: "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. ",
    rating: 2.7,
  },
  {
    id: 14,
    name: "John Doe",
    about: "Asror Majid",
    info: "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. ",
    rating: 2.7,
  },
  {
    id: 15,
    name: "John Doe",
    about: "Asror Majid",
    info: "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. ",
    rating: 2.7,
  },
  {
    id: 16,
    name: "John Doe",
    about: "Asror Majid",
    info: "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. ",
    rating: 2.7,
  },
];

const Review = () => {
  return (
    <div className={styles.review}>
      <Container>
        <div className={styles.review__content}>
          <h2>RECENT REVIEW OF BLOGGERS</h2>
          <div className={styles.review__content__swiper}>
            <Swiper
              slidesPerView={4}
              grid={{
                rows: 2,
                fill: "row",
              }}
              spaceBetween={30}
              pagination={{
                clickable: true,
              }}
              modules={[Grid, Pagination]}
              className="mySwiper"
            >
              {reviewData?.map((el) => (
                <SwiperSlide key={el.id}>
                  <ReviewCard
                    name={el.name}
                    about={el.about}
                    info={el.info}
                    rating={el.rating}
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Review;
