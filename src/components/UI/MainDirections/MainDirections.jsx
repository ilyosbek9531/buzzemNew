import useTranslation from 'next-translate/useTranslation'
import Link from 'next/link'
import {useRouter} from 'next/router'
import styles from './MainDirections.module.scss'
import {Form, FormControl} from "react-bootstrap";
import {Button} from "@mui/material";
import {useEffect, useState} from "react";
import httpClient from "../../../services/httpClient";
import IconGenerator from "../IconGenerator/IconGenerator";
import * as React from "react";

export function MainDirections(props) {

    const [directions, setDirections] = useState([])

    useEffect(() => {
        httpClient.post('object/get-list/specialities', {data: {/*limit: 2, offset: 0*/}})
            .then(res => setDirections(res.data.response))
    }, [])

    return (
        <section className={styles.MainDirections}>
            <div className="container-lg">
                <h3>Направления медицинского центра</h3>
                <div className="d-flex justify-content-between">
                    <div className={styles.MainDirectionsItems}>

                        {
                            directions?.map((direction, index) => (
                                <div className={styles.MainDirectionsContainer} key={direction.id}>
                                    <Link href={`/services/${direction.guid}`}>
                                        <a>
                            <span className={styles.MainDirectionsItem}>
                                <span className={styles.itemImage}>
                                    <IconGenerator icon={direction.icon}/>
                                </span>
                                <span className={styles.itemInfo}>
                                    <span className={styles.itemInfoT}>{direction.name}</span>
                                    <span className={styles.itemInfoB} dangerouslySetInnerHTML={{__html: direction.description}}/>
                                </span>
                            </span>
                                        </a>
                                    </Link>
                                </div>
                            ))
                        }


                    </div>
                </div>
                <div className="d-flex justify-content-center mt-4">
                    <Link href={'/services'}>
                        <Button className={styles.MainDirectionsFooter}>Все направления</Button>
                    </Link>
                </div>
            </div>
        </section>
    )
}