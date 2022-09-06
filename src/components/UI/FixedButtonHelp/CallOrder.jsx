import styles from './FixedButtonHelp.module.scss'
import Link from 'next/link'
import { Container } from '@mui/material'
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import React, {useEffect, useState} from 'react'
import PhoneInTalkIcon from '@mui/icons-material/PhoneInTalk';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import InputMask from "react-input-mask";
import httpClient from "../../../services/httpClient";
import {useForm} from "react-hook-form";
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';

function MyVerticallyCenteredModal(props) {

    const {register, handleSubmit, formState: { errors } } = useForm()

    const onSubmit = (values) => {
        httpClient.post('object/re_call', {data: values})
            .then(res => console.log(res))
    }


    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>

            </Modal.Header>
            <Modal.Body>
                <h3>Обратный звонок</h3>
                <p>
                    Оставьте свой номер телефона
                    и мы вам перезвоним
                </p>

                <Form onSubmit={handleSubmit(onSubmit)} >
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Номер телефона</Form.Label>
                        <InputMask {...register("phone_number", {required: true, minLength: 9})} mask="(99) 999-99-99" placeholder="Введите номер телефона"/>
                        {errors.phone_number && <span className={'fieldError d-flex align-items-center mt-3'}><ErrorOutlineIcon className={'me-2'}/> Это обязательное поле!</span>}
                    </Form.Group>

                    <Button variant="primary" onClick={handleSubmit(onSubmit)}>
                        Жду звонка
                    </Button>
                </Form>
            </Modal.Body>
        </Modal>
    );
}

export function CallBtnFixed(props) {
    const [modalShow, setModalShow] = React.useState(false);

    return (
        <>
            <button className={styles.CallBtnFixed} onClick={() => setModalShow(true)}>
                <PhoneInTalkIcon/>
                <span>Обратный звонок</span>
            </button>

            <MyVerticallyCenteredModal
                show={modalShow}
                onHide={() => setModalShow(false)}
            />
        </>
    )
}
