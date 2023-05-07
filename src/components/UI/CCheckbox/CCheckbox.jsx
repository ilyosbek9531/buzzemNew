import React from "react";
import Box from "@mui/material/Box";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import styles from "./CCheckbox.module.scss";

export default function CCheckbox({ checkboxOptions, checked, setChecked }) {
  const handleChange1 = (isChecked) => {
    if (isChecked) return setChecked(checkboxOptions.map((el) => el));
    else setChecked([]);
  };

  const handleChange2 = (isChecked, item) => {
    const index = checkboxOptions.indexOf(item);

    if (isChecked) return setChecked((state) => [...state, item]);
    if (!isChecked && index > -1) {
      return setChecked((state) => state.filter((el) => el !== item));
    }
  };

  const children = (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
      }}
    >
      {checkboxOptions?.map((item) => (
        <FormControlLabel
          label={item}
          control={
            <Checkbox
              checked={checked.includes(item)}
              onChange={(event) => handleChange2(event.target.checked, item)}
              sx={{
                color: "var(--text-color) !important",
              }}
            />
          }
          key={item}
        />
      ))}
    </Box>
  );

  return (
    <div>
      <FormControlLabel
        label="Select all"
        control={
          <Checkbox
            checked={checked.length === checkboxOptions.length}
            indeterminate={
              checked.length !== checkboxOptions.length && checked.length > 0
            }
            onChange={(event) => handleChange1(event.target.checked)}
            sx={{
              color: "var(--text-color) !important",
            }}
          />
        }
        sx={{
          width: "100%",
        }}
      />
      <div className={styles.line}></div>
      {children}
    </div>
  );
}
