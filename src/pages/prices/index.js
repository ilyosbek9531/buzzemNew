import SEO from 'seo'
import {Prices} from "../../components/UI/Prices/Prices";
import {useIsMobile} from "../../hooks/useIsMobile";
import {MobilePrices} from "../../components/UI/Prices/MobilePrices";
import httpClient from "../../services/httpClient";
import {fetchMultipleObjects} from "../../services/fetchMultipleUrls";

export default function PriceList(services, categories, computedServices) {
    const isMobile = useIsMobile()
    return (
        <>
            <SEO />

            {isMobile ? <MobilePrices services={services} categories={categories} computedServices={computedServices}/> : <Prices services={services} categories={categories} computedServices={computedServices}/>}

        </>
    )
}

export async function getServerSideProps() {

    const request = [
        {
            objectsSlug: 'services',
            data: {}
        },
        {
            objectsSlug: 'categories',
            data: {}
        }
    ]

    const [services, categories] = await fetchMultipleObjects(request)

    const computedServices = categories?.map(category => ({
        ...category,
        services: services?.filter(service => service.categories_id === category.guid) ?? []
    })) ?? []

    return {
        props: {
            services: services,
            categories: categories,
            computedServices: computedServices
        }
    }
}

PriceList.layout = "MainLayout"