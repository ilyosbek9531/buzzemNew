import React from "react";
import styles from "./TopRates.module.scss";
import { Container, Grid } from "@mui/material";
import TopRatesCard from "../TopRatesCard/TopRatesCard";
import MainButton from "../MainButton/MainButton";
import { RightArrowIcon } from "components/Icons";

const topRatesData = [
  {
    id: 1,
    img: "/images/avatar.png",
    category: "Daily life",
    rating: 4.6,
    name: "Nozima Musaboyeva",
    telegram: "",
    youtube: "",
    facebook: "",
    instagram: "",
    location: "Uzbekistan",
    language: "En, Ru",
  },
  {
    id: 2,
    img: "/images/avatar.png",
    category: "Daily life",
    rating: 4.6,
    name: "Nozima Musaboyeva",
    telegram: "",
    youtube: "",
    facebook: "",
    instagram: "",
    location: "",
    language: "",
  },
  {
    id: 3,
    img: "/images/avatar.png",
    category: "Daily life",
    rating: 4.6,
    name: "Nozima Musaboyeva",
    telegram: "",
    youtube: "",
    facebook: "",
    instagram: "",
    location: "",
    language: "",
  },
  {
    id: 4,
    img: "/images/avatar.png",
    category: "Daily life",
    rating: 4.6,
    name: "Nozima Musaboyeva",
    telegram: "",
    youtube: "",
    facebook: "",
    instagram: "",
    location: "",
    language: "",
  },
  {
    id: 5,
    img: "/images/avatar.png",
    category: "Daily life",
    rating: 4.6,
    name: "Nozima Musaboyeva",
    telegram: "",
    youtube: "",
    facebook: "",
    instagram: "",
    location: "",
    language: "",
  },
  {
    id: 6,
    img: "/images/avatar.png",
    category: "Daily life",
    rating: 4.6,
    name: "Nozima Musaboyeva",
    telegram: "",
    youtube: "",
    facebook: "",
    instagram: "",
    location: "",
    language: "",
  },
];

const TopRates = () => {
  return (
    <Container>
      <div className={styles.rates}>
        <h2>TOP RATES</h2>
        <Grid container spacing={{ xs: 2, sm: 3 }}>
          {topRatesData.map((el) => (
            <Grid item xs={12} sm={6} md={4} key={el.id}>
              <TopRatesCard
                img={el.img}
                category={el.category}
                rating={el.rating}
                name={el.name}
                telegram={el.telegram}
                youtube={el.youtube}
                facebook={el.facebook}
                instagram={el.instagram}
                location={el.location}
                language={el.language}
              />
            </Grid>
          ))}
        </Grid>
        <div className={styles.rates__more}>
          <MainButton
            text="Full list"
            endIcon={<RightArrowIcon />}
            variant="outlined"
          />
        </div>
      </div>
    </Container>
  );
};

export default TopRates;
