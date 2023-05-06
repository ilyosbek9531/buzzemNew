import Categories from "components/UI/Categories/Categories";
import Banner from "../../UI/Banner/Banner";
import styles from "./Main.module.scss";

export function Main() {
  return (
    <main className={styles.main}>
      <Banner />
      <Categories />
    </main>
  );
}
