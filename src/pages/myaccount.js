import SEO from 'seo'
import {MyAccount} from "../components/UI/MyAccount/MyAccount";

export default function MyProfile() {


    return (
        <>
            <SEO/>
            <MyAccount/>
        </>
    )
}

MyProfile.layout = "MainLayout"