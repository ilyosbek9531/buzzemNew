import React from "react";
import styles from "./Categories.module.scss";
import { Container } from "@mui/material";
import Marquee from "react-fast-marquee";
import CategoriesCard from "../CategoriesCard/CategoriesCard";

const categoriesData = [
  {
    icon: "/images/CategoriesIcon1.svg",
    text: "News",
  },
  {
    icon: "/images/CategoriesIcon1.svg",
    text: "News",
  },
  {
    icon: "/images/CategoriesIcon1.svg",
    text: "News",
  },
  {
    icon: "/images/CategoriesIcon1.svg",
    text: "News",
  },
  {
    icon: "/images/CategoriesIcon1.svg",
    text: "News",
  },
  {
    icon: "/images/CategoriesIcon1.svg",
    text: "News",
  },
  {
    icon: "/images/CategoriesIcon1.svg",
    text: "News",
  },
  {
    icon: "/images/CategoriesIcon1.svg",
    text: "News",
  },
  {
    icon: "/images/CategoriesIcon1.svg",
    text: "News",
  },
  {
    icon: "/images/CategoriesIcon1.svg",
    text: "News",
  },
  {
    icon: "/images/CategoriesIcon1.svg",
    text: "News",
  },
  {
    icon: "/images/CategoriesIcon1.svg",
    text: "News",
  },
  {
    icon: "/images/CategoriesIcon1.svg",
    text: "News",
  },
  {
    icon: "/images/CategoriesIcon1.svg",
    text: "News",
  },
  {
    icon: "/images/CategoriesIcon1.svg",
    text: "News",
  },
];

const Categories = () => {
  return (
    <Container>
      <div className={styles.categories}>
        <div className={styles.wrapper}>
          <Marquee
            className={styles.wrap__marquee}
            pauseOnHover={true}
            speed={30}
            direction="right"
            gradientWidth={20}
          >
            <div className={styles.marquee}>
              {categoriesData.map((el, index) => (
                <CategoriesCard icon={el.icon} text={el.text} key={index} />
              ))}
            </div>
          </Marquee>
          <Marquee
            className={styles.wrap__marquee}
            loop={0}
            pauseOnHover={true}
            speed={40}
            direction="left"
            gradientWidth={20}
          >
            <div className={styles.marquee}>
              {categoriesData.map((el, index) => (
                <CategoriesCard icon={el.icon} text={el.text} key={index} />
              ))}
            </div>
          </Marquee>
          <Marquee
            className={styles.wrap__marquee}
            loop={0}
            pauseOnHover={true}
            speed={40}
            direction="right"
            gradientWidth={20}
          >
            <div className={styles.marquee}>
              {categoriesData.map((el, index) => (
                <CategoriesCard icon={el.icon} text={el.text} key={index} />
              ))}
            </div>
          </Marquee>
        </div>
      </div>
    </Container>
  );
};

export default Categories;
