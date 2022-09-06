import {Container} from '@mui/material'
import Link from 'next/link'
import styles from './OrderMain.module.scss'
import {Swiper, SwiperSlide} from "swiper/react";
import {A11y, Navigation} from "swiper";
import * as React from 'react';
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import PropTypes from "prop-types";
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import {Autoplay, Pagination} from "swiper";
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import {useDispatch, useSelector} from "react-redux";
import {useEffect, useMemo, useState} from "react";
import httpClient from "../../../services/httpClient";
import {appointmentActions} from "../../../store/appointment/appointment.slice";
import {add, differenceInDays, format} from "date-fns";
import {ru} from "date-fns/locale";
import useTimeList from "../../../hooks/useTimeList";
import {DoctorForOrder} from "./Doctor";
import Spinner from "react-bootstrap/Spinner";
import IconGenerator from "../IconGenerator/IconGenerator";

export function OrderThirdStep() {
    const currentStep = useSelector(state => state.appointment.currentStep)
    const currentService = useSelector(state => state.appointment.stepsData[2]?.selectedSpecialities)
    const dispatch = useDispatch()
    const [selectedDate, setSelectedDate] = useState(new Date())
    const [doctorList, setDoctorList] = useState([])
    const [doctorDateList, setDoctorDateList] = useState([])
    const [isLoading, setIsLoading] = useState(false)

    const specialitiesGuids = useMemo(() => {
        const result = []
        currentService.map(ser => {
            result.push(ser.guid)
        })

        return result
    })

    const dateList = useMemo(() => {
        const startDate = new Date()
        const result = []
        for (let i = 0; i < 20; i++) {
            result.push(add(startDate, {days: i}))
        }
        return result
    }, [])

    useEffect(() => {
        getData()
    }, [])

    const getData = async () => {
        setIsLoading(true)
        try {

            const res = await httpClient.post('object/get-list/doctors', {data: {"services_ids": specialitiesGuids}})
            setDoctorList(res.data.response ?? [])
        } catch (a) {

        }
        setIsLoading(false)
    }

    useEffect(() => {
        if (!selectedDate || !doctorList?.length) return
        getWorkingDays()
    }, [selectedDate, doctorList])

    const getWorkingDays = async () => {
        try {
            const doctorIds = doctorList?.map(doctor => doctor.guid)
            const doctor_working_days = await httpClient.post('object/get-list/doctor_working_days', {
                data: {
                    "doctors_id": doctorIds,
                    date: format(selectedDate, 'yyyy-MM-dd')
                }
            })
            const visits = await httpClient.post('object/get-list/visit_service', {
                data: {
                    "doctors_id": doctorIds,
                    "time_from": format(selectedDate, 'yyyy-MM-dd')
                }
            })

            const computedDoctorsList = doctorList.map((doctor) => ({
                ...doctor,
                workingDay: doctor_working_days?.data?.response.find((day => day.doctors_id === doctor.guid)),
                visits: visits?.data?.response.filter(visit => visit.doctors_id === doctor.guid)
            }))

            setDoctorDateList(computedDoctorsList)
        } catch (a) {

        }
    }

    const onThirdStepToFourthClick = () => {
        dispatch(appointmentActions.setCurrentStep(currentStep + 1))
    }

    const timeAndDoctorFromStore = useSelector(state => state.appointment.stepsData[3]?.selectedTimeAndDoctor)

    return (
        <>
            <div>
                <section className={styles.orderfromservicesHeader}>
                    <div className="container-lg">
                        <h3>Выбрать дату и врача</h3>
                        <div className="OrderFromDoctorsSlider d-flex">
                            <div className="col-6">
                                <span className={styles.month}>Июль</span>
                                <Swiper
                                    slidesPerView={10}
                                    spaceBetween={0}
                                    slidesPerGroup={3}
                                    loop={false}
                                    autoplay={{
                                        delay: 2500,
                                        disableOnInteraction: false,
                                    }}
                                    loopFillGroupWithBlank={true}
                                    // pagination={{
                                    //     clickable: true,
                                    // }}
                                    navigation={true}
                                    modules={[Navigation, A11y]}
                                    className={
                                        styles.mySwiper
                                    }
                                >

                                    {
                                        dateList?.map((item) => (
                                            <SwiperSlide key={item} className={styles.swiperslide}>
                                                <button
                                                    className={`datesOrderMain ${format(selectedDate, 'dd:mm') == format(item, 'dd:mm') ? 'active' : ''}`}
                                                    onClick={() => setSelectedDate(item)}>
                                                    <span>{format(new Date(item), 'dd')}</span>
                                                    <p>{format(new Date(item), 'EEEEEE', {locale: ru})}</p>
                                                </button>
                                            </SwiperSlide>
                                        ))
                                    }


                                </Swiper>
                            </div>

                            <div className="col-6 d-flex justify-content-end align-items-end">
                                <button onClick={() => onThirdStepToFourthClick()} disabled={!timeAndDoctorFromStore?.time && doctorDateList}
                                        className={styles.linkcontinue}>Продолжить <ChevronRightIcon/></button>
                            </div>
                        </div>
                    </div>
                </section>

                <section className={styles.orderfromserviceMain}>
                    <div className="container-lg">
                        <div className={styles.orderfromserviceMainBlock}>
                            <div className={styles.orderfromserviceMainBlockBody}>
                                <div className={styles.orderfromserviceMainDoctors}>
                                    {
                                        isLoading ?
                                            (
                                                <Spinner animation="border" role="status">
                                                    <span className="visually-hidden">Loading...</span>
                                                </Spinner>
                                            )
                                            : doctorDateList?.map((doctor) => (
                                                <DoctorForOrder key={doctor.guid} doctor={doctor} selectedDate={selectedDate}/>
                                            ))
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </>
    )
}
