import { useQuery } from "react-query";
import { request } from "./http-client";

const bloggerService = {
  getBloggers: (queryParams) =>
    request.get(`/bloggers/`, { data: queryParams }),
};

export const UseGetBloggers = ({ queryParams }) => {
  return useQuery(["GET_BLOGGERS", queryParams], async () => {
    return await bloggerService.getBloggers(queryParams).then((res) => {
      return res.results;
    });
  });
};
