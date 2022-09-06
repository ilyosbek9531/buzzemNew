import Link from 'next/link'
import Form from 'react-bootstrap/Form'
import styles from './CheckOrder.module.scss'
import InputMask from "react-input-mask";
import React, {useEffect, useState} from "react";
import CloseIcon from '@mui/icons-material/Close';
import useAuth from "../../../hooks/useAuth";
import {useForm} from "react-hook-form";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import {useDispatch, useSelector} from "react-redux";
import httpClient from "../../../services/httpClient";
import {appointmentActions} from "../../../store/appointment/appointment.slice";
import {add, format} from "date-fns";
import {ru} from "date-fns/locale";
import Spinner from "react-bootstrap/Spinner";
import {DoctorForOrder} from "../OrderMain/Doctor";

export function CheckOrder(props) {
    const {userId, token, patient, setUserId, setToken, setLogout, setAboutPatient} = useAuth()
    const {register, handleSubmit, formState: {errors}, setValue, reset, control} = useForm()
    const currentService = useSelector(state => state.appointment.stepsData[2]?.selectedSpecialities)
    const currentDoctorAndTime = useSelector(state => state.appointment.stepsData[3]?.selectedTimeAndDoctor)
    const [doctor, setDoctor] = useState([])
    const [branch, setBranch] = useState([])
    const [response, setResponse] = useState([])
    const [isLoading, setIsloading] = useState(false)
    const currentStep = useSelector(state => state.appointment.currentStep)
    const dispatch = useDispatch()

    useEffect(() => {
        reset(patient)
    }, [patient])

    useEffect(() => {
        setDoctor(currentDoctorAndTime?.doctor)
    })

    useEffect(() => {
        httpClient.post('object/get-list/branches', {data: {"guid": doctor[0]?.branches_id}})
            .then(res => setBranch(res.data.response))
    }, [])

    const onFourthStepToFifthClick = () => {
        dispatch(appointmentActions.setCurrentStep(currentStep + 1))
    }

    const orderLastStepToPay = () => {
        setIsloading(true)
        httpClient.post('object/visit_service', {data: {
                "booking_type": "online",
                "doctors_id": doctor.guid,
                "patients_id": patient.guid,
                "price": currentService[0].price,
                "services_id": currentService.guid,
                "status": "Новый",
                "time_from": new Date(currentDoctorAndTime.time),
                "time_to": add(new Date(currentDoctorAndTime.time), { minutes: 30 }),
            }}).then(res => saveRes(res))
    }

    function clearWhileExit() {
        /*props.onHide()*/
        dispatch(appointmentActions.clearState())
    }

    function saveRes(res) {
        setResponse(res)
        setIsloading(false)
        clearWhileExit()
        window.location.href = '/'
    }


    return (
        <section className={styles.CheckOrderSection}>
            <div className="container-lg">
                <h3>Оплатите приём</h3>

                <div className={styles.CheckOrderContainer}>
                    <div className={styles.CheckOrderLeft}>
                        <div className={styles.CheckOrderLeftFirst}>
                            <h4>Ваши данные</h4>
                            <div>
                                <Form className={styles.inputContainer}>
                                    <Form.Group controlId="formBasicNameF">
                                        <Form.Label>Фамилия</Form.Label>
                                        <input className={'form-control'} disabled {...register("secon_name", {required: true})} type="text"
                                               placeholder=""/>
                                        {errors.secon_name &&
                                            <span className={'fieldError d-flex align-items-center mt-3'}><ErrorOutlineIcon className={'me-2'}/> Это обязательное поле!</span>}
                                    </Form.Group>

                                    <Form.Group controlId="formBasicNameN">
                                        <Form.Label>Имя</Form.Label>
                                        <input className={'form-control'} disabled {...register("name", {required: true})} type="text"
                                               placeholder=""/>
                                        {errors.name &&
                                            <span className={'fieldError d-flex align-items-center mt-3'}><ErrorOutlineIcon className={'me-2'}/> Это обязательное поле!</span>}
                                    </Form.Group>

                                    <Form.Group controlId="formBasicNameO">
                                        <Form.Label>Отчетство</Form.Label>
                                        <Form.Label>Серия и номер паспорта</Form.Label>
                                        <input className={'form-control'} type="text" placeholder=""
                                               value={patient.passport_serial + patient.passport_number} disabled/>
                                    </Form.Group>

                                    <Form.Group controlId="formBasicNumberP">
                                        <Form.Label>Телефон для связи</Form.Label>
                                        <input className={'form-control'} type="text" {...register("phone_number")} placeholder=""
                                               value={patient.phone_number} disabled/>
                                        {errors.phone_number &&
                                            <span className={'fieldError d-flex align-items-center mt-3'}><ErrorOutlineIcon className={'me-2'}/> Это обязательное поле!</span>}
                                    </Form.Group>
                                </Form>
                            </div>
                        </div>

                        <div className={styles.CheckOrderLeftSecond}>
                            <h4>Ваши приёмы</h4>

                            <div className={styles.CheckOrderLeftSecondContainer}>
                                <div className={styles.CheckOrderLeftSecondContainerItem}>
                                    <div className={styles.CheckOrderLeftSecondContainerItemImg}>
                                        <img src={doctor.passport_photo} alt=""/>
                                    </div>

                                    <div className={styles.CheckOrderLeftSecondContainerItemInfo}>

                                        <h5>{`${currentService[0].specialities.name}`} <p
                                            dangerouslySetInnerHTML={{__html: currentService[0].description}}></p></h5>
                                        <p>{doctor.FIO}</p>
                                        <span>{currentService[0].price} cум</span>

                                        <div className={styles.CheckOrderLeftSecondContainerItemInfoFoot}>
                                            <div className='d-flex col-2'>
                                                <img src="/images/calendar.svg" alt=""/>
                                                <span>{format(new Date(currentDoctorAndTime.time), 'EEEEEE, dd MMM', {locale: ru})}</span>
                                            </div>

                                            <div className='d-flex col-2'>
                                                <img src="/images/time.svg" alt=""/>
                                                <span>{format(new Date(currentDoctorAndTime.time), 'HH:mm', {locale: ru})}</span>
                                            </div>

                                            <div className='d-flex col-7'>
                                                <img src="/images/location.svg" alt=""/>
                                                <span className={'fourthStepAdress'}>{branch[0]?.address}</span>
                                            </div>
                                        </div>
                                    </div>

                                    {/*<div className={styles.CheckOrderLeftSecondContainerItemDel}>*/}
                                    {/*    <button>*/}
                                    {/*        <CloseIcon/>*/}
                                    {/*    </button>*/}
                                    {/*</div>*/}
                                </div>
                            </div>
                        </div>

                        {/*<div className={styles.CheckOrderLeftThird}>*/}
                        {/*    <h4>Кто оплачивает прием</h4>*/}

                        {/*    <div className={styles.CheckOrderLeftThirdContainer}>*/}
                        {/*        <button>*/}
                        {/*            Сам(а)*/}
                        {/*        </button>*/}

                        {/*        <button>*/}
                        {/*            Работадатель*/}
                        {/*        </button>*/}

                        {/*        <button>*/}
                        {/*            Страховая компания*/}
                        {/*        </button>*/}
                        {/*    </div>*/}
                        {/*</div>*/}

                        {/*<div className={styles.CheckOrderLeftFourth}>*/}
                        {/*    <h4>Способ оплаты</h4>*/}

                        {/*    <div className={styles.CheckOrderLeftFourthContainer}>*/}
                        {/*        <button>*/}
                        {/*            <img src="/images/payme.svg" alt=""/>*/}
                        {/*            Payme*/}
                        {/*        </button>*/}

                        {/*        <button>*/}
                        {/*            <img src="/images/click.svg" alt=""/>*/}
                        {/*            Click*/}
                        {/*        </button>*/}
                        {/*    </div>*/}
                        {/*</div>*/}
                    </div>

                    <div className={styles.CheckOrderRight}>
                        <h4>Ваш чек</h4>

                        <div className={styles.CheckOrderRightBody}>

                            <div>
                                <span>{currentService[0].name}</span>
                                <span>{currentService[0].price} сум</span>
                            </div>

                            {/*<div>
                                <span>Осмотр/консультация</span>
                                <span>200 000 сум</span>
                            </div>*/}

                            <hr/>

                            {/*<div>
                                <span>Льгота инвалидности (15%)</span>
                                <span>-25 000 сум</span>
                            </div>

                            <div>
                                <span>Скидка (10%)</span>
                                <span>-15 000 сум</span>
                            </div>*/}

                            <div>
                                <p>Итого</p>
                                <p>{currentService[0].price} сум</p>
                            </div>

                            <hr/>

                            {/*<button className={styles.btnpredoplata}>*/}
                            {/*    Внести предоплату (15%) - 69 000 сум*/}
                            {/*</button>*/}

                            <button className={styles.btnfullpay} onClick={() => orderLastStepToPay()}>
                                {
                                    isLoading ?
                                        (
                                            <Spinner animation="border" role="status">
                                                <span className="visually-hidden">Loading...</span>
                                            </Spinner>
                                        )
                                        : 'Оплатить всю сумму'
                                }

                            </button>

                            <p>
                                Если вы вносите предоплату 15% онлайн, оставшуюся сумму оплачиваете перед посещением врача в клинике
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
