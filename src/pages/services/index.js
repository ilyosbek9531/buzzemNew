import SEO from 'seo'
import {fetchMultipleObjects, fetchMultipleUrls} from 'services/fetchMultipleUrls'
import {ServicesHeader} from "../../components/UI/ServicesHeader/ServicesHeader";
import httpClient from "../../services/httpClient";

export default function Services(services) {
    return (
        <>
            <SEO />
            <ServicesHeader services={services}/>
        </>
    )
}

export async function getServerSideProps() {

    const services = await httpClient.post('/object/get-list/specialities', {data: {}})
    return { props: {
            services
        }}
}

Services.layout = "MainLayout"