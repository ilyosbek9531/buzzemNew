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
import {useEffect, useState} from "react";
import httpClient from "../../../services/httpClient";
import {LazyLoadImage} from "react-lazy-load-image-component";

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

export function Doctors(specialities) {
    const [value, setValue] = React.useState(0);
    const [filters, setFilters] = useState({});
    const [specialitiesC] = useState(specialities.specialities)
    const [direction, setDirection] = useState()
    const [branch, setBranch] = useState()
    const [filteredItemsDirection, setfilteredItemsDirection] = useState({})

    useEffect(() => {
        httpClient.post('object/get-list/specialities', {data: {/*limit: 4, offset: 0*/}})
            .then(res => setDirection(res.data.response))
    }, [])

    useEffect(() => {
        httpClient.post('object/get-list/branches', {data: {/*limit: 4, offset: 0*/}})
            .then(res => setBranch(res.data.response))
    }, [])

    useEffect(() => {
        const data = {
            specialities_id: filters['directions-search'],
            branches_id: filters['branch-search'],
            FIO: filters['product-search'],
            gender: filters['gender'],
            age_category: filters['ageCat']
        }

        httpClient.post('object/get-list/doctors', {data})
            .then(res => setfilteredItemsDirection(res.data.response))
    }, [filters])

    const filterChangeHandler = (e) => {
        setFilters(prev => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    }

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    function clearInputs() {
        if (filters['product-search'] || filters['directions-search'] || filters['branch-search'] || filters['ageCat'] || filters['gender']) {
            return (
                <button onClick={() => setFilters({})} className={styles.clearBtn}>
                    <ClearIcon/>
                    Очистить фильтр
                </button>
            )
        }
    }

    function sampleDoctors() {
        return (
            <div>

                {
                    specialitiesC?.map((speciality, index) => (
                        <div key={speciality.id}>
                            <h4>{speciality.name}</h4>
                            <div className={styles.MainSpecialistsItems}>
                                {
                                    speciality.doctors.map((doctor, index) => (
                                        <Link href={`doctors/${doctor.guid}`} key={doctor.id}>
                                            <a className={styles.MainSpecialistsItem}>
                                                <div>
                                                    {/*<img src={doctor.passport_photo} alt=""/>*/}
                                                    <LazyLoadImage
                                                        alt={''}
                                                        effect="blur"
                                                        src={doctor.passport_photo} // use normal <img> attributes as props
                                                        width={'100%'} />
                                                    <div className={styles.MainSpecialistsItemInfo}>
                                                        <p>{doctor.FIO}</p>
                                                        <p>{doctor.specialities.name}</p>
                                                        <p>Стаж {doctor.experience} года</p>
                                                    </div>
                                                </div>
                                            </a>
                                        </Link>
                                    ))
                                }
                            </div>
                        </div>
                    ))
                }

            </div>
        )
    }

    function filteredDoctors() {

        return (
            <div>
                <h4>Результаты вашего поиска</h4>
                {filteredItemsDirection[0]?.FIO ? [] : <h5 className={'w-100'}>По запросу ничего не найдено!</h5>}
                <div className={styles.MainSpecialistsItems}>
                    {
                        filteredItemsDirection.map((doctor, index) => (
                            <Link href={`doctors/${doctor.guid}`} key={doctor.id}>
                                <a className={styles.MainSpecialistsItem}>
                                    <div>
                                        {/*<img src={doctor.passport_photo} alt=""/>*/}
                                        <LazyLoadImage
                                            alt={''}
                                            effect="blur"
                                            src={doctor.passport_photo} // use normal <img> attributes as props
                                            width={'100%'} />
                                        <div className={styles.MainSpecialistsItemInfo}>
                                            <p>{doctor.FIO}</p>
                                            <p>{doctor.specialities.name}</p>
                                            <p>Стаж {doctor.experience} года</p>
                                        </div>
                                    </div>
                                </a>
                            </Link>
                        ))
                    }
                </div>
            </div>
        )
    }

    // console.log('FILTERS ==>', filters)

    return (
        <div>
            <section className={styles.DoctorsHeader}>
                <div className="container-lg">
                    <h3>Специалисты</h3>

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
                                        value={filters['product-search'] ?? ''}
                                        onChange={filterChangeHandler}
                                        type="text"
                                        name="product-search"
                                        id={styles.productsearch}
                                        placeholder="Поиск по ФИО врача"
                                    />
                                </div>

                                <Form.Group className={'flex-1'}>
                                    <Form.Select value={filters['directions-search'] ?? ''}
                                                 onChange={filterChangeHandler}
                                                 name="directions-search"
                                                 className={styles.headerInputs}>
                                        <option value={''}>Направление врача</option>
                                        {
                                            direction?.map((directions, index) => (
                                                <option key={directions.id} value={directions.guid}>{directions.name}</option>
                                            ))
                                        }
                                    </Form.Select>
                                </Form.Group>

                                <Form.Group className={'flex-1'}>
                                    <Form.Select
                                        value={filters['branch-search'] ?? ''}
                                        onChange={filterChangeHandler}
                                        name="branch-search"
                                        className={styles.headerInputs}>

                                        <option value={''}>Филиал</option>
                                        {
                                            branch?.map((branches, index) => (
                                                <option key={branches.id} value={branches.guid}>{branches.address}</option>
                                            ))
                                        }
                                    </Form.Select>
                                </Form.Group>

                                <Form.Group className={'flex-1'}>
                                    <Form.Select
                                        value={filters['gender'] ?? ''}
                                        onChange={filterChangeHandler}
                                        name="gender"
                                        className={styles.headerInputs}>

                                        <option value={''}>Пол врача</option>
                                        <option value={'Женщина'}>Женщина</option>
                                        <option value={'Мужчина'}>Мужчина</option>
                                    </Form.Select>
                                </Form.Group>

                                <Form.Group className={'flex-1'}>
                                    <Form.Select
                                        value={filters['ageCat'] ?? ''}
                                        onChange={filterChangeHandler}
                                        name="ageCat"
                                        className={styles.headerInputs}>

                                        <option value={''}>Для всех</option>
                                        <option value={'adult'}>Для взрослых</option>
                                        <option value={'kid'}>Для детей</option>

                                    </Form.Select>
                                </Form.Group>

                            </div>
                            {clearInputs()}
                        </form>
                    </div>
                </div>

            </section>

            <section className={styles.DoctorsInfoItems}>
                <div className="container-lg">
                    {(filters['product-search'] || filters['directions-search'] || filters['branch-search'] || filters['ageCat'] || filters['gender']) ? filteredDoctors() : sampleDoctors()}
                </div>
            </section>
        </div>
    )
}