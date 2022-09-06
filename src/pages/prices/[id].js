import SEO from 'seo'
import {MobilePricesInfo} from "../../components/UI/Prices/MobilePricesInfo";
import httpClient from "../../services/httpClient";

export default function NewsId(pricesInfo) {
    return (
        <>
            <SEO/>
            <MobilePricesInfo pricesInfo={pricesInfo}/>
        </>
    )
}

export async function getServerSideProps(ctx) {
    const queryId = ctx.query.id

    const pricesInfo = await httpClient.post(`object/get-list/services`, {data: {"categories_id": queryId}})

    return { props: {
            pricesInfo
        }}
}

NewsId.layout = "MainLayout"