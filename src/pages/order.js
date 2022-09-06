import SEO from 'seo'
import {OrderMain} from "../components/UI/OrderMain/OrderMain";

export default function Order() {
    return (
        <>
            <SEO />
            <OrderMain/>
        </>
    )
}

Order.layout = "orderLayout"