import SEO from 'seo'
import {News} from "../../components/UI/News/News";

export default function NewsIndex() {
    return (
        <>
            <SEO />
            <News/>
        </>
    )
}

NewsIndex.layout = "MainLayout"