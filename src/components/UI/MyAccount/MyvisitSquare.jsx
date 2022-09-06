import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import styles from './MyAccount.module.scss'
import {CalendarView} from "../CalendarView";
import useAuth from 'hooks/useAuth';
import CRangePicker from '../CalendarView/CRangePicker';
import {add, differenceInDays, endOfWeek, startOfWeek} from 'date-fns';
import {useMemo, useState} from 'react';

function TabPanel(props) {
    const {children, value, index, ...other} = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{p: 3}}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

export default function MyvisitSquare({onlineVisits, offlineVisits}) {
    const [value, setValue] = useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const [dateFilters, setDateFilters] = useState([
        startOfWeek(new Date(), {weekStartsOn: 1}),
        endOfWeek(new Date(), {weekStartsOn: 1}),
    ])

    const dateList = useMemo(() => {
        if (!dateFilters?.[0] || !dateFilters?.[1]) return

        const differenceDays = differenceInDays(dateFilters[1], dateFilters[0])

        const result = []
        for (let i = 0; i <= differenceDays; i++) {
            result.push(add(dateFilters[0], {days: i}))
        }
        return result
    }, [dateFilters])

    console.log('dateFilters==>>', dateFilters)

    return (
        <div className="myvisitline myvisitsquare">
            <Box sx={{width: '100%'}}>
                <Box sx={{borderBottom: 1, borderColor: 'divider'}}>
                    <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                        <Tab label="Онлайн запись" {...a11yProps(0)} />
                        <Tab label="Оффлайн запись" {...a11yProps(1)} />
                    </Tabs>

                    <CRangePicker onChange={setDateFilters} value={dateFilters}/>
                </Box>


                <TabPanel value={value} index={0}>
                    <div className={styles.calendarheader}>
                        <div className={styles.calendarheaderItem}>
                            <span className={styles.calendarheaderItemActive}></span>
                            <p>Активный</p>
                        </div>

                        <div className={styles.calendarheaderItem}>
                            <span className={styles.calendarheaderItemWaiting}></span>
                            <p>Ждёт оплату</p>
                        </div>

                        <div className={styles.calendarheaderItem}>
                            <span className={styles.calendarheaderItemDeserved}></span>
                            <p>Отменён</p>
                        </div>

                        <div className={styles.calendarheaderItem}>
                            <span className={styles.calendarheaderItemVisited}></span>
                            <p>Посещён</p>
                        </div>
                    </div>


                    <CalendarView visits={onlineVisits} dateList={dateList}/>


                </TabPanel>
                <TabPanel value={value} index={1}>
                    <div className={styles.calendarheader}>
                        <div className={styles.calendarheaderItem}>
                            <span className={styles.calendarheaderItemActive}></span>
                            <p>Активный</p>
                        </div>

                        <div className={styles.calendarheaderItem}>
                            <span className={styles.calendarheaderItemWaiting}></span>
                            <p>Ждёт оплату</p>
                        </div>

                        <div className={styles.calendarheaderItem}>
                            <span className={styles.calendarheaderItemDeserved}></span>
                            <p>Отменён</p>
                        </div>

                        <div className={styles.calendarheaderItem}>
                            <span className={styles.calendarheaderItemVisited}></span>
                            <p>Посещён</p>
                        </div>
                    </div>

                    <CalendarView visits={offlineVisits} dateList={dateList}/>
                </TabPanel>
            </Box>
        </div>
    );
}