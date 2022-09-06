import useTranslation from 'next-translate/useTranslation'
import Link from 'next/link'
import {useRouter} from 'next/router'
import styles from './MainPartners.module.scss'
import {Form, FormControl} from "react-bootstrap";
import {Button} from "@mui/material";
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import React, {useEffect, useState} from "react";
import httpClient from "../../../services/httpClient";
import {Swiper, SwiperSlide} from 'swiper/react';
import {LazyLoadImage} from "react-lazy-load-image-component";

export function MainPartners(props) {

    const [partners, setPartners] = useState([])

    useEffect(() => {
        httpClient.post('object/get-list/partners', {data: {/*limit: 2, offset: 0*/}})
            .then(res => setPartners(res.data.response))
    }, [])

    return (
        <section className={styles.MainPartners}>
            <div className="container-lg">
                <h3>
                    Наши партнёры
                </h3>

                <div className={`${styles.MainPartnersItems} MainPartnersItems`}>

                    <Swiper
                        spaceBetween={50}
                        onSlideChange={() => console.log('slide change')}
                        onSwiper={(swiper) => console.log(swiper)}
                        breakpoints={
                            {
                                1400: {
                                    slidesPerView: 5
                                },
                                900: {
                                    slidesPerView: 4
                                },
                                600: {
                                    slidesPerView: 3
                                },
                                450: {
                                    slidesPerView: 2
                                },
                                0: {
                                    slidesPerView: 1
                                }
                            }
                        }
                    >
                        {
                            partners?.map((partner, index) => (
                                <SwiperSlide key={partner.id}>
                                    <div className={styles.MainPartnersItem}>
                                        <LazyLoadImage
                                            alt={''}
                                            height={'100%'}
                                            effect="blur"
                                            src={partner.photo} // use normal <img> attributes as props
                                            width={'100%'} />
                                    </div>
                                </SwiperSlide>
                            ))
                        }
                    </Swiper>
                </div>
            </div>
        </section>
    )
}