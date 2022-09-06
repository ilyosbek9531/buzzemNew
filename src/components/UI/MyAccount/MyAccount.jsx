import {Container} from '@mui/material'
import useTranslation from 'next-translate/useTranslation'
import styles from './MyAccount.module.scss'
import Link from "next/link";
import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import TabB from "react-bootstrap/Tab";
import Col from "react-bootstrap/Col";
import {Nav} from "react-bootstrap";
import {Myprofile} from "./myprofile";
import {Myvisits} from "./myvisits";
import Myresult from "./myresults";
import {Mybudget} from "./mybudget";
import {useState} from "react";

export function MyAccount() {
    const [typeInfo, setTypeInfo] = useState(1)

    return (
        <section className={styles.ServiceItems}>
            <div className="container-lg d-flex">
                <Col sm={3}>
                    <Nav variant="pills" className={`${styles.PricesLeft} flex-column`}>
                        <Nav.Item>
                            <button className={`nav-link ${typeInfo == 1 ? 'active' : ''}`} onClick={() => setTypeInfo(1)}>
                                <img src="/images/lichdannie.svg" alt=""/>
                                <span>Личные данные</span>
                            </button>
                        </Nav.Item>

                        <Nav.Item>
                            <button className={`nav-link ${typeInfo == 2 ? 'active' : ''}`} onClick={() => setTypeInfo(2)}>
                                <img src="/images/myvisits.svg" alt=""/>
                                <span>Мои приёмы</span>
                            </button>
                        </Nav.Item>

                        <Nav.Item>
                            <button className={`nav-link ${typeInfo == 3 ? 'active' : ''}`} onClick={() => setTypeInfo(3)}>
                                <img src="/images/results.svg" alt=""/>
                                <span>Результаты</span>
                            </button>
                        </Nav.Item>

                        <Nav.Item>
                            <button className={`nav-link ${typeInfo == 4 ? 'active' : ''}`} onClick={() => setTypeInfo(4)}>
                                <img src="/images/budget.svg" alt=""/>
                                <span>Кошелёк</span>
                            </button>
                        </Nav.Item>
                    </Nav>
                </Col>

                <Col sm={9}>
                    <div>
                        <div>
                            <div className={styles.PricesRightItems}>
                                {
                                    typeInfo == 1 ? <Myprofile/> : null
                                }

                                {
                                    typeInfo == 2 ? <Myvisits/> : null
                                }

                                {

                                    typeInfo == 3 ? <Myresult/> : null
                                }

                                {

                                    typeInfo == 4 ? <Mybudget/> : null
                                }
                            </div>
                        </div>
                    </div>
                </Col>
            </div>
        </section>
    )
}
