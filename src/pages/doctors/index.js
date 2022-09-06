import SEO from 'seo'
import {Doctors} from "../../components/UI/Doctors/Doctors";
import {useIsMobile} from "../../hooks/useIsMobile";
import {MobileDoctors} from "../../components/UI/Doctors/MobileDoctors";
import httpClient from "../../services/httpClient";
import {useEffect, useState} from "react";
import {fetchMultipleObjects} from "../../services/fetchMultipleUrls";

export default function DoctorsIndex({specialities}) {

    const isMobile = useIsMobile()
    return (
        <>
            <SEO/>
            {isMobile ? <MobileDoctors specialities={specialities}/> : <Doctors specialities={specialities}/>}
        </>
    )
}

export async function getServerSideProps() {

    const request = [
        {
            objectsSlug: 'doctors',
            data: {}
        },
        {
            objectsSlug: 'specialities',
            data: {}
        }
    ]

    const [doctors, specialities] = await fetchMultipleObjects(request)

    const computedSpecialities = specialities?.map(speciality => ({
        ...speciality,
        doctors: doctors?.filter(doctor => doctor.specialities_id === speciality.guid) ?? []
    })) ?? []

    return {
        props: {
            specialities: computedSpecialities
        }
    }
}


DoctorsIndex.layout = "MainLayout"