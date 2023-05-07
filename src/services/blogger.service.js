import { useQuery } from "react-query";
import { request } from "./http-client";

const bloggerService = {
  getBloggers: (queryParams) => request.get(`/bloggers/?${queryParams}`),
  getCategories: (queryParams) =>
    request.get("/categories/total-bloggers/", queryParams),
  getPlatforms: (queryParams) =>
    request.get("/platforms/total-accounts/", queryParams),
};

export const UseGetBloggers = ({ queryParams }) => {
  return useQuery(["GET_BLOGGERS", queryParams], async () => {
    return await bloggerService.getBloggers(queryParams).then((res) => {
      return res.results;
    });
  });
};

export const UseGetCategories = ({ queryParams }) => {
  return useQuery(["GET_CATEGORIES", queryParams], async () => {
    return await bloggerService.getCategories(queryParams).then((res) => {
      return res.results;
    });
  });
};

export const UseGetPlatforms = ({ queryParams }) => {
  return useQuery(["GET_PLATFORMS", queryParams], async () => {
    return await bloggerService.getPlatforms(queryParams).then((res) => {
      return res.results;
    });
  });
};
