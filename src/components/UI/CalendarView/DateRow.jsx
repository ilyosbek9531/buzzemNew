import { Container } from '@mui/material'
import useTimeList from 'hooks/useTimeList'
import Link from 'next/link'
import styles from './CalendarView.module.scss'
import { Dates } from './Dates'

export function DateRow({ dateList, visits }) {
    const { timeList } = useTimeList(30)
    return (
        <>
            <div className={styles.daterow}>


                {
                    dateList?.map(date => (
                        <Dates key={date} date={date} visits={visits}/>
                    ))
                }

            </div>
        </>
    )
}
