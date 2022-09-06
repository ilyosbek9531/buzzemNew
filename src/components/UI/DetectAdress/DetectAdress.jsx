import {Container} from '@mui/material'
import Link from 'next/link'
import {useEffect, useState} from "react";



export function DetectAdress() {
    const [adress, setAdress] = useState('')

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(function (position) {

            fetch(`https://geocode-maps.yandex.ru/1.x/?geocode=${position.coords.longitude},${position.coords.latitude}&apikey=dce476ab-d513-4be5-abeb-0eb93aff37e6&format=json`, {
                method: "GET"
            }).then((response) => response.json()).then(res => {
                const street = res.response?.GeoObjectCollection?.featureMember?.find(el => el.GeoObject?.metaDataProperty?.GeocoderMetaData?.kind === 'street')
                setAdress(street?.GeoObject?.name ?? '')
            })
        });
    }, [])

    return (
        <>
            {adress ? adress : 'Не определён'}
        </>
    )
}