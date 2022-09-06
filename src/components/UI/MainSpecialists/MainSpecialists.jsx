import useTranslation from 'next-translate/useTranslation'
import Link from 'next/link'
import {useRouter} from 'next/router'
import styles from './MainSpecialists.module.scss'
import {Form, FormControl} from "react-bootstrap";
import {Button} from "@mui/material";
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import {Swiper, SwiperSlide} from 'swiper/react';
import 'swiper/css';
import {useEffect, useState} from "react";
import httpClient from "../../../services/httpClient";
import SwiperCore, {
    Autoplay,Pagination,Navigation
} from 'swiper/core';
import {LazyLoadImage} from "react-lazy-load-image-component";

export function MainSpecialists(props) {
    const [doctors, setDoctors] = useState([])

    useEffect(() => {
        httpClient.post('object/get-list/doctors', {data: {/*limit: 2, offset: 0*/}})
            .then(res => setDoctors(res.data.response))
    }, [])

    return (
        <section className={styles.MainSpecialists}>
            <div className="container-lg">
                <div className={styles.MainSpecialistsHeader}>
                    <h3>Специалисты</h3>
                    <Link href={'/doctors'}>
                        <a className={styles.MainSpecialistsAll}>
                            Посмотреть все
                            <ArrowForwardIosIcon/>
                        </a>
                    </Link>
                </div>

                <div className={`${styles.MainSpecialistsItems} mainspecialistswiper`}>

                    <Swiper
                        modules={[Autoplay]}
                        spaceBetween={50}
                        autoplay={true}
                        /*onSlideChange={() => console.log('slide change')}*/
                        /*onSwiper={(swiper) => console.log(swiper)}*/
                        breakpoints={
                            {
                                1200: {
                                    slidesPerView: 4
                                },
                                800: {
                                    slidesPerView: 3,
                                },
                                350: {
                                    slidesPerView: 2,
                                    spaceBetween: 20
                                },
                                0: {
                                    slidesPerView: 1,
                                    spaceBetween: 15
                                },
                            }
                        }
                    >


                        {

                            doctors?.map((doctor, index) => (
                                <SwiperSlide key={doctor.id}>
                                    <Link href={`/doctors/${doctor.guid}`}>
                                        <a className={styles.MainSpecialistsItem}>
                                            <div className={'swiper-slideBack'}>
                                                <LazyLoadImage
                                                    alt={''}
                                                    height={'100%'}
                                                    effect="blur"
                                                    src={doctor.passport_photo} // use normal <img> attributes as props
                                                    width={'100%'} />
                                                <div className={styles.MainSpecialistsItemInfo}>
                                                    <p>{doctor.FIO}</p>
                                                    <p>{doctor.specialities?.name}</p>
                                                    <p>Стаж {doctor.experience} года</p>
                                                </div>
                                            </div>
                                        </a>
                                    </Link>
                                </SwiperSlide>
                            ))
                        }


                    </Swiper>
                </div>
            </div>
        </section>
    )
}