import Link from 'next/link'
import styles from './OrderMain.module.scss'
import React, {useEffect, useMemo, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import httpClient from "../../../services/httpClient";
import {appointmentActions} from "../../../store/appointment/appointment.slice";
import CheckIcon from "@mui/icons-material/Check";
import AccordionSummary from "@mui/material/AccordionSummary";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Typography from "@mui/material/Typography";
import AccordionDetails from "@mui/material/AccordionDetails";
import DoneIcon from "@mui/icons-material/Done";
import Accordion from "@mui/material/Accordion";
import {add} from "date-fns";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import Spinner from "react-bootstrap/Spinner";
import IconGenerator from "../IconGenerator/IconGenerator";

export function OrderSecondStep() {
    const [services, setServices] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [selectedSpecialities, setSelectedSpecialities] = useState([])
    const currentStep = useSelector(state => state.appointment.currentStep)
    const currentCategory = useSelector(state => state.appointment.stepsData[1].category.cat_guid)
    const dispatch = useDispatch()

    console.log(selectedSpecialities)

    useEffect(() => {
        setIsLoading(true)
        httpClient.post('object/get-list/services', {data: {"categories_id": currentCategory}})
            .then(res => setServicesItems(res.data.response))
    }, [])

    function setServicesItems(res) {
        setServices(res)
        setIsLoading(false)
    }

    const specialList = useMemo(() => {

        let result = {}
        services.forEach((service) => {
            if (result[service.specialities_id]) {
                result[service.specialities_id].services.push(service)
            } else {
                result[service.specialities_id] = {
                    ...service.specialities,
                    services: [service]
                }
            }
        })

        return Object.values(result)
    }, [services])


    const onSecondStepClick = (service) => {
        dispatch(appointmentActions.setStepData({stepNumber: 2, data: {selectedSpecialities}}))
        dispatch(appointmentActions.setCurrentStep(currentStep + 1))
    }

    console.log(selectedSpecialities)

    return (
        <>
            <div style={{borderBottom: '1px solid #EDEDED'}}>
                <div className={'container-lg'}>
                    <div className={styles.OrderSecondStep}>
                        <h3>Выберите тип консультации</h3>

                        <div className={'d-flex justify-content-between'}>
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

                            <div className="col-6 d-flex justify-content-end align-items-end">
                                <button onClick={() => onSecondStepClick()} disabled={!selectedSpecialities[0]?.name}
                                        className={styles.linkcontinue}>Продолжить <ChevronRightIcon/></button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className={styles.orderSecondStepBody}>
                <div className="container-lg">

                    {
                        isLoading ?
                            (
                                <Spinner animation="border" role="status">
                                    <span className="visually-hidden">Loading...</span>
                                </Spinner>
                            )
                            :
                                specialList?.map((speciality) => (
                                <Accordion key={speciality.guid}>
                                    <AccordionSummary
                                        expandIcon={<ExpandMoreIcon/>}
                                        aria-controls="panel2a-content"
                                        id="panel2a-header"
                                    >
                                        <Typography>{speciality.name}</Typography>
                                    </AccordionSummary>
                                    <AccordionDetails>


                                        {
                                            speciality.services.map((service) => (
                                                <button key={service.guid} className={styles.PricesRightItem}>
                                                    <p className={'col-8'}>{service.name}</p>
                                                    <div className="d-flex align-items-center justify-content-end col-4">
                                                        <span>{service.price} сум</span>

                                                        {
                                                            selectedSpecialities.find(item => item.guid === service.guid) ?
                                                                <button className={styles.selected}><DoneIcon/></button> :
                                                                <button
                                                                    onClick={() => setSelectedSpecialities(prev => [service])}>Добавить</button>
                                                        }

                                                    </div>
                                                </button>
                                            ))
                                        }


                                    </AccordionDetails>
                                </Accordion>
                            ))
                    }





                    {/*{
                        services.map(service => (
                            <div className={styles.PricesRightItem} key={service.id}>
                                <p className={'col-8'}>{service.name}</p>
                                <div className="d-flex align-items-center justify-content-end col-4">
                                    <span>{service.price} сум</span>
                                    <button onClick={() => onSecondStepClick(service)}>Записаться</button>
                                </div>
                            </div>
                        ))
                    }*/}
                </div>
            </div>
        </>
    )
}
