import { BlogList } from 'components/UI/Blog/Blog'
import SEO from 'seo'

export default function Blog() {
  return (
    <>
      <SEO />
      <BlogList />
    </>
  )
}

Blog.layout = "MainLayout"
