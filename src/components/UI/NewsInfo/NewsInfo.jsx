import {Container} from '@mui/material'
import useTranslation from 'next-translate/useTranslation'
import styles from './NewsInfo.module.scss'
import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined';
import Link from "next/link";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import {compareAsc, format} from 'date-fns'
import {ru} from 'date-fns/locale';
import React, {useEffect, useState} from "react";
import httpClient from "../../../services/httpClient";
import Card from "react-bootstrap/Card";
import {LazyLoadImage} from "react-lazy-load-image-component";

export function NewsInfo({newInfo}) {
    const {t} = useTranslation('about')
    const createdTime = format(new Date(newInfo.data.response.date), 'dd MMM yyyy', {locale: ru})
    const [discount, setDiscount] = useState([])
    const [news, setnews] = useState([])

    useEffect(() => {
        httpClient.post('object/get-list/discounts', {data: {limit: 4, offset: 0}})
            .then(res => setDiscount(res.data.response))
    }, [])

    useEffect(() => {
        httpClient.post('object/get-list/news', {data: {limit: 4, offset: 0}})
            .then(res => setnews(res.data.response))
    }, [])


    return (
        <main className={styles.NewsInfoMain}>
            <div className="container-lg">
                <div className={styles.NewsInfo}>
                    <div className={`col-4 ${styles.NewsInfoLeft}`}>
                        {/*<img src={newInfo.data.response.photo} alt=""/>*/}
                        <LazyLoadImage
                            alt={''}
                            effect="blur"
                            src={newInfo.data.response.photo} // use normal <img> attributes as props
                            width={'100%'} />
                    </div>

                    <div className={`col-8 ${styles.NewsInfoRight}`}>
                        <div>
                            <h4>{newInfo.data.response.title}</h4>

                            <p className={styles.NewsInfoRightDate}>
                                <CalendarMonthOutlinedIcon/>
                                {createdTime}
                            </p>

                            <p className={styles.NewsInfoRightText} dangerouslySetInnerHTML={{__html: newInfo.data.response.description}}>
                            </p>
                        </div>

                        <div className={styles.NewsInfoRightSocial}>
                            <p>
                                Следите за нами в социальных сетях:
                            </p>

                            <div className="d-flex">
                                <a href="#">
                                    <img src="/images/tgred.svg" alt=""/>
                                </a>

                                <a href="#">
                                    <img src="/images/facebookred.svg" alt=""/>
                                </a>

                                <a href="#">
                                    <img src="/images/instared.svg" alt=""/>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>

                <div>
                    <div className={styles.MainNewsHeader}>
                        <h3>Последние новости</h3>
                        <Link href={'/news'}>
                            <a className={styles.MainNewsAll}>
                                Посмотреть все
                                <ArrowForwardIosIcon/>
                            </a>
                        </Link>
                    </div>

                    <div className={styles.MainNewsItems}>
                        {
                            news?.map((news, index) => (
                                <div className={styles.MainNewsItem} key={news.id}>
                                    {/*<img src={news.photo} alt=""/>*/}
                                    <LazyLoadImage
                                        alt={''}
                                        effect="blur"
                                        src={news.photo} // use normal <img> attributes as props
                                        width={'100%'} />
                                    <div className={styles.MainNewsCardBody}>
                                        <p>{news.title}</p>
                                        <p dangerouslySetInnerHTML={{__html: news.description}}/>
                                        <Link href={`/news/${news.guid}`}>
                                            <a>Читать подробно</a>
                                        </Link>
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                </div>


                <div>
                    <div className={styles.MainNewsHeader}>
                        <h3>Акции</h3>
                        <Link href={'/discount'}>
                            <a className={styles.MainNewsAll}>
                                Посмотреть все
                                <ArrowForwardIosIcon/>
                            </a>
                        </Link>
                    </div>

                    <div className={styles.MainNewsItems}>

                        {
                            discount?.map((discount, index) => (
                                <div className={styles.MainNewsItem} key={discount.id}>
                                    {/*<img src={discount.photo} alt=""/>*/}
                                    <LazyLoadImage
                                        alt={''}
                                        effect="blur"
                                        src={discount.photo} // use normal <img> attributes as props
                                        width={'100%'} />
                                    <div className={styles.MainNewsCardBody}>
                                        <p>{discount.name}</p>
                                        <p dangerouslySetInnerHTML={{__html: discount.description}}/>
                                        <Link href={`/discount/${discount.guid}`}>
                                            <a>Читать подробно</a>
                                        </Link>
                                    </div>
                                </div>
                            ))
                        }


                    </div>
                </div>


            </div>
        </main>
    )
}
