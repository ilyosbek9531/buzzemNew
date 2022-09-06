import useTranslation from 'next-translate/useTranslation'
import Link from 'next/link'
import {useRouter} from 'next/router'
import styles from './MainFeedback.module.scss'
import {Form, FormControl} from "react-bootstrap";
import {Button} from "@mui/material";
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import {Swiper, SwiperSlide} from 'swiper/react';
import 'swiper/css';
import {useEffect, useState} from "react";
import httpClient from "../../../services/httpClient";
import Modal from 'react-bootstrap/Modal';
import React from 'react'
import ReactPlayer from 'react-player'
import {LazyLoadImage} from "react-lazy-load-image-component";

function MyVerticallyCenteredModal(props) {
    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>

            </Modal.Header>
            <Modal.Body>
                <ReactPlayer width={'100%'} url={props.url}/>
            </Modal.Body>

        </Modal>
    );
}

export function MainFeedback(props) {
    const [feedback, setFeedback] = useState([])
    const [modalShow, setModalShow] = useState(false);
    useEffect(() => {
        httpClient.post('object/get-list/video_feedbacks', {data: {/*limit: 2, offset: 0*/}})
            .then(res => setFeedback(res.data.response))
    }, [])

    return (
        <section className={styles.MainFeedback}>
            <div className="container-lg">
                <h3>
                    Что говорят о нас наши клиенты
                </h3>

                <div className={`${styles.MainFeedbackItems} MainFeedbackItems`}>
                    <Swiper
                        spaceBetween={50}
                        onSlideChange={() => console.log('slide change')}
                        onSwiper={(swiper) => console.log(swiper)}
                        breakpoints={
                            {
                                1400: {
                                    slidesPerView: 4
                                },
                                900: {
                                    slidesPerView: 3,
                                },
                                350: {
                                    slidesPerView: 2.2,
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
                            feedback?.map((feedbacks, index) => (
                                <SwiperSlide key={feedbacks.id}>
                                    <div className={styles.MainFeedbackItem}>
                                        <a onClick={() => setModalShow(true)}>
                                            <div className={styles.MainFeedbackItem}>
                                                <LazyLoadImage
                                                    alt={''}
                                                    height={'100%'}
                                                    effect="blur"
                                                    src={feedbacks.photo_poster} // use normal <img> attributes as props
                                                    width={'100%'} />
                                                <span className={styles.MainFeedbackPlayBtn}>
                                        <svg width="54" height="54" viewBox="0 0 54 54" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <circle opacity="0.3" cx="27" cy="27" r="26.3636" stroke="white" strokeWidth="1.27273"/>
                                            <circle className={styles.adef} opacity="0.5" cx="26.9999" cy="27" r="22.9091" fill=""/>
                                            <path className={styles.dawda} d="M36.2725 26.4545L22.0906 34.6424L22.0906 18.2667L36.2725 26.4545Z"
                                                  fill=""/>
                                        </svg>
                                    </span>
                                                <span className={styles.MainFeedbackItemInfo}>
                                        <p>{feedbacks.name}</p>
                                        <p>{feedbacks.job_poster}</p>
                                    </span>
                                            </div>
                                        </a>

                                            <MyVerticallyCenteredModal
                                                show={modalShow}
                                                onHide={() => setModalShow(false)}
                                                url={feedbacks.link}
                                                className={'videoFeedback'}
                                            />
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