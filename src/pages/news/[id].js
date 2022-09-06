import SEO from 'seo'
import {NewsInfo} from "../../components/UI/NewsInfo/NewsInfo";
import httpClient from "../../services/httpClient";

export default function NewsId({newInfo}) {
    return (
        <>
            <SEO/>
            <NewsInfo newInfo={newInfo}/>
        </>
    )
}

export async function getServerSideProps(ctx) {
    const queryId = ctx.query.id

    const newInfo = await httpClient.get(`object/news/${queryId}`)

    return { props: {
            newInfo
        }}
}

NewsId.layout = "MainLayout"