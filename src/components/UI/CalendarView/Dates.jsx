import { Container } from '@mui/material'
import { differenceInMinutes, format, setHours, setMinutes } from 'date-fns'
import useTimeList from 'hooks/useTimeList'
import Link from 'next/link'
import { ru } from 'date-fns/locale';
import styles from './CalendarView.module.scss'
import { AboutVisitModal } from './AboutVisitModal';
import { useMemo, useState } from 'react';
import Tooltip from '@mui/material/Tooltip';

export function Dates({ date, visits }) {

    const { timeList } = useTimeList(30)
    const [modalInfo, setModalInfo] = useState(null)

    const bookedDates = useMemo(() => {
        return visits.filter(visit => visit.date === format(date, 'dd.MM.yyyy')).map(visit => {
            const beginPosition = differenceInMinutes(
                visit.time_from ? new Date(visit.time_from) : null,
                setHours(setMinutes(date, 0), 6)
            )
            const beginPositionPixel = (beginPosition / 30) * 32 + 32
            

            const heightPosition = differenceInMinutes(
                visit.time_to ? new Date(visit.time_to) : null,
                visit.time_from ? new Date(visit.time_from) : null,
            )
            const height = (heightPosition / 30) * 32

            return {
                ...visit,
                beginPosition: beginPosition,
                beginPositionPixel: beginPositionPixel,
                height: height

            }
        })
    }, [visits, date])



    return (

        <div className={styles.dateContainer}>
            <div className={`${styles.dateRowItems}`}>
                <span>{format(date, 'EEEEEE, dd MMM', { locale: ru })}</span>
            </div>

            {timeList.map((time) => (
                <div key={time} className={styles.dataColumnItem} />
            ))}

            {
                bookedDates?.map(data => (
                    <div className={styles.bookedItem} style={{ top: `${data.beginPositionPixel}px` }} key={data}>
                        <Tooltip title={data.services?.name} followCursor>
                            <div className={styles.bookedItemIn} style={{height: `${data.height}px`}} onClick={() => setModalInfo(data)}>
                                <span>{format(new Date(data.time_from), 'HH:mm') + '-' + format(new Date(data.time_to), 'HH:mm')}</span>
                                <span>{data.doctors.FIO}</span>
                                <span>{data.services?.name}</span>
                            </div>
                        </Tooltip>
                    </div>


                ))
            }

            <AboutVisitModal
                modalInfo={modalInfo}
                show={!!modalInfo}
                onHide={() => setModalInfo(null)}
            />


        </div>

    )
}
