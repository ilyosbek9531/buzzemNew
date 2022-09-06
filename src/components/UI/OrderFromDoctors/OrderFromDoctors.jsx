import * as React from 'react';
import useTranslation from 'next-translate/useTranslation'
import Link from 'next/link'
import {useRouter} from 'next/router'
import styles from './OrderFromDoctors.module.scss'
import Form from 'react-bootstrap/Form';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import {Swiper, SwiperSlide} from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import {Autoplay, Pagination, Navigation, A11y} from "swiper";
import PropTypes from "prop-types";
import {useEffect, useState} from "react";
import { compareAsc, format } from 'date-fns'
import { ru } from 'date-fns/locale';
import httpClient from "../../../services/httpClient";


//
// function TabPanel(props) {
//     const {children, value, index, ...other} = props;
//
//     return (
//         <div
//             role="tabpanel"
//             hidden={value !== index}
//             id={`simple-tabpanel-${index}`}
//             aria-labelledby={`simple-tab-${index}`}
//             {...other}
//         >
//             {value === index && (
//                 <Box sx={{p: 3}}>
//                     <Typography>{children}</Typography>
//                 </Box>
//             )}
//         </div>
//     );
// }
//
// TabPanel.propTypes = {
//     children: PropTypes.node,
//     index: PropTypes.number.isRequired,
//     value: PropTypes.number.isRequired,
// };
//
// function a11yProps(index) {
//     return {
//         id: `simple-tab-${index}`,
//         'aria-controls': `simple-tabpanel-${index}`,
//     };
// }



export function OrderFromDoctors(doctorInfoBook) {
    const [value, setValue] = useState(0);
    const [specialities, setSpecialities] = useState([])
    const [date, setDate] = useState({});
    const [time, setTime] = useState([]);
    const aboutDoctor = doctorInfoBook.doctorInfoBook.doctorInfoBook.data.response


    const filterChangeHandler = (e) => {
        setDate(prev => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    }

    const handleChange = (event, newValue) => {
        setValue(newValue);

    };

    useEffect(() => {
        httpClient.get(`object/specialities/${aboutDoctor[0].doctors.specialities_id}`, {data: {/*limit: 2, offset: 0*/}})
            .then(res => setSpecialities(res.data.response))
    }, [])

    useEffect(() => {
        const data = {
            id: date['date']
        }

        httpClient.post('object/get-list/doctors', {data})
            .then(res => setTime(res.data.response))
    }, [date])

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1
    };

    return (
        <section className={styles.OrderFromDoctors}>
            <div className="container-lg">
                <h3>Запись на приём к врачу</h3>

                <div className={styles.OrderFromDoctorsMain}>
                    <div className="d-flex justify-content-between borderbottomforheader" style={{padding: '12px 24px'}}>
                        <div className={styles.OrderFromDoctorsMainHeaderSelect}>

                        </div>

                        <Link href={'/'}>
                            <a className={styles.OrderFromDoctorsMainHeaderBtn}>
                                Продолжить
                                <ChevronRightIcon/>
                            </a>
                        </Link>
                    </div>

                    <div className={'d-flex'}>
                        <div className="col-6 p-12-24 d-flex">
                            <div className={styles.OrderFromDoctorsImageDoc}>
                                <img src="/images/image 80.svg" alt=""/>
                            </div>

                            <div className={styles.OrderFromDoctorsMainInfo}>
                                <h4>{aboutDoctor[0].doctors.FIO}</h4>
                                <p>{specialities.name}</p>
                                <span>Стаж {aboutDoctor[0].doctors.experience} лет</span>
                            </div>
                        </div>

                        <div className="col-6 p-12-24 OrderFromDoctorsSlider">
                            <p>Выберите дату и время записи</p>
                            <div className={styles.OrderFromDoctorsSliderSwiper}>
                                <Swiper
                                    slidesPerView={4}
                                    spaceBetween={12}
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


                                    {aboutDoctor?.map((date, index) => (
                                        <SwiperSlide className={styles.swiperslide} key={date.id}>
                                            <div className={styles.dateItems}>
                                                <input type="radio" id={date.guid} name="date" value={date.guid} onChange={filterChangeHandler}/>
                                                <label htmlFor={date.guid}>
                                                    <p>{format(new Date(date.date), 'EEEE', { locale: ru })}</p>
                                                    <span>{format(new Date(date.date), 'dd MMMM', { locale: ru })}</span>
                                                </label>
                                            </div>
                                        </SwiperSlide>
                                    ))}



                                </Swiper>
                            </div>

                            <div className={styles.OrderFromDoctorsTimes}>

                                {
                                    time?.map((times, index) => (
                                    <div className={styles.OrderFromDoctorsTime} key={times.id}>
                                        <input type="radio" id={times.guid} name="amount"/>
                                        <label htmlFor={times.guid}>09:00</label>
                                    </div>
                                ))}

                                <div className={styles.OrderFromDoctorsTime}>
                                    <input type="radio" id="a25" name="amount"/>
                                    <label htmlFor="a25"><span>09:00</span></label>
                                </div>


                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}