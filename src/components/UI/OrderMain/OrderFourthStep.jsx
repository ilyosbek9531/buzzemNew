import Link from 'next/link'
import styles from './OrderMain.module.scss'
import React, {useEffect, useState} from "react";
import Modal from "react-bootstrap/Modal";
import CloseIcon from "@mui/icons-material/Close";
import AddIcon from '@mui/icons-material/Add';
import {useDispatch, useSelector} from "react-redux";
import httpClient from "../../../services/httpClient";
import { format } from "date-fns";
import {ru} from "date-fns/locale";
import {appointmentActions} from "../../../store/appointment/appointment.slice";

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
                <div className={styles.rejectModalBody}>
                    <img src="/images/LogoVector.svg" alt=""/>
                    <p>Вы уверены что хотите удалить этот приём?</p>

                    <div className={'d-flex justify-content-between w-100 m-0'}>
                        <button onClick={() => setModalShow(false)}>
                            Нет
                        </button>

                        <Link href={'/'}>
                            <a onClick={() => setModalShow(false)}>
                                Удалить
                            </a>
                        </Link>
                    </div>
                </div>
            </Modal.Body>
        </Modal>
    );
}

export function OrderFourthStep() {

    const currentService = useSelector(state => state.appointment.stepsData[2]?.selectedSpecialities)
    const currentDoctorAndTime = useSelector(state => state.appointment.stepsData[3]?.selectedTimeAndDoctor)
    const [doctor, setDoctor] = useState([])
    const [branch, setBranch] = useState([])
    const currentStep = useSelector(state => state.appointment.currentStep)
    const dispatch = useDispatch()

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

    const [modalShow, setModalShow] = useState(false);

    return (
        <>
            <div className={styles.OrderFourthStep}>
                <div className="container-lg">
                    <h3>Подтвердите приёмы</h3>

                    <div className={styles.CheckOrderLeftSecondContainer}>


                        <div className={styles.CheckOrderLeftSecondContainerItem}>
                            <div className={styles.CheckOrderLeftSecondContainerItemImg}>
                                <img src={doctor.passport_photo} alt=""/>
                            </div>

                            <div className={styles.CheckOrderLeftSecondContainerItemInfo}>

                                <h5>{`${currentService[0].specialities.name}`} <p dangerouslySetInnerHTML={{ __html: currentService[0].description}}></p></h5>
                                <p>{doctor[0]?.FIO}</p>
                                <span>{currentService[0].price} cум</span>

                                <div className={styles.CheckOrderLeftSecondContainerItemInfoFoot}>
                                    <div className='d-flex col-2'>
                                        <img src="/images/calendar.svg" alt=""/>
                                        <span>{format(new Date(currentDoctorAndTime.time), 'EEEEEE, dd MMM', { locale: ru })}</span>
                                    </div>

                                    <div className='d-flex col-2'>
                                        <img src="/images/time.svg" alt=""/>
                                        <span>{format(new Date(currentDoctorAndTime.time), 'HH:mm', { locale: ru })}</span>
                                    </div>

                                    <div className='d-flex col-7'>
                                        <img src="/images/location.svg" alt=""/>
                                        <span className={'fourthStepAdress'}>{branch[0]?.address}</span>
                                    </div>
                                </div>
                            </div>

                            {/*<div className={styles.CheckOrderLeftSecondContainerItemDel}>*/}
                            {/*    <button onClick={() => setModalShow(true)}>*/}
                            {/*        <CloseIcon/>*/}
                            {/*    </button>*/}

                            {/*    <MyVerticallyCenteredModal*/}
                            {/*        show={modalShow}*/}
                            {/*        onHide={() => setModalShow(false)}*/}
                            {/*    />*/}
                            {/*</div>*/}
                        </div>


                    </div>

                    <div className="d-flex justify-content-end mt-5">
                        <button className={styles.toLastStep} onClick={() => onFourthStepToFifthClick()}>
                            Подтвердить
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}
