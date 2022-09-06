import { Container } from '@mui/material'
import Link from 'next/link'
import styles from './News.module.scss'
import {useEffect, useState} from "react";
import httpClient from "../../../services/httpClient";
import {SwiperSlide} from "swiper/react";

export function News() {
    const [news, setnews] = useState([])

    useEffect(() => {
        httpClient.post('object/get-list/news', {data: {/*limit: 2, offset: 0*/}})
            .then(res => setnews(res.data.response))
    }, [])

    return (
        <main className={styles.NewsContainer}>
            <section className="container-lg">
                <h3>Новости</h3>
                <div className={styles.MainNewsItems}>

                    {
                        news?.map((news, index) => (
                            <div className={styles.MainNewsItem} key={news.id}>
                                <img src="/images/Rectangle 11542.svg" alt=""/>
                                <div className={styles.MainNewsCardBody}>
                                    <p>{news.title}</p>
                                    <p dangerouslySetInnerHTML={{ __html: news.description }}/>
                                    <Link href={`news/${news.guid}`}>
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
