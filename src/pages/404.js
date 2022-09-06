import {PageNotFound} from "../components/UI/PageNotFound404/404";
import SEO from 'seo'

export default function Custom404() {
  return (
      <>
        <SEO />
        <PageNotFound/>
      </>
  )
}


Custom404.layout = "MainLayout"