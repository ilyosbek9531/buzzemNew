import {Container} from '@mui/material'
import Link from 'next/link'
import styles from './OrderMain.module.scss'
import {format} from "date-fns";
import * as React from "react";
import {
    differenceInMinutes,
    isAfter,
    isBefore,
    setHours,
    setMinutes,
} from "date-fns";
import {add} from "date-fns";
import {useEffect, useMemo, useState} from "react";
import {appointmentActions} from "../../../store/appointment/appointment.slice";
import {useDispatch, useSelector} from "react-redux";

export function DoctorForOrder({doctor, selectedDate}) {

    const date = selectedDate;

    const isBeforeInMinutes = (time, nextTime) => {
        return differenceInMinutes(time, nextTime) < 0;
    };

    const isBeforeOrEqualInMinutes = (time, nextTime) => {
        return differenceInMinutes(time, nextTime) <= 0;
    };

    const isAfterInMinutes = (time, nextTime) => {
        return differenceInMinutes(time, nextTime) > 0;
    };

    const isAfterOrEqualInMinutes = (time, nextTime) => {
        return differenceInMinutes(time, nextTime) >= 0;
    };


    const computedTimes = useMemo(() => {

        if (!doctor?.workingDay?.time_from || !doctor?.workingDay?.time_to) return []

        const workingStartTime = doctor.workingDay?.time_from?.split(":")
            .map((el) => Number(el));
        const workingEndTime = doctor.workingDay?.time_to?.split(":")
            .map((el) => Number(el));

        const startTime = setMinutes(
            setHours(date, workingStartTime[0]),
            workingEndTime[1]
        );

        const endTime = setMinutes(
            setHours(date, workingEndTime[0]),
            workingEndTime[1]
        );

        const timeArray = [];
        let currentTime = startTime;
        while (currentTime <= endTime) {
            const nextTime = add(currentTime, {minutes: 30});

            const isEmpty = doctor.visits?.every((visit) => {

                if (!visit.time_from || !visit.time_to) return true;

                const visitTimeFrom = new Date(visit.time_from);
                const visitTimeTo = new Date(visit.time_to);

                return (
                    (isBefore(currentTime, visitTimeFrom) &&
                        isBeforeOrEqualInMinutes(nextTime, visitTimeFrom)) ||
                    isAfterOrEqualInMinutes(currentTime, visitTimeTo)
                );
            });

            timeArray.push({
                time: currentTime,
                isEmpty
            });
            currentTime = nextTime;
        }

        return timeArray

    }, [ doctor ]);


    const [selectedTimeAndDoctor, setSelectedTimeAndDoctor] = useState([])

    const dispatch = useDispatch()

    const timeAndDoctorFromStore = useSelector(state => state.appointment.stepsData[3]?.selectedTimeAndDoctor)

    useEffect(() => {
            dispatch(appointmentActions.setStepData({stepNumber: 3, data: {selectedTimeAndDoctor}}))
    }, [selectedTimeAndDoctor])


    return (
        <div className={styles.orderfromserviceMainDoctor}>

            <div className="col-6 d-flex align-items-center">
                <p className={styles.orderfromserviceMainDoctorImg}>
                    <img src={doctor.passport_photo} alt=""/>
                </p>
                <div className={'d-flex flex-column justify-content-center'}>
                    <p className={styles.orderfromserviceMainDoctorName}>{doctor.FIO}</p>
                    <span className={styles.orderfromserviceMainDoctorDirection}>{doctor?.specialities?.name}</span>
                    <span className={styles.orderfromserviceMainDoctorLvl}>Стаж {doctor?.experience} лет</span>
                </div>
            </div>

            <div className="col-6">
                <p className={styles.TimeTitle}>Выберите время записи</p>
                <div className={styles.TimeBtnContainer}>

                    {
                        computedTimes.map((time) => (
                                <button key={time} className={`${styles.TimeBtn} ${(timeAndDoctorFromStore?.time == time.time) && (timeAndDoctorFromStore?.doctor == doctor) ? 'TimeBtn active' : ''}`} onClick={() => setSelectedTimeAndDoctor({'time': `${time.time}`, 'doctor': doctor})} disabled={!time.isEmpty}>{format(time.time, 'HH:mm')}</button>
                            )
                        )
                    }
                </div>
            </div>

        </div>
    )
}
