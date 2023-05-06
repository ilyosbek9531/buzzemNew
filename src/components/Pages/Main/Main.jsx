import Categories from "components/UI/Categories/Categories";
import Banner from "../../UI/Banner/Banner";
import styles from "./Main.module.scss";
import TopRates from "components/UI/TopRates/TopRates";

export function Main() {
  return (
    <main className={styles.main}>
      <Banner />
      <Categories />
      <TopRates />
    </main>
  );
}
