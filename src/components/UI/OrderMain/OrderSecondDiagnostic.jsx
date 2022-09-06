import {Container} from '@mui/material'
import Link from 'next/link'
import styles from './OrderMain.module.scss'
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import React, {useState} from "react";
import Button from "react-bootstrap";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import InputMask from "react-input-mask";
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import DoneIcon from '@mui/icons-material/Done';


export function OrderSecondDiagnostic() {

    return (
        <>
            <div style={{borderBottom: '1px solid #EDEDED'}}>
                <div className={'container-lg'}>
                    <div className={styles.OrderSecondStep}>
                        <h3>Выберите услугу диагностики</h3>

                        <div className={'d-flex'}>
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

                                    name="product-search"
                                    id={styles.productsearch}
                                    placeholder="Поиск по названию обследования"
                                />
                            </div>

                            <div className={styles.tabs}>
                                <h4>Категория:</h4>
                                <div className={styles.ageCategory}>
                                    <div>
                                        <input type="radio" id="a25" name="age_category" value='all'/>
                                        <label htmlFor="a25">Все</label>
                                    </div>

                                    <div>
                                        <input type="radio" id="a25" name="age_category" value='adult'/>
                                        <label htmlFor="a25">Взрослые</label>
                                    </div>

                                    <div>
                                        <input type="radio" id="a50" name="age_category" value='kid'/>
                                        <label htmlFor="a50">Дети</label>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className={styles.orderSecondStepBody}>
                <div className="container-lg">
                    <Accordion>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon/>}
                            aria-controls="panel2a-content"
                            id="panel2a-header"
                        >
                            <Typography>МРТ</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <button className={styles.PricesRightItem}>
                                <p className={'col-8'}>awdfergt</p>
                                <div className="d-flex align-items-center justify-content-end col-4">
                                    <span>56789 сум</span>
                                    <button>Добавить</button>
                                </div>
                            </button>

                            <button className={styles.PricesRightItem}>
                                <p className={'col-8'}>awdfergt</p>
                                <div className="d-flex align-items-center justify-content-end col-4">
                                    <span>56789 сум</span>
                                    <button className={styles.selected}>
                                        <DoneIcon/>
                                    </button>
                                </div>
                            </button>
                        </AccordionDetails>
                    </Accordion>
                </div>
            </div>
        </>
    )
}
