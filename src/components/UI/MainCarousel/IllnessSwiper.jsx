import * as React from 'react';
import Link from 'next/link'
import styles from './MainCarousel.module.scss'
import {Swiper, SwiperSlide} from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import {Autoplay, Pagination, Navigation, A11y} from "swiper";
import {useMemo, useState} from "react";
import IconGenerator from "../IconGenerator/IconGenerator";


export default function IllnessSwiper({illness, category}) {

    const filteredIlness = useMemo(() => {
        return illness?.filter((el) => el.category === category)
    })
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    console.log(filteredIlness)
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1
    };

    return (
            <Swiper
                // slidesPerView={6}
                spaceBetween={24}
                slidesPerGroup={3}
                loop={false}
                autoplay={true}
                breakpoints={
                    {
                        1000: {
                            slidesPerView: 6,
                        },
                        700: {
                            slidesPerView: 4,
                        },
                        0: {
                            slidesPerView: 3,
                            spaceBetween: 8
                        },
                    }
                }
                loopFillGroupWithBlank={true}
                // pagination={{
                //     clickable: true,
                // }}
                navigation={true}
                modules={[Navigation, A11y, Autoplay]}
                className={
                    styles.mySwiper
                }
            >

                {
                    filteredIlness?.map((illnes, indexIllness) => (
                        <SwiperSlide key={illnes.id} className={styles.swiperslide}>
                            <Link href={`/services/${illnes.guid}`}>
                                <a>
                                        <span className={styles.swiperslideimage}>
                                            <IconGenerator icon={illnes.icon}/>
                                        </span>

                                    <p>{illnes.name}</p>
                                </a>
                            </Link>
                        </SwiperSlide>
                    ))
                }

            </Swiper>
    )
}
