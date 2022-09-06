import SEO from 'seo'
import {About} from "../../components/UI/About/About";

export default function Aboutus() {
    return (
        <>
            <SEO />
            <About/>
        </>
    )
}

Aboutus.layout = "MainLayout"
