import {Container} from '@mui/material'
import useTranslation from 'next-translate/useTranslation'
import styles from './Discount.module.scss'
import Link from "next/link";
import React, {useEffect, useState} from "react";
import httpClient from "../../../services/httpClient";
import {LazyLoadImage} from "react-lazy-load-image-component";

export function Discount() {
    const {t} = useTranslation('about')
    const [discount, setDiscount] = useState([])

    useEffect(() => {
        httpClient.post('object/get-list/discounts', {data: {/*limit: 4, offset: 0*/}})
            .then(res => setDiscount(res.data.response))
    }, [])
    return (
        <main className={styles.NewsContainer}>
            <section className="container-lg">
                <h3>Акции</h3>
                <div className={styles.MainNewsItems}>

                    {
                        discount?.map((discounts, index) => (
                            <div className={styles.MainNewsItem} key={discounts.id}>
                                {/*<img src={discounts.photo} alt=""/>*/}
                                <LazyLoadImage
                                    alt={''}
                                    effect="blur"
                                    src={discounts.photo} // use normal <img> attributes as props
                                    width={'100%'} />
                                <div className={styles.MainNewsCardBody}>
                                    <p className={styles.MainNewsItemTitle}>{discounts.name}</p>
                                    <p className={styles.MainNewsItemDesc} dangerouslySetInnerHTML={{ __html: discounts.description }}/>
                                    <Link href={`discount/${discounts.guid}`}>
                                        <a>Читать подробно</a>
                                    </Link>
                                </div>
                            </div>
                        ))
                    }
                </div>
            </section>
        </main>
    )
}
