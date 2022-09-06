import useTranslation from 'next-translate/useTranslation'
import Link from 'next/link'
import {useRouter} from 'next/router'
import styles from './MainSearch.module.scss'
import {Form, FormControl, Button} from "react-bootstrap";
import * as PropTypes from "prop-types";
import InputHints from 'react-input-hints'
import Carousel from 'react-bootstrap/Carousel';
import httpClient from "../../../services/httpClient";
import {useEffect, useState} from "react";
import {Skeleton} from "@mui/material";
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';

export function MainSearch({services}) {
    const [banners, setBanners] = useState([])
    const [discount, setDiscount] = useState([])

    useEffect(() => {
        httpClient.post('object/get-list/discounts', {data: {limit: 2, offset: 0, order: {increment_id: -1}}})
            .then(res => setDiscount(res.data.response))
    }, [])

    useEffect(() => {
        httpClient.post('object/get-list/banners', { data: { limit: 4, offset: 0, order: {increment_id: -1} } }).then(res => setBanners(res.data.response))
    }, [])
    return (
        <section className={styles.mainSearchSection}>
            <div className="container-lg">
                <div className={styles.parent}>
                    <div className={styles.leftdivmain}>

                            <Carousel>
                                {
                                    banners?.map((banner, index) => (
                                        <Carousel.Item key={index}>
                                            <div className="w-100 waefsrgdt">
                                                {/*<img
                                                    className="d-block w-100 maincarouselimage"
                                                    src={banner.image}
                                                    alt="First slide"
                                                />*/}
                                                <LazyLoadImage
                                                    alt={''}
                                                    effect="blur"
                                                    src={banner.image} // use normal <img> attributes as props
                                                    width={'100%'} />
                                            </div>
                                            <Carousel.Caption>
                                                <h3>{banner.title}</h3>
                                                <p dangerouslySetInnerHTML={{__html: banner.description}} />
                                            </Carousel.Caption>
                                        </Carousel.Item>
                                    ))
                                }
                            </Carousel>

                    </div>


                    <div className="d-flex flex-column justify-content-between w-100">

                        {
                            discount?.map((discounts, index) => (
                                <div className={styles.righttopdivmainContainer} key={index}>
                                    <LazyLoadImage
                                        alt={''}
                                        effect="blur"
                                        src={discounts.photo} // use normal <img> attributes as props
                                        width={'100%'} />
                                    <div className={styles.righttopdivmain} style={{backgroundImage: `url('/images/Rectangle 11655.svg')`}}>
                                        <h3>
                                            {discounts.name}
                                        </h3>
                                        <Link href={`/discount/${discounts.guid}`}>
                                            <a>
                                                Подробнее
                                            </a>
                                        </Link>
                                    </div>
                                </div>
                            ))
                        }



                        {/*<div className={styles.righttopdivmainContainer}>
                            <img src="/images/healthcare-medical-concept-medicine-doctor-with-stethoscope-hand-patients-come 1.svg"
                                 className={'h-100'} alt=""/>
                            <div className={styles.righttopdivmain} style={{backgroundImage: `url('/images/Rectangle 11655.svg')`}}>
                                <h3>
                                    Годовая программа <br/>
                                    “Моё Здоровье”
                                </h3>
                                <Link href={'/'}>
                                    <a>
                                        Подробнее
                                    </a>
                                </Link>
                            </div>
                        </div>


                        <div className={styles.rightbottomdivmainContainer}>
                            <img src="/images/5584814 1.svg" className={'h-100'} alt=""/>

                            <div className={styles.rightbottomdivmain} style={{backgroundImage: `url('/images/Rectangle 11655.svg')`}}>
                                <h3>
                                    5 процедур общего <br/>
                                    массажа + подарок
                                </h3>
                                <Link href={'/'}>
                                    <a>
                                        Подробнее
                                    </a>
                                </Link>
                            </div>
                        </div>*/}


                    </div>
                </div>
            </div>
        </section>
    );
}

MainSearch.propTypes = {
    loading: PropTypes.bool,
};
