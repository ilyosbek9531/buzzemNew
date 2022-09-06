import { Container } from '@mui/material'
import { format } from 'date-fns'
import useTimeList from 'hooks/useTimeList'
import Link from 'next/link'
import styles from './CalendarView.module.scss'

export function TimeColumn() {
    const { timeList } = useTimeList(30)

    return (
        <div className={styles.timeColumn}>

            {timeList.map((time) => (
                <div key={time} className={styles.timeColumnItem}>
                {format(time, 'HH:mm')}
            </div>
            ))}

        </div>
    )
}
