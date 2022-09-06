import useTranslation from 'next-translate/useTranslation'
import Link from 'next/link'
import {useRouter} from 'next/router'
import styles from './MainNews.module.scss'
import {Form, FormControl} from "react-bootstrap";
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import React, {useEffect, useState} from "react";
import httpClient from "../../../services/httpClient";
import {SwiperSlide} from "swiper/react";
import {LazyLoadImage} from "react-lazy-load-image-component";

export function MainNews(props) {
    const [news, setNews] = useState([])

    useEffect(() => {
        httpClient.post('object/get-list/news', {data: {limit: 4, offset: 0}})
            .then(res => setNews(res.data.response))
    }, [])

    return (
        <section className={styles.MainNews}>
            <div className="container-lg">
                <div className={styles.MainNewsHeader}>
                    <h3>Новости</h3>
                    <Link href={'/news'}>
                        <a className={styles.MainNewsAll}>
                            Посмотреть все
                            <ArrowForwardIosIcon/>
                        </a>
                    </Link>
                </div>

                <div className={styles.MainNewsItems}>
                    {
                        news?.map((newss, index) => (
                            <div className={styles.MainNewsItem} key={newss.id}>
                                <LazyLoadImage
                                    alt={''}
                                    effect="blur"
                                    src={newss.photo} // use normal <img> attributes as props
                                    width={'100%'} />
                                <div className={styles.MainNewsCardBody}>
                                    <p>{newss.title}</p>
                                    <p dangerouslySetInnerHTML={{ __html: newss.description }} />
                                    <Link href={`/news/${newss.guid}`}>
                                        <a>Читать подробно</a>
                                    </Link>
                                </div>
                            </div>
                        ))
                    }


                </div>

            </div>
        </section>
    )
}