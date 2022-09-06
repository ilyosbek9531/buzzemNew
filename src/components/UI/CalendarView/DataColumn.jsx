import { Container } from '@mui/material'
import { format } from 'date-fns';
import useTimeList from 'hooks/useTimeList';
import Link from 'next/link'
import styles from './CalendarView.module.scss'
import { TimeColumn } from "./TimeColumn";

export function DataColumn() {
    const { timeList } = useTimeList(30)

    return (
        <div className={styles.dataColumnContainer}>
            <div className={styles.timeColumn}>

                <div className={styles.daterowempty} />

                {timeList.map((time) => (
                    <div key={time} className={styles.timeColumnItem}>
                        {format(time, 'HH:mm')}
                    </div>
                ))}

            </div>
        </div>
    )
}
