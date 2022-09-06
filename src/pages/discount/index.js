import SEO from 'seo'
import {Discount} from "../../components/UI/Discount/Discount";

export default function DiscountIndex() {
    return (
        <>
            <SEO />
            <Discount/>
        </>
    )
}
DiscountIndex.layout = "MainLayout"