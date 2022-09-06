import useTranslation from 'next-translate/useTranslation'
import Link from 'next/link'
import {useRouter} from 'next/router'
import styles from './MainAdress.module.scss'
import {Form, FormControl} from "react-bootstrap";
import {Button} from "@mui/material";
import {YMaps, Map, Placemark} from "@pbe/react-yandex-maps";
import {useEffect, useRef, useState} from "react";
import httpClient from "../../../services/httpClient";

// const branches = [
//     {
//         id: 1,
//         name: 'Шайхантахурский район, \n' +
//             'ул. Абдулла Кодирий 39',
//         coor: [41.32934765351493, 69.25695833250674]
//     },
//     {
//         id: 2,
//         name: 'Шайхантахурский район, \n' +
//             'ул. Зульфияханум 18',
//         coor: [41.3294972661586, 69.25840672537478]
//     },
//     {
//         id: 3,
//         name: 'Шайхантахурский район, \n' +
//             'ул. Истирохат 258',
//         coor: [41.329367871459965, 69.25997849985754]
//     },
// ]


export function MainAdress(props) {

    const [selectedIndex, setSelectedIndex] = useState(0)

    const mapRef = useRef()

    const [branches, setBranches] = useState([])


    useEffect(() => {
        httpClient.post('object/get-list/branches', {data: {/*limit: 2, offset: 0*/}})
            .then(res => setBranches(res.data.response))
    }, [])

    return (
        <section className={styles.MainAdress}>
            <div className="container-lg">
                <h3>Адреса филиалов</h3>

                <div className={styles.MainAdressMapContainer}>
                    <div className={styles.MainAdressMenu}>
                        <div className={styles.MainAdressMenuItems}>
                            {
                                branches.map((branch, index) => (
                                    <Button onClick={() =>
                                    {
                                        mapRef.current.panTo([parseFloat(branch?.latitude), parseFloat(branch?.longitude)], {flying: 1})
                                        setSelectedIndex(index)
                                    }
                                    } key={branch.id} className={`${styles.MainAdressMenuItem}`}>
                                        <div className={styles.leftSide}>
                                            <img src="/images/logoVertical.svg" alt=""/>
                                        </div>
                                        <div className={`${styles.rightSide} ${selectedIndex === index ? styles.active : 'fesf'}`}>
                                            <span className={styles.spanchik}>{branch.address}</span>
                                        </div>
                                    </Button>
                                ))
                            }
                        </div>

                    </div>
                    <YMaps query={{load: "package.full"}}>
                        <Map
                            instanceRef={mapRef}
                            defaultState={{
                                center: [parseFloat(branches[selectedIndex]?.latitude), parseFloat(branches[selectedIndex]?.longitude)],
                                zoom: 17.5,
                                controls: []
                            }}
                            width="100%"
                            height="450px"
                        >

                            {
                                branches.map(branch => (
                                    <Placemark key={branch.id} geometry={[branch.latitude, branch.longitude]} options={{
                                        iconLayout: "default#image",
                                        iconImageSize: [50, 50],
                                        iconImageHref: '/images/logoMedion.svg'
                                    }}/>
                                ))
                            }

                        </Map>
                    </YMaps>
                </div>


            </div>
        </section>
    )
}