import Categories from "components/UI/Categories/Categories";
import Banner from "../../UI/Banner/Banner";
import TopRates from "components/UI/TopRates/TopRates";
import Review from "components/UI/Review/Review";
import { UseGetBloggers } from "services/blogger.service";

export function Main() {
  const { data: bloggersData } = UseGetBloggers({
    queryParams: {
      page: 1,
    },
  });

  return (
    <main>
      <Banner />
      <Categories />
      <TopRates bloggersData={bloggersData} />
      <Review />
    </main>
  );
}
