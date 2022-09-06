import {Container} from '@mui/material'
import useTranslation from 'next-translate/useTranslation'
import styles from './About.module.scss'
import Link from 'next/link'
import React, {useEffect, useState} from "react";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import InputMask from "react-input-mask";
import Button from "react-bootstrap/Button";
import httpClient from "../../../services/httpClient";
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
                <h3>Обратный звонок</h3>
                <p>
                    Оставьте свой номер телефона
                    и мы вам перезвоним
                </p>

                <Form>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Номер телефона</Form.Label>
                        <InputMask mask="+\9\9\8 99 999 99 99" onChange={props.onChange} value={props.value} placeholder="Введите номер телефона"/>
                    </Form.Group>

                    <Button variant="primary" type="submit">
                        Жду звонка
                    </Button>
                </Form>
            </Modal.Body>
        </Modal>
    );
}

export function About() {
    const {t} = useTranslation('about')
    const [modalShow, setModalShow] = React.useState(false);

    const [branches, setBranches] = useState([])

    useEffect(() => {
        httpClient.post('object/get-list/branches', {data: {/*limit: 4, offset: 0*/}})
            .then(res => setBranches(res.data.response))
    }, [])

    return (
        <>
            <section className={styles.BranchesSection}>
                <div className="container-lg">
                    <div className={styles.BranchesContainer}>
                        {
                            branches?.map((branches, index) => (
                                <div className={styles.BranchesItem} key={branches.id}>
                                    <div className={`col-3 d-flex justify-content-center align-items-center ${styles.BranchesItemLeft}`}>
                                        {/*<img src={branches.photo} alt=""/>*/}
                                        <LazyLoadImage
                                            alt={''}
                                            height={''}
                                            effect="blur"
                                            src={branches.photo} // use normal <img> attributes as props
                                            width={'100%'} />
                                    </div>

                                    <div className={`col-9 ${styles.BranchesItemRight}`}>
                                        <div className="d-flex flex-column justify-content-between h-100 col-10">
                                            <h4>{branches.name}</h4>
                                            <span><img src="/images/locationBorder.svg" alt=""/>{branches.address}</span>
                                            <p dangerouslySetInnerHTML={{ __html: branches.description }}></p>
                                            <div className="d-flex justify-content-between" style={{marginTop: '16px'}}>
                                                <button onClick={() => setModalShow(true)}>
                                                    <img src="/images/callOutlined.svg" alt=""/>
                                                    Заказать обрытный зовнок
                                                </button>

                                                <Link href={`${branches?.location}`}>
                                                    <button>
                                                        <img src="/images/mapOutlined.svg" alt=""/>
                                                        Показать на карте
                                                    </button>
                                                </Link>

                                                <Link href={`/aboutus/${branches?.guid}`}>
                                                    <button>
                                                        Подробнее о клинике
                                                    </button>
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))
                        }



                    </div>
                </div>
            </section>

            <MyVerticallyCenteredModal
                show={modalShow}
                onHide={() => setModalShow(false)}
            />
        </>
    )
}
