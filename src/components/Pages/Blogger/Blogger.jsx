import * as React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import FilterBlogger from "components/UI/FilterBlogger/FilterBlogger";
import BloggerCards from "components/UI/BloggerCards/BloggerCards";
import { useState } from "react";
import { UseGetBloggers } from "services/blogger.service";

const drawerWidth = 260;

const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })(
  ({ theme, open }) => ({
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: "100%",
    marginLeft: `-${drawerWidth}px`,
    ...(open && {
      transition: theme.transitions.create("margin", {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: "-80px",
    }),
  })
);

export default function Blogger() {
  const [open, setOpen] = useState(false);
  const [checkedCategory, setCheckedCategory] = useState([]);
  const [checkedPlatform, setCheckedPlatform] = useState([]);
  const [checkedRating, setCheckedRating] = useState([]);
  console.log("checkedCategory", checkedCategory);
  console.log("checkedPlatform", checkedPlatform);
  console.log("checkedRating", checkedRating);
  const [select, setSelect] = useState({
    age: "",
    language: "",
    location: "",
  });
  const [gender, setGender] = useState("");

  const { data: bloggers } = UseGetBloggers({
    queryParams: {},
  });

  const languagesOption = [
    ...new Set(
      bloggers
        ?.map((blogger) => blogger.languages.map((el) => el?.short_form))
        .flat()
    ),
  ];

  const CountrySelect = [...new Set(bloggers?.map((el) => el.country))];

  const CategoriesOption = [
    ...new Set(
      bloggers
        ?.map((blogger) => blogger.categories.map((el) => el?.name))
        .flat()
    ),
  ];

  const ratingOptions = ["Useless", "Poor", "Ok", "Good", "Excelent"];

  return (
    <Box sx={{ display: "flex" }}>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
            padding: "4.25rem 0",
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <FilterBlogger
          select={select}
          setSelect={setSelect}
          languagesOption={languagesOption}
          CountrySelect={CountrySelect}
          setGender={setGender}
          gender={gender}
          CategoriesOption={CategoriesOption}
          ratingOptions={ratingOptions}
          checkedCategory={checkedCategory}
          checkedPlatform={checkedPlatform}
          checkedRating={checkedRating}
          setCheckedCategory={setCheckedCategory}
          setCheckedPlatform={setCheckedPlatform}
          setCheckedRating={setCheckedRating}
        />
      </Drawer>
      <Main open={open}>
        <BloggerCards setOpen={setOpen} open={open} bloggers={bloggers} />
      </Main>
    </Box>
  );
}
