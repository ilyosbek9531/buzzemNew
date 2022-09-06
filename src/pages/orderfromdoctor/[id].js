import SEO from 'seo'
import {OrderFromDoctors} from "../../components/UI/OrderFromDoctors/OrderFromDoctors";
import httpClient from "../../services/httpClient";

export default function MyProfile(doctorInfoBook) {


    return (
        <>
            <SEO/>
            <OrderFromDoctors doctorInfoBook={doctorInfoBook}/>
        </>
    )
}

export async function getServerSideProps(ctx) {
    const queryId = ctx.query.id

    const doctorInfoBook = await httpClient.post(`object/get-list/doctor_working_days/`, {data: {"doctors_id": `${queryId}`}})

    return { props: {
            doctorInfoBook
        }}
}



MyProfile.layout = "MainLayout"