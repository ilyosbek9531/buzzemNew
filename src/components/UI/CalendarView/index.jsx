import { Container } from '@mui/material'
import Link from 'next/link'
import styles from './CalendarView.module.scss'
import {DateRow} from "./DateRow";
import {DataColumn} from "./DataColumn";

export function CalendarView({visits, dateList}) {

    return (
        <div className={styles.calendarContainer}>
            <DataColumn/>
            <DateRow dateList={dateList} visits={visits}/>
        </div>
    )
}