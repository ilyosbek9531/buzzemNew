import Link from 'next/link'
import styles from './DiscountInfo.module.scss'
import Card from 'react-bootstrap/Card';
import { compareAsc, format } from 'date-fns'
import { ru } from 'date-fns/locale';
import React, {useEffect, useState} from "react";
import httpClient from "../../../services/httpClient";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import InputMask from "react-input-mask";
import Button from "react-bootstrap/Button";
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

export function DiscountInfo({discountInfo}) {
    const publishedDate = format(new Date(discountInfo.data.response.publish_date), 'dd MMM yyyy', { locale: ru })
    const discountTimeFrom = format(new Date(discountInfo.data.response.time_from), 'dd MMM yyyy', { locale: ru })
    const discountTimeTo = format(new Date(discountInfo.data.response.time_to), 'dd MMM yyyy', { locale: ru })
    const [branch, setBranch] = useState([])
    const [modalShow, setModalShow] = React.useState(false);
    const [discount, setDiscount] = useState([])

    useEffect(() => {
        httpClient.get(`object/branches/${discountInfo.data.response.branches_id}`, {data: {/*limit: 4, offset: 0*/}})
            .then(res => setBranch(res.data.response))
    }, [])

    useEffect(() => {
        httpClient.post('object/get-list/discounts', {data: {/*limit: 4, offset: 0*/}})
            .then(res => setDiscount(res.data.response))
    }, [])

    return (
        <main>
            <section className={styles.DiscountInfoHeader}>
                <div className="container-lg">
                    <h3>{discountInfo.data.response.name}</h3>
                    <p className="d-flex align-items-center">
                        <img src="/images/calendar.svg" alt=""/>
                        <span>{publishedDate}</span>
                    </p>
                </div>
            </section>

            <section className={styles.DiscountInfoMain}>
                <div className="container-lg">
                    <div className={styles.DiscountInfoContainer}>
                        <div className="col-9">
                            <div className={styles.DiscountInfoMainLeft}>
                                {/*<img src={discountInfo.data.response.photo} className={'w-100'} alt=""/>*/}
                                <LazyLoadImage
                                    alt={''}
                                    effect="blur"
                                    src={discountInfo.data.response.photo} // use normal <img> attributes as props
                                    width={'100%'} />
                                <p dangerouslySetInnerHTML={{ __html: discountInfo.data.response.description }}/>

                                <div className={styles.DiscountInfoMainLeftContacts}>
                                    <div className="d-flex">
                                        <div className="col-7">
                                            <p>Акция проводится: <span>{branch.address}</span></p>
                                        </div>
                                        <div className="col-5">

                                            <p>Номер кол-центра: <span>{discountInfo.data.response.number_of_call_center}</span></p>
                                        </div>
                                    </div>
                                    <div className="d-flex">
                                        <div className="col-7">
                                            <p>Акция действует: <span>{discountTimeFrom} - {discountTimeTo} (включительно)</span></p>
                                        </div>
                                        <div className="col-5">
                                            <p>Номер телефона: <span>{discountInfo.data.response.phone_number}</span></p>
                                        </div>
                                    </div>
                                </div>


                                <div className={styles.DiscountInfoMainLeftButtons}>
                                    <button onClick={() => setModalShow(true)}>
                                        Заказать обратный звонок
                                    </button>

                                    <MyVerticallyCenteredModal
                                        show={modalShow}
                                        onHide={() => setModalShow(false)}
                                    />

                                    <Link href={'/'}>
                                        <a>
                                            Записаться на приём по акции
                                        </a>
                                    </Link>
                                </div>

                            </div>
                        </div>


                        <div className="col-3">
                            <div className={styles.DiscountInfoMainRight}>
                                {
                                    discount?.map((discounts, index) => (
                                        <Card style={{ width: '100%' }} key={discounts.id}>
                                            <Link href={`/discount/${discounts.guid}`}>
                                                <a>
                                                    <Card.Img variant="top" src={discounts.photo} />
                                                    <Card.Body>
                                                        <Card.Text>
                                                            {discounts.name}
                                                        </Card.Text>
                                                    </Card.Body>
                                                </a>
                                            </Link>
                                        </Card>
                                    ))
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    )
}
