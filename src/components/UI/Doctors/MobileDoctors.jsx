import styles from './Doctors.module.scss'
import * as React from 'react';
import Form from 'react-bootstrap/Form';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Link from "next/link";
import ClearIcon from '@mui/icons-material/Clear';
import {useEffect, useRef, useState} from "react";
import {Content, detents, Header, Portal, Sheet} from "react-sheet-slide";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import InputMask from "react-input-mask";
import Button from "react-bootstrap/Button";
import {Swiper, SwiperSlide} from 'swiper/react';
import 'swiper/css';
import httpClient from "../../../services/httpClient";

export function MobileDoctors(specialities) {
    const [filters, setFilters] = useState({})
    const [open, setOpen] = useState(false)
    const ref = useRef()
    const [specialitiesC] = useState(specialities.specialities)
    // const [direction, setDirection] = useState()
    const [catFilter, setCatFilter] = useState({})
    const [FilteredItemsDirection, setfilteredItemsDirection] = useState([])
    const [filteredDoctors, setfilteredDoctors] = useState([])


    const filterChangeHandler = (e) => {
        setFilters(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }))
    }

    const filterChangeHandlerCategories = (e) => {
        setCatFilter(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }))
    }

    const handleChange = (newValue) => {
        setOpen(false)
        setFilters(prev => ({
            ...prev,
            ['categoriya']: newValue
        }));
    };

    function clearInputs() {
        if (filters['FIO'] || filters['categoriya']) {
            return (
                <button onClick={() => setFilters({})} className={styles.clearBtn}>
                    <ClearIcon/>
                    Очистить фильтр
                </button>
            )
        }
    }

    function clearFilter() {
        return (
            <button onClick={() => setFilters({})} className={styles.clearBtn}>
                Очистить
            </button>
        )
    }

    function sampleDoctorsItems() {
        return (
            <div>
                {
                    specialitiesC?.map((speciality, index) => (
                        <div key={speciality.id}>
                            <h4>{speciality.name}</h4>
                            <div className={`${styles.MainSpecialistsItemsForMobile} MainSpecialistsItemsForMobile`}>

                                <Swiper key={index}
                                        spaceBetween={16}
                                        onSlideChange={() => console.log('slide change')}
                                        onSwiper={(swiper) => console.log(swiper)}
                                        breakpoints={
                                            {
                                                800: {
                                                    slidesPerView: 3,
                                                },
                                                350: {
                                                    slidesPerView: 2.2,
                                                    spaceBetween: 20
                                                },
                                                0: {
                                                    slidesPerView: 1.2,
                                                    spaceBetween: 15
                                                },
                                            }
                                        }
                                >
                                    {
                                        speciality.doctors.map((doctor, index) => (
                                            <SwiperSlide key={index}>
                                                <Link href={`doctors/${doctor.guid}`}>
                                                    <a className={styles.MainSpecialistsItem}>
                                                        <div className={styles.awdawdrbg}>
                                                            <img src={doctor.passport_photo} alt=""/>
                                                            <div className={styles.MainSpecialistsItemInfo}>
                                                                <p>{doctor.FIO}</p>
                                                                <p>{doctor.specialities.name}</p>
                                                                <p>Стаж {doctor.experience} года</p>
                                                            </div>
                                                        </div>
                                                    </a>
                                                </Link>
                                            </SwiperSlide>
                                        ))
                                    }
                                </Swiper>
                            </div>
                        </div>
                    ))
                }
            </div>
        )
    }

    console.log(filteredDoctors)

    function filteredDoctorsItems() {
        return (
            <div>
                <div>
                    <h4>Результаты поиска</h4>
                    {filteredDoctors[0]?.FIO ? [] : <h5 className={'w-100'}>По запросу ничего не найдено!</h5>}
                    <div className={`${styles.MainSpecialistsItemsForMobile} MainSpecialistsItemsForMobile`}>

                        <Swiper
                            spaceBetween={16}
                            onSlideChange={() => console.log('slide change')}
                            onSwiper={(swiper) => console.log(swiper)}
                            breakpoints={
                                {
                                    800: {
                                        slidesPerView: 3,
                                    },
                                    350: {
                                        slidesPerView: 2.2,
                                        spaceBetween: 20
                                    },
                                    0: {
                                        slidesPerView: 1.2,
                                        spaceBetween: 15
                                    },
                                }
                            }
                        >
                            {
                                filteredDoctors.map((doctor, index) => (
                                    <SwiperSlide key={index}>
                                        <Link href={`doctors/${doctor.guid}`}>
                                            <a className={styles.MainSpecialistsItem}>
                                                <div className={styles.awdawdrbg}>
                                                    <img src={doctor.passport_photo} alt=""/>
                                                    <div className={styles.MainSpecialistsItemInfo}>
                                                        <p>{doctor.FIO}</p>
                                                        <p>{doctor.specialities.name}</p>
                                                        <p>Стаж {doctor.experience} года</p>
                                                    </div>
                                                </div>
                                            </a>
                                        </Link>
                                    </SwiperSlide>
                                ))
                            }
                        </Swiper>
                    </div>
                </div>
            </div>
        )
    }

    useEffect(() => {

        const data = {
            FIO: filters['FIO'],
            specialities_id: filters['categoriya']
        }

        httpClient.post('object/get-list/doctors', {data})
            .then(res => setfilteredDoctors(res.data.response))
    }, [filters])

    console.log(filters)

    useEffect(() => {
        const data = {
            name: catFilter['directions'],
        }

        httpClient.post('object/get-list/specialities', {data})
            .then(res => setfilteredItemsDirection(res.data.response))
    }, [catFilter])

    return (
        <div>
            <section className={styles.DoctorsHeader}>
                <div className="container-lg">
                    <h3>Направления клиники</h3>

                    <div className="">
                        <form id="searchForm">
                            <div className="d-flex flex-wrap gap-12">
                                <div className={`${styles.inputwrap} flex-1`}>
                                    <img src="/images/search.svg" alt=""/>
                                    <label
                                        htmlFor="productsearch"
                                        id={styles.inputlabel}
                                    >
                                        Product Search
                                    </label>
                                    <input
                                        // onChange={handleInput}
                                        value={filters['FIO'] ?? ''}
                                        onChange={filterChangeHandler}
                                        type="text"
                                        name="FIO"
                                        id={styles.productsearch}
                                        placeholder="Поиск по ФИО врача"
                                    />
                                </div>

                                <button type="button" className={styles.filterBtn} onClick={() => setOpen(true)}>
                                    <img src="/images/options.svg" alt=""/>
                                </button>

                                <Portal>
                                    <Sheet
                                        ref={ref}
                                        open={open}
                                        onDismiss={() => setOpen(false)}
                                        onClose={() => {
                                            console.log('Component unmounted')
                                        }}
                                        selectedDetent={detents.large}
                                        detents={props => {
                                            return [
                                                detents.large({
                                                    ...props,
                                                    minHeight: 529,
                                                    maxHeight: 590
                                                }),
                                                detents.fit(props)
                                            ]
                                        }}
                                        useDarkMode={false}
                                        useModal={false}
                                        scrollingExpands={true}
                                    >
                                        <Header>
                                            <div className={styles.fixedBtnHeader}>
                                                <button type="button" onClick={() => setOpen(false)}>
                                                    <KeyboardArrowLeftIcon/>
                                                    Назад
                                                </button>

                                                <h5>Сообщение</h5>

                                                {clearFilter()}
                                            </div>
                                        </Header>
                                        <Content>
                                            <div className={styles.fixedBtnBody}>
                                                <div className={`${styles.inputwrap} flex-1`}>
                                                    <img src="/images/search.svg" alt=""/>
                                                    <label
                                                        htmlFor="productsearch"
                                                        id={styles.inputlabel}
                                                    >
                                                        Product Search
                                                    </label>
                                                    <input
                                                        // onChange={handleInput}
                                                        value={catFilter['directions'] ?? ''}
                                                        onChange={filterChangeHandlerCategories}
                                                        type="text"
                                                        name="directions"
                                                        id={styles.productsearch}
                                                        placeholder="Поиск направления"
                                                    />
                                                </div>

                                                <div className={`d-flex flex-column ${styles.MobileFixedBodyItems}`}>

                                                    {/*{
                                                        direction?.map((directions, index) => (
                                                            <button key={index} onClick={() => handleChange(directions.guid)}>
                                                                {directions.name}
                                                            </button>
                                                        ))
                                                    }*/}

                                                    {
                                                        FilteredItemsDirection?.map((filteredCats, index) => (
                                                            <button key={index} onClick={() => handleChange(filteredCats.guid)}>
                                                                {filteredCats.name}
                                                            </button>
                                                        ))
                                                    }

                                                </div>
                                            </div>

                                        </Content>
                                    </Sheet>
                                </Portal>
                            </div>
                            {clearInputs()}
                        </form>
                    </div>
                </div>

            </section>

            <section className={styles.DoctorsInfoItems}>
                <div className="container-lg">

                    {(filters['categoriya'] || filters['FIO']) ? filteredDoctorsItems() : sampleDoctorsItems()}

                </div>
            </section>
        </div>
    )
}