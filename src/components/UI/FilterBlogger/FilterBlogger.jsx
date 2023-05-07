import React from "react";
import styles from "./FilterBlogger.module.scss";
import CRadioButtons from "../CRadioButtons/CRadioButtons";
import CSelect from "../CSelect/CSelect";
import CCollapse from "../CCollapse/CCollapse";

const FilterBlogger = ({
  setSelect,
  select,
  languagesOption,
  CountrySelect,
  gender,
  setGender,
  CategoriesOption,
  ratingOptions,
  checkedCategory,
  checkedPlatform,
  checkedRating,
  setCheckedCategory,
  setCheckedPlatform,
  setCheckedRating,
}) => {
  return (
    <div className={styles.filter}>
      <h3>Filter</h3>
      <CRadioButtons setGender={setGender} gender={gender} />
      <CSelect
        setSelect={setSelect}
        select={select.age}
        getValue="age"
        initialValue="All ages"
      />
      <CSelect
        setSelect={setSelect}
        select={select.language}
        getValue="language"
        options={languagesOption}
        initialValue="All Languages"
      />
      <CSelect
        setSelect={setSelect}
        select={select.location}
        getValue="location"
        options={CountrySelect}
        initialValue="All Locations"
      />

      <CCollapse
        checkboxOptions={CategoriesOption}
        filterBy="By categories"
        checked={checkedCategory}
        setChecked={setCheckedCategory}
      />
      <CCollapse
        checkboxOptions={CategoriesOption}
        filterBy="By platform"
        checked={checkedPlatform}
        setChecked={setCheckedPlatform}
      />
      <CCollapse
        checkboxOptions={ratingOptions}
        filterBy="By rating"
        checked={checkedRating}
        setChecked={setCheckedRating}
      />
    </div>
  );
};

export default FilterBlogger;
