import React from "react";
import styles from "./BloggerById.module.scss";
import BloggerMain from "components/UI/BloggerMain/BloggerMain";
import CBreadCrumbs from "components/UI/CBreadCrumbs/CBreadCrumbs";
import BloggerSocial from "components/UI/BloggerSocial/BloggerSocial";

const breadcrumbItems = [
  {
    link: "/",
    label: "Home",
  },
  {
    link: "/blogger",
    label: "Bloggers",
  },
  {
    label: "Nozima Musaboyeva",
  },
];

const BloggerById = () => {
  return (
    <>
      <div className={styles.bloggerSingle}>
        <CBreadCrumbs items={breadcrumbItems} />
        <BloggerMain />
        <BloggerSocial />
      </div>
    </>
  );
};

export default BloggerById;
