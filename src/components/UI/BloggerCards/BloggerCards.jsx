import React, { useRef } from "react";
import styles from "./BloggerCards.module.scss";
import { DownArrow, SearchIcon } from "components/Icons";
import BloggerCard from "../BloggerCard/BloggerCard";
import { Grid } from "@mui/material";

const BloggerCards = ({ setOpen, open, bloggers }) => {
  const inputRef = useRef();
  return (
    <div className={styles.cards}>
      <div className={styles.cards__top}>
        <div
          className={styles.cards__top__open}
          onClick={() => setOpen((prev) => !prev)}
        >
          <div className={styles.cards__top__open__arrow}>
            <DownArrow width="20" height="20" />
          </div>
          <h5>Filters</h5>
        </div>
        <div className={styles.search} onClick={() => inputRef.current.focus()}>
          <input type="text" placeholder="Search . . ." ref={inputRef} />
          <SearchIcon stroke="#F7AC29" />
        </div>
      </div>

      <Grid container rowSpacing={{ xs: 4 }} columnSpacing={{ xs: 2 }}>
        {bloggers?.map((el) => (
          <Grid item xs={6} sm={4} md={3} lg={open ? 3 : 2.4} key={el.slug}>
            <BloggerCard
              avg_rate={el?.avg_rate}
              categories={el?.categories}
              country={el?.country}
              full_name={el?.full_name}
              image={el?.image}
              languages={el?.languages}
              slug={el?.slug}
            />
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default BloggerCards;
