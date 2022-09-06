import {Container} from '@mui/material'
import Link from 'next/link'
import styles from './OrderMain.module.scss'
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import React, {useEffect, useState} from "react";
import Button from "react-bootstrap";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import InputMask from "react-input-mask";
import httpClient from "../../../services/httpClient";
import SVG from "react-inlinesvg";
import IconGenerator from "../IconGenerator/IconGenerator";
import {appointmentActions} from "../../../store/appointment/appointment.slice";
import {useDispatch, useSelector} from "react-redux";
import {current} from "@reduxjs/toolkit";
import Spinner from "react-bootstrap/Spinner";

export function OrderFirstStep() {
    const [cats, setCats] = useState([])
    const currentStep = useSelector(state => state.appointment.currentStep)
    const dispatch = useDispatch()
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        setIsLoading(true)
        httpClient.post('object/get-list/categories', {data: {/*limit: 2, offset: 0*/}})
            .then(res => setCategories(res.data.response))
    }, [])

    function setCategories(res) {
        setCats(res)
        setIsLoading(false)
    }

    const onFirstStepClick = (category) => {
        console.log('firstStep', cats)
        dispatch(appointmentActions.setStepData({stepNumber: 1, data: {category}}))
        dispatch(appointmentActions.setCurrentStep(currentStep + 1))
    }

    return (
        <>
            <div className={styles.orderFirstStep}>
                <div className="container-lg">
                    <h3>Выберите тип услуги</h3>

                    <div className={styles.orderFirstStepItems}>

                        {
                            isLoading ?
                                (
                                    <Spinner animation="border" role="status">
                                        <span className="visually-hidden">Loading...</span>
                                    </Spinner>
                                )
                                : cats?.map((cat, index) => (
                                    <button className={styles.orderFirstStepItem} key={cat.id}
                                            onClick={() => onFirstStepClick({'cat_guid': `${cat.guid}`, 'cat_type': cat.type_service})}>
                                        <p>{cat.name}</p>
                                        <span>{cat.description}</span>
                                        <div>
                                            <IconGenerator icon={cat.icon}/>
                                        </div>
                                    </button>
                                ))
                        }


                    </div>
                </div>
            </div>
        </>
    )
}
