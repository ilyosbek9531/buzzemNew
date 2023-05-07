import Categories from "components/UI/Categories/Categories";
import Banner from "../../UI/Banner/Banner";
import TopRates from "components/UI/TopRates/TopRates";
import Review from "components/UI/Review/Review";

export function Main() {
  return (
    <main>
      <Banner />
      <Categories />
      <TopRates />
      <Review />
    </main>
  );
}
