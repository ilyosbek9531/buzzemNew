import React from "react";
import { Button } from "@mui/material";

const MainButton = ({
  fullWidth,
  text,
  disabled,
  icon,
  type,
  variant,
  onClick,
  isProfile,
  sx,
  isClicked,
  ...restProps
}) => {
  return (
    <Button
      type={type}
      disabled={disabled}
      startIcon={icon}
      fullWidth={fullWidth}
      variant={variant}
      onClick={onClick}
      sx={sx}
      {...restProps}
    >
      {text}
    </Button>
  );
};

export default MainButton;
