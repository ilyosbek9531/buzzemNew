import SEO from 'seo'
import {ServicesInfo} from "../../components/UI/ServicesInfo/ServicesInfo";
import {ServiceInfoMain} from "../../components/UI/ServiceInfoMain/ServiceInfoMain";
import httpClient from "../../services/httpClient";
import {fetchMultipleObjects} from "../../services/fetchMultipleUrls";

function Services(services) {
    return (
        <>
            <SEO/>
            <ServicesInfo services={services}/>
            <ServiceInfoMain services={services}/>
        </>
    )
}

export async function getServerSideProps(ctx) {
    const queryId = ctx.query.id

    const request = [
        {
            objectsSlug: 'doctors',
            data: {
                "specialities_id": `${queryId}`,
               /* limit:4*/
            }
        },
        {
            objectsSlug: 'specialities',
            data: {
                "specialities_id": `${queryId}`
            }
        },
        {
            objectsSlug: 'services',
            data: {
                "specialities_id": `${queryId}`
            }
        }
    ]

    const [doctors, specialities, services] = await fetchMultipleObjects(request)

    // const computedDoctors = specialities?.map(speciality => ({
    //     ...speciality,
    //     doctors: doctors?.filter(doctor => doctor.specialities_id === queryId) ?? []
    // })) ?? []
    //
    // const computedServices = services?.map(service => ({
    //     ...service,
    //     services: services?.filter(service => service.specialities_id === queryId) ?? []
    // })) ?? []

    return {
        props: {
            services,
            doctors,
            specialities
        }
    }
}

Services.layout = "ServiceLayout"

export default Services