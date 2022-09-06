import Link from 'next/link'
import styles from './Prices.module.scss'
import * as React from 'react';
import Box from "@mui/material/Box";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import {Container, Navbar} from "react-bootstrap";
import Typography from "@mui/material/Typography";
import PropTypes from "prop-types";
import {useEffect, useState} from "react";

function sampleDoctors(priceItems) {
    return (
        <div>

            {
                priceItems?.map((services, index) => (
                    <div className={styles.ListItem} key={index}>
                        <div className="d-flex flex-column">
                            <p>{services.name}</p>
                            <Link href={services.guid}>
                                <a>
                                    Записаться за {services.price} сум
                                </a>
                            </Link>
                        </div>
                    </div>
                ))
            }

        </div>
    )
}



function filteredDoctors(filtered) {

    return (
        <div>
            <h4>Результаты вашего поиска</h4>
            {filtered[0]?.name ? [] : <h5 className={'w-100'}>По запросу ничего не найдено!</h5>}
            <div className={styles.MainSpecialistsItems}>
                {
                    filtered?.map((services, index) => (
                        <div className={styles.ListItem} key={index}>
                            <div className="d-flex flex-column">
                                <p>{services.name}</p>
                                <Link href={services.guid}>
                                    <a>
                                        Записаться за {services.price} сум
                                    </a>
                                </Link>
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}


export function MobilePricesInfo(pricesInfo) {
    const [value, setValue] = React.useState(0);
    const [filters, setFilters] = useState({});
    const [filtered, setFiltered] = useState({});

    const priceItems = pricesInfo.pricesInfo.pricesInfo.data.response

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
        httpClient.post('object/get-list/services', {data})
            .then(res => setFiltered(res.data.response))
    }, [filters])

    console.log(filtered)



    return (
        <Navbar bg="white" className={`${styles.navbars}, d-flex flex-column align-items-start`}>
            <div className={styles.navbarContainer}>
                <div className={`${styles.awdafrf} container-lg`}>
                    <div className="d-flex flex-column">
                        <h3>Стоимости услуг</h3>

                        <h4>Консультация в клинике</h4>
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
                                    onChange={filterChangeHandler}
                                    type="text"
                                    name="product-search"
                                    id={styles.productsearch}
                                    placeholder="Название услуги"
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
                </div>
                <section className={styles.ServiceItems}>
                    <div className="container-lg">
                        <div className={styles.ServiceItemsContainer}>

                            {(filters['product-search'] || filters['age_category']) ? filteredDoctors(filtered) : sampleDoctors(priceItems)}

                        </div>
                    </div>
                </section>
            </div>
        </Navbar>
    )
}

import httpClient from "../../../services/httpClient";
