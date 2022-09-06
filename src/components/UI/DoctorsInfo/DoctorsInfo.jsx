import useTranslation from 'next-translate/useTranslation'
import styles from './DoctorsInfo.module.scss'
import CheckIcon from '@mui/icons-material/Check';
import Link from "next/link";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Scrollspy from "react-scrollspy";
import {useIsMobile} from "../../../hooks/useIsMobile";
import {MobileDoctors} from "../Doctors/MobileDoctors";
import {Doctors} from "../Doctors/Doctors";
import {useEffect, useState} from "react";
import httpClient from "../../../services/httpClient";
import {LazyLoadImage} from "react-lazy-load-image-component";
import * as React from "react";

export function DoctorsInfo(doctorInfo) {
    const aboutDoctor = doctorInfo.doctorInfo.doctorInfo.data.response
    const [speciality, setSpeciality] = useState({})
    const [branch, setbranch] = useState({})

    useEffect(() => {
        httpClient.post('object/get-list/specialities', {data: {"guid": `${aboutDoctor.specialities_id}`}})
            .then(res => setSpeciality(res.data.response))
    }, [])

    useEffect(() => {
        httpClient.post('object/get-list/branches', {data: {"guid": `${aboutDoctor.branches_id}`}})
            .then(res => setbranch(res.data.response))
    }, [])

    const {t} = useTranslation('about')
    const isMobile = useIsMobile()
    return (
        <main>
            <section className={`${styles.DoctorsInfo}`}>
                <div className="container-lg d-flex">
                    <div className="col-7 d-flex align-items-center DoctorsInfoLeftContainer">
                        <div className={styles.DoctorsInfoTop}>

                            <div className={styles.DoctorsInfoTop_Left}>
                                {/*<img src={aboutDoctor.passport_photo} alt=""/>*/}
                                <LazyLoadImage
                                    alt={''}
                                    effect="blur"
                                    src={aboutDoctor.passport_photo} // use normal <img> attributes as props
                                    width={'100%'} />
                            </div>

                            <div className={styles.DoctorsInfoTop_Mid}>
                                <h4>{aboutDoctor.FIO}</h4>
                                <span>{speciality[0]?.name}</span>
                                <ul>
                                    <li>
                                        <CheckIcon/>
                                        Принимает {aboutDoctor.age_category == 'adult' ? 'взрослых' : []} {aboutDoctor.age_category == 'kid' ? 'детей' : []} {aboutDoctor.age_category == 'all' ? 'взрослых и детей' : []}
                                    </li>

                                    <li>
                                        <CheckIcon/>
                                        Принимает в {branch[0]?.address}
                                    </li>
                                </ul>
                                <Link href={`/orderfromdoctor/${aboutDoctor.guid}`}>
                                    <a>
                                        Записаться на приём к врачу
                                    </a>
                                </Link>
                            </div>

                        </div>
                    </div>
                    <div className="col-5 DoctorsInfoRightContainer">
                        <div className={styles.DoctorsInfoTop_Right}>
                            <div className={styles.DoctorsInfoTop_RightItem}>
                                <span>{aboutDoctor?.practice_from} год</span>
                                <p>Начало врачебной практики</p>
                            </div>

                            <div className={styles.DoctorsInfoTop_RightItem}>
                                <span>{aboutDoctor?.satisfied_patients}+</span>
                                <p>Довольных пациентов</p>
                            </div>

                            <div className={styles.DoctorsInfoTop_RightItem}>
                                <span>{aboutDoctor?.experience}+</span>
                                <p>Стаж работы</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className={`${styles.DoctorsInfoMobile}`}>
                <div className="container-lg d-flex align-items-center">
                    <div className="col-3" style={{marginRight: '12px'}}>
                        <div className={styles.DoctorsInfoTop}>
                            <div className={styles.DoctorsInfoTop_Left}>
                                {/*<img src={aboutDoctor.passport_photo} alt=""/>*/}
                                <LazyLoadImage
                                    alt={''}
                                    effect="blur"
                                    src={aboutDoctor.passport_photo} // use normal <img> attributes as props
                                    width={'100%'} />
                            </div>
                        </div>
                    </div>

                    <div className="col-9">
                        <div className={styles.DoctorsInfoInfo}>
                            <div>
                                <h5>{aboutDoctor.FIO}</h5>
                                <p>{speciality[0]?.name}</p>
                                <span>Стаж {aboutDoctor?.experience} года</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className={`container-lg ${styles.Doctorsinfopokml}`}>
                    <div className={styles.DoctorsInfoTop_Mid}>
                        <ul>
                            <li>
                                <CheckIcon/>
                                Принимает {aboutDoctor.age_category == 'adult' ? 'взрослых' : []} {aboutDoctor.age_category == 'kid' ? 'детей' : []} {aboutDoctor.age_category == 'all' ? 'взрослых и детей' : []}
                            </li>

                            <li>
                                <CheckIcon/>
                                Принимает в {branch[0]?.address}
                            </li>
                        </ul>
                    </div>
                </div>
            </section>

            <section className={`${styles.ServiceInfoMain} container-lg p-0 border-0`}>
                <Navbar bg="white" className="p-0">

                        <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                        <Navbar.Collapse id="basic-navbar-nav">
                            <Nav className="me-auto">
                                <Scrollspy
                                    items={['ServiceInfoMainItems', 'ServiceInfoMainSpecialists', 'ServiceInfoMainPrice']}
                                    currentClassName="active">
                                    <li className={'serviceinfolilink'}>
                                        <Nav.Link href={'#ServiceInfoMainItems'} className={`${styles.navlink}`}>Опыт работы</Nav.Link>
                                    </li>
                                    <li className={'serviceinfolilink'}>
                                        <Nav.Link href={'#ServiceInfoMainPog'} className={styles.navlink}>Образование</Nav.Link>
                                    </li>
                                    <li className={'serviceinfolilink'}>
                                        <Nav.Link href={'#ServiceInfoMainGuards'} className={styles.navlink}>
                                            {isMobile ? 'Награды' : 'Профессиональные награды'}
                                        </Nav.Link>
                                    </li>
                                </Scrollspy>
                            </Nav>
                        </Navbar.Collapse>
                </Navbar>
            </section>

            <section className={styles.ServiceInfoMainItems} id="ServiceInfoMainItems">
                <div className="container-lg">
                    <h3>Опыт работы</h3>

                    <div className={`${styles.ServiceInfoGeneral} ServiceInfoGeneral`}>
                        <div className="col-6">
                            <p dangerouslySetInnerHTML={{ __html: aboutDoctor?.work_experience_text }}/>
                        </div>
                    </div>
                </div>
            </section>

            <section className={styles.ServiceInfoMainItems} id="ServiceInfoMainPog">
                <div className="container-lg">
                    <h3>Образование</h3>

                    <div className={`${styles.ServiceInfoGeneral} ServiceInfoGeneral`}>
                        <div className="col-6">
                            <p dangerouslySetInnerHTML={{ __html: aboutDoctor?.education }}/>
                        </div>
                    </div>
                </div>
            </section>

            <section className={styles.ServiceInfoMainItems} id="ServiceInfoMainGuards">
                <div className="container-lg">
                    <h3>Профессиональные награды</h3>

                    <div className={`${styles.ServiceInfoGeneral} ServiceInfoGeneral`}>
                        <div className="col-6">
                            <p dangerouslySetInnerHTML={{ __html: aboutDoctor?.professional_awards}}/>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    )
}
