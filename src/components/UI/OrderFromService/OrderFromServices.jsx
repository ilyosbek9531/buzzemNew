import {Container} from '@mui/material'
import Link from 'next/link'
import styles from './OrderFromService.module.scss'
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

export function OrderFromServicess() {
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1
    };

    return (
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


                                <SwiperSlide className={styles.swiperslide}>
                                    <button>
                                        <span>2</span>
                                        <p>Пт</p>
                                    </button>
                                </SwiperSlide>

                                <SwiperSlide className={styles.swiperslide}>
                                    <button>
                                        <span>2</span>
                                        <p>Пт</p>
                                    </button>
                                </SwiperSlide>

                                <SwiperSlide className={styles.swiperslide}>
                                    <button>
                                        <span>2</span>
                                        <p>Пт</p>
                                    </button>
                                </SwiperSlide>

                                <SwiperSlide className={styles.swiperslide}>
                                    <button>
                                        <span>2</span>
                                        <p>Пт</p>
                                    </button>
                                </SwiperSlide>

                                <SwiperSlide className={styles.swiperslide}>
                                    <button>
                                        <span>2</span>
                                        <p>Пт</p>
                                    </button>
                                </SwiperSlide>

                                <SwiperSlide className={styles.swiperslide}>
                                    <button>
                                        <span>2</span>
                                        <p>Пт</p>
                                    </button>
                                </SwiperSlide>

                                <SwiperSlide className={styles.swiperslide}>
                                    <button>
                                        <span>2</span>
                                        <p>Пт</p>
                                    </button>
                                </SwiperSlide>

                                <SwiperSlide className={styles.swiperslide}>
                                    <button>
                                        <span>2</span>
                                        <p>Пт</p>
                                    </button>
                                </SwiperSlide>

                                <SwiperSlide className={styles.swiperslide}>
                                    <button>
                                        <span>2</span>
                                        <p>Пт</p>
                                    </button>
                                </SwiperSlide>

                                <SwiperSlide className={styles.swiperslide}>
                                    <button>
                                        <span>2</span>
                                        <p>Пт</p>
                                    </button>
                                </SwiperSlide>

                                <SwiperSlide className={styles.swiperslide}>
                                    <button>
                                        <span>2</span>
                                        <p>Пт</p>
                                    </button>
                                </SwiperSlide>

                            </Swiper>
                        </div>

                        <div className="col-6 d-flex justify-content-end align-items-end">
                            <Link href={'/checkorder'}>
                                <a className={styles.linkcontinue}>Продолжить <ChevronRightIcon/> </a>
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            <section className={styles.orderfromserviceMain}>
                <div className="container-lg">
                    <div className={styles.orderfromserviceMainBlock}>
                        <div className={styles.orderfromserviceMainBlockHeader}>
                            <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                                <Tab label="Все" {...a11yProps(0)} />
                                <Tab label="Мужчина" {...a11yProps(1)} />
                                <Tab label="Женщина" {...a11yProps(2)} />
                            </Tabs>
                        </div>

                        <div className={styles.orderfromserviceMainBlockBody}>
                            <TabPanel value={value} index={0}>
                                <div className={styles.orderfromserviceMainDoctors}>
                                    <div className={styles.orderfromserviceMainDoctor}>

                                        <div className="col-6 d-flex align-items-center">
                                            <p className={styles.orderfromserviceMainDoctorImg}>
                                                <img src="/images/image 80.svg" alt=""/>
                                            </p>
                                            <div className={'d-flex flex-column justify-content-center'}>
                                                <p className={styles.orderfromserviceMainDoctorName}>Адилов Шохрух Шукурулла огли</p>
                                                <span className={styles.orderfromserviceMainDoctorDirection}>Невролог</span>
                                                <span className={styles.orderfromserviceMainDoctorLvl}>Стаж 10 лет</span>
                                            </div>
                                        </div>

                                        <div className="col-6">
                                            <p className={styles.TimeTitle}>Выберите время записи</p>
                                            <div className={styles.TimeBtnContainer}>
                                                <button className={styles.TimeBtn}>08:30</button>
                                                <button className={styles.TimeBtn}>08:30</button>
                                                <button className={styles.TimeBtn}>08:30</button>
                                                <button className={styles.TimeBtn}>08:30</button>
                                                <button className={styles.TimeBtn}>08:30</button>
                                                <button className={styles.TimeBtn}>08:30</button>

                                                <button className={styles.TimeBtn}>08:30</button>
                                                <button className={styles.TimeBtn}>08:30</button>
                                                <button className={styles.TimeBtn}>08:30</button>
                                                <button className={styles.TimeBtn}>08:30</button>
                                                <button className={styles.TimeBtn}>08:30</button>
                                                <button className={styles.TimeBtn}>08:30</button>
                                            </div>
                                        </div>

                                    </div>

                                    <div className={styles.orderfromserviceMainDoctor}>

                                        <div className="col-6 d-flex align-items-center">
                                            <p className={styles.orderfromserviceMainDoctorImg}>
                                                <img src="/images/image 80.svg" alt=""/>
                                            </p>
                                            <div className={'d-flex flex-column justify-content-center'}>
                                                <p className={styles.orderfromserviceMainDoctorName}>Адилов Шохрух Шукурулла огли</p>
                                                <span className={styles.orderfromserviceMainDoctorDirection}>Невролог</span>
                                                <span className={styles.orderfromserviceMainDoctorLvl}>Стаж 10 лет</span>
                                            </div>
                                        </div>

                                        <div className="col-6">
                                            <p className={styles.TimeTitle}>Выберите время записи</p>
                                            <div className={styles.TimeBtnContainer}>
                                                <button className={styles.TimeBtn}>08:30</button>
                                                <button className={styles.TimeBtn}>08:30</button>
                                                <button className={styles.TimeBtn}>08:30</button>
                                                <button className={styles.TimeBtn}>08:30</button>
                                                <button className={styles.TimeBtn}>08:30</button>
                                                <button className={styles.TimeBtn}>08:30</button>

                                                <button className={styles.TimeBtn}>08:30</button>
                                                <button className={styles.TimeBtn}>08:30</button>
                                                <button className={styles.TimeBtn}>08:30</button>
                                                <button className={styles.TimeBtn}>08:30</button>
                                                <button className={styles.TimeBtn}>08:30</button>
                                                <button className={styles.TimeBtn}>08:30</button>
                                            </div>
                                        </div>

                                    </div>

                                    <div className={styles.orderfromserviceMainDoctor}>

                                        <div className="col-6 d-flex align-items-center">
                                            <p className={styles.orderfromserviceMainDoctorImg}>
                                                <img src="/images/image 80.svg" alt=""/>
                                            </p>
                                            <div className={'d-flex flex-column justify-content-center'}>
                                                <p className={styles.orderfromserviceMainDoctorName}>Адилов Шохрух Шукурулла огли</p>
                                                <span className={styles.orderfromserviceMainDoctorDirection}>Невролог</span>
                                                <span className={styles.orderfromserviceMainDoctorLvl}>Стаж 10 лет</span>
                                            </div>
                                        </div>

                                        <div className="col-6">
                                            <p className={styles.TimeTitle}>Выберите время записи</p>
                                            <div className={styles.TimeBtnContainer}>
                                                <button className={styles.TimeBtn}>08:30</button>
                                                <button className={styles.TimeBtn}>08:30</button>
                                                <button className={styles.TimeBtn}>08:30</button>
                                                <button className={styles.TimeBtn}>08:30</button>
                                                <button className={styles.TimeBtn}>08:30</button>
                                                <button className={styles.TimeBtn}>08:30</button>

                                                <button className={styles.TimeBtn}>08:30</button>
                                                <button className={styles.TimeBtn}>08:30</button>
                                                <button className={styles.TimeBtn}>08:30</button>
                                                <button className={styles.TimeBtn}>08:30</button>
                                                <button className={styles.TimeBtn}>08:30</button>
                                                <button className={styles.TimeBtn}>08:30</button>
                                            </div>
                                        </div>

                                    </div>

                                    <div className={styles.orderfromserviceMainDoctor}>

                                        <div className="col-6 d-flex align-items-center">
                                            <p className={styles.orderfromserviceMainDoctorImg}>
                                                <img src="/images/image 80.svg" alt=""/>
                                            </p>
                                            <div className={'d-flex flex-column justify-content-center'}>
                                                <p className={styles.orderfromserviceMainDoctorName}>Адилов Шохрух Шукурулла огли</p>
                                                <span className={styles.orderfromserviceMainDoctorDirection}>Невролог</span>
                                                <span className={styles.orderfromserviceMainDoctorLvl}>Стаж 10 лет</span>
                                            </div>
                                        </div>

                                        <div className="col-6">
                                            <p className={styles.TimeTitle}>Выберите время записи</p>
                                            <div className={styles.TimeBtnContainer}>
                                                <button className={styles.TimeBtn}>08:30</button>
                                                <button className={styles.TimeBtn}>08:30</button>
                                                <button className={styles.TimeBtn}>08:30</button>
                                                <button className={styles.TimeBtn}>08:30</button>
                                                <button className={styles.TimeBtn}>08:30</button>
                                                <button className={styles.TimeBtn}>08:30</button>

                                                <button className={styles.TimeBtn}>08:30</button>
                                                <button className={styles.TimeBtn}>08:30</button>
                                                <button className={styles.TimeBtn}>08:30</button>
                                                <button className={styles.TimeBtn}>08:30</button>
                                                <button className={styles.TimeBtn}>08:30</button>
                                                <button className={styles.TimeBtn}>08:30</button>
                                            </div>
                                        </div>

                                    </div>

                                </div>
                            </TabPanel>
                            <TabPanel value={value} index={1}>
                                Item Two
                            </TabPanel>
                            <TabPanel value={value} index={2}>
                                Item Three
                            </TabPanel>
                        </div>

                    </div>
                </div>
            </section>
        </div>


    )
}
