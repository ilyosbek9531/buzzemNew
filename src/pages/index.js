import {Main} from 'components/UI/Main/Main'
import SEO from 'seo'
import {fetchMultipleObjects, fetchMultipleUrls} from 'services/fetchMultipleUrls'
import {MainSearch} from "../components/UI/MainSearch/MainSearch";
import BasicTabs from "../components/UI/MainCarousel/MainCarousel";
import {MainAbout} from "../components/UI/MainAbout/MainAbout";
import {MainServices} from "../components/UI/MainServices/MainServices";
import {MainDirections} from "../components/UI/MainDirections/MainDirections";
import {MainAdress} from "../components/UI/MainAdress/MainAdress";
import {MainSpecialists} from "../components/UI/MainSpecialists/MainSpecialists";
import {MainFeedback} from "../components/UI/MainFeedback/MainFeedback";
import {MainPartners} from "../components/UI/MainPartners/MainPartners";
import {MainNews} from "../components/UI/MainNews/MainNews";
import {MobileMainAdress} from "../components/UI/MainAdress/MobileMainAdress";
import {FixedButtonHelp} from "../components/UI/FixedButtonHelp/FixedButtonHelp";
import {useIsMobile} from "../hooks/useIsMobile";
import Services from "./services/[id]";
import httpClient from "../services/httpClient";

export default function Home({services, illness}) {
    const isMobile = useIsMobile()
    return (
        <>
            <SEO/>
            {/*<Main />*/}
            <MainSearch services={services}/>
            <BasicTabs illness={illness}/>
            <MainAbout/>
            <MainServices/>
            <MainDirections/>
            {isMobile ? <MobileMainAdress/> : <MainAdress/>}
            <MainSpecialists/>
            <MainFeedback/>
            <MainPartners/>
            <MainNews/>
        </>
    )
}

Home.layout = "MainLayout"

export async function getServerSideProps() {

    // const res = await httpClient.post('/object/get-list/services', {data: {}})

    const requests = [
        {
            objectsSlug: 'services',
            data: {}
        },
        {
            objectsSlug: 'illness_categories',
            data: {}
        }
    ]

    const [services, illness] = await fetchMultipleObjects(requests)

    console.log('res --->', services, illness)

    return {
        props: {
            services: services ?? [],
            illness: illness ?? []
        },
    }
}
