import useTranslation from 'next-translate/useTranslation'
import Link from 'next/link'
import {useRouter} from 'next/router'
import styles from './ServicesHeader.module.scss'
import {Container, Form, FormControl, Nav, Navbar} from "react-bootstrap";
import {Button} from "@mui/material";
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import {useEffect, useState} from "react";
import httpClient from "../../../services/httpClient";
import IconGenerator from "../IconGenerator/IconGenerator";


export function ServicesHeader(services) {

    const [value, setValue] = React.useState(0);
    const [filters, setFilters] = useState({});
    const [filtered, setFiltered] = useState({});

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const filterChangeHandler = (e) => {
        setFilters(prev => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    }

    useEffect(() => {
        const data = {
            name: filters['product-search'],
            age_category: filters['age_category']
        }
        httpClient.post('object/get-list/specialities', {data})
            .then(res => setFiltered(res.data.response))
    }, [filters])

    const serviceObj = services.services.services.data.response

    function sampleServices() {
        return (

            <div className="d-flex justify-content-between">
                <div className={styles.MainDirectionsItems}>

                    {
                        serviceObj?.map((direction, index) => (
                            <div className={styles.MainDirectionsContainer} key={direction.id}>
                                <Link href={`/services/${direction.guid}`}>
                                    <a>
                            <span className={styles.MainDirectionsItem}>
                                <span className={styles.itemImage}>
                                    <IconGenerator icon={direction.icon}/>
                                </span>
                                <span className={styles.itemInfo}>
                                    <span className={styles.itemInfoT}>{direction.name}</span>
                                    <span className={styles.itemInfoB} dangerouslySetInnerHTML={{__html: direction.description}}/>
                                </span>
                            </span>
                                    </a>
                                </Link>
                            </div>
                        ))
                    }


                </div>
            </div>
        )
    }

    function filteredServices() {

        return (

            <div className={'d-flex flex-column w-100'}>
                <h4>Результаты вашего поиска</h4>
                {filtered[0]?.name ? [] : <h5 className={'w-100'}>По запросу ничего не найдено!</h5>}

                {/*<div className="d-grid gap-24 w-100">


                    {filtered?.map((filteredItem, index) => (
                        <Link href={`/services/${filteredItem.guid}`} key={filteredItem.id}>
                            <a className={styles.ServiceItemLinks}>
                                <div className={styles.ServiceItem}>
                                    <img src="/images/serviceitem.svg" alt=""/>
                                    <div className={styles.ServiceItemInfo}>
                                        <h4>{filteredItem.name}</h4>
                                        <p dangerouslySetInnerHTML={{__html: filteredItem.description}}/>
                                    </div>
                                </div>
                            </a>
                        </Link>
                    ))}
                </div>*/}

                <div className={styles.MainDirectionsItems}>

                    {
                        filtered?.map((direction, index) => (
                            <div className={styles.MainDirectionsContainer} key={direction.id}>
                                <Link href={`/services/${direction.guid}`}>
                                    <a>
                            <span className={styles.MainDirectionsItem}>
                                <span className={styles.itemImage}>
                                    <IconGenerator icon={direction.icon}/>
                                </span>
                                <span className={styles.itemInfo}>
                                    <span className={styles.itemInfoT}>{direction.name}</span>
                                    <span className={styles.itemInfoB} dangerouslySetInnerHTML={{__html: direction.description}}/>
                                </span>
                            </span>
                                    </a>
                                </Link>
                            </div>
                        ))
                    }


                </div>
            </div>

        )
    }

    return (
        <Navbar bg="white" className={`${styles.navbars}, d-flex flex-column align-items-start`}>
            <div className={styles.navbarContainer}>
                <Container container-lg className={styles.awdafrf}>
                    <div className="d-flex flex-column">
                        <h3>Направления клиники</h3>

                        <div className="d-flex serviceMobileHeader">
                            <div className={styles.inputwrap}>
                                <img src="/images/search.svg" alt=""/>
                                <label
                                    htmlFor="productsearch"
                                    id={styles.inputlabel}
                                >
                                    Product Search
                                </label>
                                <input
                                    // onChange={handleInput}
                                    type="text"
                                    onChange={filterChangeHandler}
                                    name="product-search"
                                    id={styles.productsearch}
                                    placeholder="Поиск по названию направления"
                                />
                            </div>

                            <div className={styles.tabs}>
                                <h4>Категория:</h4>
                                <div className={styles.ageCategory}>
                                    <div>
                                        <input type="radio" id="a25" name="age_category" value='all' onChange={filterChangeHandler}/>
                                        <label htmlFor="a25">Все</label>
                                    </div>

                                    <div>
                                        <input type="radio" id="a25" name="age_category" value='adult' onChange={filterChangeHandler}/>
                                        <label htmlFor="a25">Взрослые</label>
                                    </div>

                                    <div>
                                        <input type="radio" id="a50" name="age_category" value='kid' onChange={filterChangeHandler}/>
                                        <label htmlFor="a50">Дети</label>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </Container>
                <section className={styles.ServiceItems}>
                    <div className="container-lg">
                        <div className={styles.ServiceItemsContainer}>


                            {(filters['product-search'] || filters['age_category']) ? filteredServices() : sampleServices()}


                        </div>
                    </div>
                </section>
            </div>
        </Navbar>


    )
}