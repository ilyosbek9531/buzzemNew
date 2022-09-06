import useTranslation from 'next-translate/useTranslation'
import Link from 'next/link'
import {useRouter} from 'next/router'
import styles from './ServiceInfoMain.module.scss'
import {Form, FormControl} from "react-bootstrap";
import {Button} from "@mui/material";
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Scrollspy from 'react-scrollspy'
import {MobileMainAdress} from "../MainAdress/MobileMainAdress";
import {MainAdress} from "../MainAdress/MainAdress";
import {useIsMobile} from "../../../hooks/useIsMobile";
import {ServiceInfoMainDoctorsMobile} from "./ServiceInfoMainDoctorsMobile";
import {MobileServiceFixedBtn} from "../FixedButtonHelp/MobileServiceFixedBtn";
import {FixedButtonHelp} from "../FixedButtonHelp/FixedButtonHelp";
import {LazyLoadImage} from "react-lazy-load-image-component";
import * as React from "react";

export function ServiceInfoMain(services) {
    const isMobile = useIsMobile()

    const serviceInfo = services?.services?.specialities[0]
    const serviceDoctors = services?.services?.doctors
    const servicesItems = services?.services?.services

    return (
        <main style={{backgroundColor: "#F9F9F9"}}>
            {isMobile ? <MobileServiceFixedBtn serviceInfo={serviceInfo}/> : <FixedButtonHelp/>}
            <section className={styles.ServiceInfoMain}>
                <Navbar bg="white" expand="lg" className="p-0">
                    <div className={'container-lg'}>
                        <div id="basic-navbar-nav">
                            <Nav className="me-auto">
                                <Scrollspy
                                    items={['ServiceInfoMainItems', 'ServiceInfoMainSpecialists', 'ServiceInfoMainPrice']}
                                    currentClassName="active">
                                    <li className={'serviceinfolilink'}>
                                        <Nav.Link href={'#ServiceInfoMainItems'} className={`${styles.navlink}`}>Общая информация</Nav.Link>
                                    </li>
                                    <li className={'serviceinfolilink'}>
                                        <Nav.Link href={'#ServiceInfoMainSpecialists'} className={styles.navlink}><p>Врач и персонал</p> <span>Врачи</span></Nav.Link>
                                    </li>
                                    <li className={'serviceinfolilink'}>
                                        <Nav.Link href={'#ServiceInfoMainPrice'} className={styles.navlink}><p>Услуги / Стоимость услуг</p> <span>Услуги</span></Nav.Link>
                                    </li>
                                </Scrollspy>
                            </Nav>
                        </div>
                    </div>
                </Navbar>
            </section>

            <section className={styles.ServiceInfoMainItems} id="ServiceInfoMainItems">
                <div className="container-lg">
                    <h3>Общая информация</h3>

                    <div className={styles.ServiceInfoGeneral}>
                        <div className="col-6">
                            <p dangerouslySetInnerHTML={{ __html: serviceInfo.description}}/>
                        </div>
                    </div>
                </div>
            </section>

            {isMobile ? <ServiceInfoMainDoctorsMobile services={services}/> : <section className={styles.ServiceInfoMainSpecialists} id="ServiceInfoMainSpecialists">
                <div className="container-lg">
                    <div className={styles.ServiceInfoMainSpecialistsTitle}>
                        <h3>Врачи и персонал</h3>
                        <Link href={'/doctors'}>
                            <a>
                                Посмотреть все
                                <ArrowForwardIosIcon/>
                            </a>
                        </Link>
                    </div>

                    <div className={styles.MainSpecialistsItems}>

                        {
                            serviceDoctors?.map((doctors, index) => (
                            <Link href={`/doctors/${doctors.guid}`} key={doctors.id}>
                                <a className={styles.MainSpecialistsItem}>
                                    <div>
                                        {/*<img src={doctors.passport_photo} alt=""/>*/}
                                        <LazyLoadImage
                                            alt={''}
                                            effect="blur"
                                            src={doctors.passport_photo} // use normal <img> attributes as props
                                            width={'100%'} />
                                        <div className={styles.MainSpecialistsItemInfo}>
                                            <p>{doctors.FIO}</p>
                                            <p>{doctors.specialities.name}</p>
                                            <p>Стаж {doctors.experience} года</p>
                                        </div>
                                    </div>
                                </a>
                            </Link>
                        ))}

                    </div>
                </div>
            </section>}

            <section className={styles.ServiceInfoMainPrice} id="ServiceInfoMainPrice">
                <div className="container-lg">
                    <h3>Стоимость услуг</h3>
                    <div className={styles.ServiceInfoMainPriceItems}>

                        {servicesItems?.map((service, index) => (
                            <div key={service.id} className={styles.ServiceInfoMainPriceItem}>
                                <h5>{service.name}</h5>
                                <p>{service.price} сум</p>
                            </div>
                        ))}

                    </div>
                </div>
            </section>
        </main>


    )
}