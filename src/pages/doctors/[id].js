import SEO from 'seo'
import {DoctorsInfo} from "../../components/UI/DoctorsInfo/DoctorsInfo";
import httpClient from "../../services/httpClient";

export default function Doctors(doctorInfo) {
    return (
        <>
            <SEO/>
            <DoctorsInfo doctorInfo={doctorInfo}/>
        </>
    )
}

export async function getServerSideProps(ctx) {
    const queryId = ctx.query.id

    const doctorInfo = await httpClient.get(`object/doctors/${queryId}`)

    return { props: {
            doctorInfo
        }}
}

Doctors.layout = "MainLayout"