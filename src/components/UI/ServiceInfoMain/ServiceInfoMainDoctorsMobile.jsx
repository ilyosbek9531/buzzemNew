import {Swiper, SwiperSlide} from 'swiper/react';
import styles from './ServiceInfoMain.module.scss'
import 'swiper/css';
import Link from "next/link";
import {Autoplay, Navigation} from "swiper";

export function ServiceInfoMainDoctorsMobile(services) {

    // const serviceInfo = services?.services?.services?.specialities[0]
    const serviceDoctors = services?.services?.services?.doctors
    // const servicesItems = services?.services?.services?.services

    return (
        <div className={`container-lg ServiceInfoMainDoctorsMobile ${styles.ServiceInfoMainDoctorsMobile}`} style={{backgroundColor: "#F9F9F9"}}>
            <h3>Врачи</h3>
            <Swiper
                spaceBetween={50}
                onSlideChange={() => console.log('slide change')}
                onSwiper={(swiper) => console.log(swiper)}
                breakpoints={
                    {
                        800: {
                            slidesPerView: 3,
                        },
                        500: {
                            slidesPerView: 2,
                            spaceBetween: 20
                        },
                        0: {
                            slidesPerView: 1,
                            spaceBetween: 15
                        },
                    }
                }
            >
                {
                    serviceDoctors?.map((doctors, index) => (
                        <SwiperSlide key={index}>
                            <Link href={`/doctors/${doctors.guid}`}>
                                <a className={styles.MainSpecialistsItem}>
                                    <div className={'d-flex flex-column align-items-center'}>
                                        <img style={{width: "170px"}} src={doctors.passport_photo} alt=""/>
                                        <div className={`${styles.MainSpecialistsItemInfo} w-100`}>
                                            <p className={styles.ServiceInfoMainDoctorsMobileInfoF}>{doctors.FIO}</p>
                                            <p className={styles.ServiceInfoMainDoctorsMobileInfoS}>{doctors.specialities.name}</p>
                                            <p className={styles.ServiceInfoMainDoctorsMobileInfoT}>Стаж {doctors.experience} года</p>
                                        </div>
                                    </div>
                                </a>
                            </Link>
                        </SwiperSlide>
                    ))
                }


            </Swiper>
        </div>
    )
}