import useTranslation from 'next-translate/useTranslation'
import Link from 'next/link'
import {useRouter} from 'next/router'
import styles from './Prices.module.scss'
import {Container, Form, FormControl, Nav, Navbar} from "react-bootstrap";
import {Button} from "@mui/material";
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import TabB from 'react-bootstrap/Tab';
import {useEffect, useState} from "react";
import httpClient from "../../../services/httpClient";
import IconGenerator from "../IconGenerator/IconGenerator";

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

export function Prices(services) {
    const [value, setValue] = useState(0);
    const [filters, setFilters] = useState({})
    const [filtered, setFiltered] = useState({})

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
            age_category: filters['age_category'],
            name: filters['product-search']
        }

        httpClient.post('object/get-list/services', {data})
            .then(res => setFiltered(res.data.response))
    }, [filters])

    const ServicesList = services.services.services
    const CategoriesList = services.services.categories
    const ComputedServicesList = services.services.computedServices

    // console.log('servicees==>>>', ServicesList)
    // console.log('categorieess==>>>', CategoriesList)
    // console.log('computedServices==>>>', ComputedServicesList)

    // console.log(filters)
    // console.log(filtered)


    function sampleServices() {
        return (
            <TabB.Container id="left-tabs-example" defaultActiveKey={CategoriesList[0].guid}>

                <Col sm={3}>
                    <Nav variant="pills" className={`${styles.PricesLeft} flex-column`}>

                        {
                            CategoriesList?.map((catlist, index) => (
                                <Nav.Item key={catlist.id}>
                                    <Nav.Link className={'d-flex align-items-center'} eventKey={catlist.guid} href="#">
                                        <IconGenerator icon={catlist.icon}/>
                                        <span className={'ms-2'}>{catlist.name}</span>
                                    </Nav.Link>
                                </Nav.Item>
                            ))
                        }

                    </Nav>
                </Col>

                <Col sm={9}>
                    <TabB.Content>
                        {
                            ComputedServicesList?.map((ComputedServicesLists, index) => (
                                <TabB.Pane eventKey={ComputedServicesLists.guid} key={ComputedServicesLists.id}>
                                    <div className={styles.PricesRightItems}>

                                        {
                                            ComputedServicesLists.services.map((services, index) => (
                                                <div className={styles.PricesRightItem} key={services.id}>
                                                    <p className={'col-8'}>{services.name}</p>
                                                    <div className="d-flex align-items-center justify-content-end col-4">
                                                        <span>{services.price} сум</span>
                                                        <Link href={'/orderfromservice'}>
                                                            <a>Записаться</a>
                                                        </Link>
                                                    </div>
                                                </div>
                                            ))
                                        }

                                    </div>
                                </TabB.Pane>
                            ))
                        }

                    </TabB.Content>
                </Col>
            </TabB.Container>
        )
    }

    function filteredServices() {
        return (
            <div className={'w-100'}>
                <h4>Результаты вашего поиска</h4>
                {filtered[0]?.name ? [] : <h5 className={'w-100'}>По запросу ничего не найдено!</h5>}
                <div className={`${styles.PricesRightItems} p-0`}>

                    {
                        filtered.map((items, index) => (
                            <div className={styles.PricesRightItem} key={items.id}>
                                <p className={'col-8'}>{items.name}</p>
                                <div className="d-flex align-items-center justify-content-end col-4">
                                    <span>{items.price} сум</span>
                                    <Link href={'/orderfromservice'}>
                                        <a>Записаться</a>
                                    </Link>
                                </div>
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
                        <h3>Стоимости услуг</h3>

                        <div className="d-flex">
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
                                    placeholder="Поиск по названию услуги"
                                />
                            </div>

                            <div className={styles.tabs}>
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
                        <TabPanel value={value} index={0}>
                            <div className={styles.ServiceItemsContainer} style={{background: 'none'}}>
                                <div className="d-flex justify-content-between w-100 price-container">
                                    {(filters['product-search'] || filters['age_category']) ? filteredServices() : sampleServices()}
                                </div>
                            </div>
                        </TabPanel>
                    </div>
                </section>
            </div>
        </Navbar>


    )
}