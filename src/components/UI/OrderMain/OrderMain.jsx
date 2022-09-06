import {Container} from '@mui/material'
import Link from 'next/link'
import styles from './OrderMain.module.scss'
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import React, {useMemo, useState} from "react";
import Button from "react-bootstrap";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import InputMask from "react-input-mask";
import CheckIcon from '@mui/icons-material/Check';
import {OrderFirstStep} from "./OrderFirstStep";
import {OrderSecondStep} from "./OrderSecondStep";
import {OrderSecondDiagnostic} from "./OrderSecondDiagnostic";
import {OrderThirdStep} from "./OrderThirdStep";
import {OrderFourthStep} from "./OrderFourthStep";
import {CheckOrder} from "../CheckOrder/CheckOrder";
import {useDispatch, useSelector} from "react-redux";
import {appointmentActions} from "../../../store/appointment/appointment.slice";
import useAuth from "../../../hooks/useAuth";
import {LazyLoadImage} from "react-lazy-load-image-component";

function MyVerticallyCenteredModal(props) {
    const dispatch = useDispatch()

    function clearWhileExit() {
        /*props.onHide()*/
        dispatch(appointmentActions.clearState())
    }

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
                <div className={styles.rejectModalBody}>
                    <img src="/images/LogoVector.svg" alt=""/>
                    <p>Вы уверены что хотите прервать
                        ваш приём и выйти на главную страницу?
                    </p>

                    <div className={'d-flex justify-content-between w-100 m-0'}>
                        <button onClick={props.onHide}>
                            Нет, остаться
                        </button>

                        <Link href={'/'}>
                            <a onClick={() => clearWhileExit()}>
                                Выйти
                            </a>
                        </Link>
                    </div>
                </div>
            </Modal.Body>
        </Modal>
    );
}

const steps = [
    {
        number: 1,
        text: 'Выбор направления',
        component: OrderFirstStep
    },
    {
        number: 2,
        text: 'Выбор услуги',
        component: OrderSecondStep,
        componentDiagnostic: OrderSecondDiagnostic
    },
    {
        number: 3,
        text: 'Выбор дату и врача',
        component: OrderThirdStep
    },
    {
        number: 4,
        text: 'Подтверждение вриёма',
        component: OrderFourthStep
    },
    {
        number: 5,
        text: 'Оплата',
        component: CheckOrder
    },
]

export function OrderMain() {
    const [modalShow, setModalShow] = useState(false);
    const currentStep = useSelector(state => state.appointment.currentStep)
    const stepData = useSelector(state => state.appointment.stepsData.currentStep)
    const { userId, token, patient, setUserId, setToken, setLogout, setAboutPatient } = useAuth()

    const dispatch = useDispatch()

    const activeStep = useMemo(() => {
        return steps.find(step => step.number === currentStep)
    }, [currentStep])

    const onStepClick = (number) => {
        dispatch(appointmentActions.setCurrentStep(number))
    }

    return (
        <>
            <section className={styles.headerOrder}>
                <div className={`container-lg ${styles.headerOrderContainer}`}>
                    <button className={styles.rejectOrder} onClick={() => setModalShow(true)}>
                        <KeyboardArrowLeftIcon/>
                        Отменить
                    </button>

                    <button className={styles.logoOrder} onClick={() => setModalShow(true)}>
                        <img src="/images/LogoVector.svg" alt=""/>
                    </button>

                    <MyVerticallyCenteredModal
                        show={modalShow}
                        onHide={() => setModalShow(false)}
                    />



                        <button
                            id="basic-button"

                            className={styles.accBtn}
                        >
                            {
                                patient.passport_photo ?
                                    <LazyLoadImage
                                        alt={''}
                                        effect="blur"
                                        src={patient.passport_photo}
                                        width={'20px'}/> : <img src="/images/defaultUser.png" alt=""/>
                            }
                            <span>{patient?.secon_name + ' ' + patient?.name}</span>
                        </button>

                        {/*<button className={styles.accBtn}>*/}
                        {/*    <img src="/images/Vector (2).svg" alt=""/>*/}
                        {/*    <span>Личный кабинет</span>*/}
                        {/*</button>*/}

                </div>
            </section>

            <section className={styles.navigationOrder}>
                <div className={`container-lg ${styles.navigationOrderContainer}`}>
                    {
                        steps.map(step => (
                            <button onClick={() => onStepClick(step.number)} disabled={step.number <= currentStep ? false : true} key={step.number} className={step.number < currentStep ? styles.orderDone : step.number === currentStep ? styles.OrderActive : ''}>
                                <span>{step.number < currentStep ? <CheckIcon/> : step.number}</span>
                                <p>{step.text}</p>
                            </button>
                        ))
                    }
                </div>
            </section>

            <section className={styles.orderMain}>
                <activeStep.component />

                {/*<OrderFirstStep/>*/}
                {/*<OrderSecondStep/>*/}
                {/*<OrderSecondDiagnostic/>*/}
                {/*<OrderThirdStep/>*/}
                {/*<OrderFourthStep/>*/}
                {/*<CheckOrder/>*/}
            </section>
        </>
    )
}
