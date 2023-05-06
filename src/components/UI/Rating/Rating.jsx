import React from "react";
import { styled } from "@mui/material/styles";
import { Rating } from "@mui/material";
import { EmptyStartIcon, FillStarIcon, HalfStarIcon } from "components/Icons";

const StyledRating = styled(Rating)({
  "&.MuiRating-root": {
    display: "flex",
  },
});

const CRating = ({
  width,
  height,
  value,
  setValue,
  defaultValue = 0,
  name,
}) => {
  return (
    <>
      <StyledRating
        size="medium"
        name="half-rating"
        max={5}
        defaultValue={defaultValue}
        // icon={<FillStarIcon width={width} height={height} />}
        // emptyIcon={<EmptyStartIcon width={width} height={height} />}
        // halfIcon={<HalfStarIcon width={width} height={height} />}
        value={value}
        precision={0.5}
        readOnly={name === "read-only"}
        onChange={(_, newValue) => {
          name !== "read-only" && setValue(newValue);
        }}
      ></StyledRating>
    </>
  );
};

export default CRating;
