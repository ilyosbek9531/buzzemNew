import styles from './FixedButtonHelp.module.scss'
import Link from 'next/link'
import {Container} from '@mui/material'
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import React, {useState} from 'react'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import InputMask from "react-input-mask";
import httpClient from "../../../services/httpClient";
import {useForm} from "react-hook-form";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";

function MyVerticallyCenteredModal(props) {

    // const [message, setMessage] = useState({})
    //
    // const filterChangeHandler = (e) => {
    //     setMessage(prev => ({
    //         ...prev,
    //         [e.target.name]: e.target.value,
    //     }));
    // }
    //
    // function messageSubmit() {
    //     httpClient.post('object/message', {data: message})
    //         .then(res => console.log(res))
    // }
    //
    // console.log(message)

    const {register, handleSubmit, formState: {errors}} = useForm()

    const onSubmit = (values) => {
        httpClient.post('object/message', {data: values})
            .then(res => console.log(res))

        console.log(values)
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
                <h3>Сообщение</h3>
                <p>
                    Отправьте нам свой вопрос
                    и мы в скором времени ответим
                </p>

                <Form>
                    <Form.Group className="" controlId="formBasicEmail">
                        <Form.Label>Имя</Form.Label>
                        {/*<Form.Control type="text" name={'name'} placeholder="Введите ваше имя" onChange={filterChangeHandler}/>*/}

                        <input {...register("name", {required: true})} placeholder="Введите ваше имя"/>
                        {errors.name &&
                            <span className={'fieldError d-flex align-items-center mt-3'}><ErrorOutlineIcon className={'me-2'}/> Это обязательное поле!</span>}

                    </Form.Group>

                    <Form.Group className="" controlId="formBasicEmail">
                        <Form.Label>Тема сообщения</Form.Label>
                        {/*<Form.Control type="text" name={'theme_message'} placeholder="Введите тему сообщения" onChange={filterChangeHandler} />*/}

                        <input {...register("theme_message", {required: true})} placeholder="Введите тему сообщения"/>
                        {errors.theme_message &&
                            <span className={'fieldError d-flex align-items-center mt-3'}><ErrorOutlineIcon className={'me-2'}/> Это обязательное поле!</span>}
                    </Form.Group>

                    <Form.Group className="" controlId="formBasicEmail">
                        <Form.Label>Номер телефона</Form.Label>
                        {/*<InputMask mask="+\9\9\8 99 999 99 99" onChange={props.onChange} value={props.value} placeholder="Введите номер телефона"/>*/}
                        {/*<InputMask mask="(99) 999-99-99" onChange={filterChangeHandler} name={'phone_number'} placeholder="Введите номер телефона"/>*/}

                        <InputMask {...register("phone_number", {required: true, minLength: 9})} mask="(99) 999-99-99"
                                   placeholder="Введите номер телефона"/>
                        {errors.phone_number &&
                            <span className={'fieldError d-flex align-items-center mt-3'}><ErrorOutlineIcon className={'me-2'}/> Это обязательное поле!</span>}
                    </Form.Group>

                    <Form.Group className="" controlId="formBasicEmail">
                        <Form.Label>Сообщение</Form.Label>
                        {/*<Form.Control type="text" name={'message'} placeholder="Ваше сообщение" onChange={filterChangeHandler} />*/}

                        <input {...register("message", {required: true})} placeholder="Ваше сообщение"/>
                        {errors.message &&
                            <span className={'fieldError d-flex align-items-center mt-3'}><ErrorOutlineIcon className={'me-2'}/> Это обязательное поле!</span>}
                    </Form.Group>

                    <Button onClick={handleSubmit(onSubmit)}>
                        Отправить
                    </Button>
                </Form>
            </Modal.Body>
        </Modal>
    );
}

export function MessageBtnFixed(props) {
    const [modalShow, setModalShow] = React.useState(false);

    return (
        <>
            <button className={styles.messageBtn} onClick={() => setModalShow(true)}>
                <ChatBubbleOutlineIcon/>
                <span>Отправить сообщение</span>
            </button>

            <MyVerticallyCenteredModal
                show={modalShow}
                onHide={() => setModalShow(false)}
            />
        </>
    )
}
