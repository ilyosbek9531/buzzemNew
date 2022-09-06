import SEO from 'seo'
import {CheckOrder} from "../components/UI/CheckOrder/CheckOrder";
import MyProfile from "./myaccount";

export default function Checkorder() {
    return (
        <>
            <SEO />
            <CheckOrder/>
        </>
    )
}

Checkorder.layout = "MainLayout"