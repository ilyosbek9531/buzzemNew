import SEO from 'seo'
import {DiscountInfo} from "../../components/UI/DiscountInfo/DiscountInfo";
import httpClient from "../../services/httpClient";

export default function DiscountId({discountInfo}) {
    return (
        <>
            <SEO/>
            <DiscountInfo discountInfo={discountInfo}/>
        </>
    )
}

export async function getServerSideProps(ctx) {
    const queryId = ctx.query.id

    const discountInfo = await httpClient.get(`object/discounts/${queryId}`)

    return { props: {
            discountInfo
        }}
}

DiscountId.layout = "MainLayout"