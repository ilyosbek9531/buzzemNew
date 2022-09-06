import useTranslation from 'next-translate/useTranslation'
import Link from 'next/link'
import {useRouter} from 'next/router'
import 'bootstrap/dist/css/bootstrap.css'
import {Form, Nav, Navbar, NavDropdown, Button, Container, FormControl, Dropdown} from "react-bootstrap";
import {SearchBar} from "../HeaderSearch/SearchHeader";
import styles from './Header.module.scss'
import Modal from "react-bootstrap/Modal";
import InputMask from "react-input-mask";
import React, {useState, useEffect} from 'react'
import httpClient from "../../../services/httpClient";
import {Component} from 'react'
import OtpInput from 'react-otp-input-rc-18';
import {DetectAdress} from "../DetectAdress/DetectAdress";
import {useForm} from "react-hook-form";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import httpAuth from 'services/httpAuth';
import {useDispatch, useSelector} from "react-redux";
import Spinner from 'react-bootstrap/Spinner';
import useAuth from 'hooks/useAuth';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import {LazyLoadImage} from 'react-lazy-load-image-component';


export const baseAuthService = process.env.NEXT_PUBLIC_AUTH_SERVICE

function MyVerticallyCenteredModal(props) {
    const {register, handleSubmit, formState: {errors}} = useForm()
    const [isLoading, setIsLoading] = useState(false)
    const [modalShowNumber, setModalShowNumber] = React.useState(true);
    const [modalShowOTP, setModalShowOTP] = React.useState(false);
    const [modalShowRegister, setModalShowRegister] = React.useState(false);
    const [otp, setStateOtp] = React.useState('');
    const [numberPhone, setNumberPhone] = React.useState('');
    const [smsId, setSmsId] = React.useState('');
    const [numberAuthError, setNumberAuthError] = React.useState(false);
    const [otpAuthError, setOtpAuthError] = React.useState(false);
    const [checkClientType, setCheckClientType] = React.useState(false);
    const {userId, token, setUserId, setToken, setLogout} = useAuth()

    // const [responseUser, setResponseUser] = React.useState({});
    // const [userGuid, setUserGuid] = React.useState('');

    const dispatch = useDispatch()

    function clearWhileExit() {
        props.onHide()
        setModalShowOTP(false)
        setModalShowRegister(false)
        setModalShowNumber(true)
        setIsLoading(false)
        setStateOtp('')
        setNumberPhone('')
    }

    function sendCode() {
        setIsLoading(true)
        httpAuth.post('send-code', {
            "recipient": numberPhone.replaceAll(' ', '').replace('(', '').replace(')', '').replaceAll('-', ''),
            "text": "Ваш код для входа medion.uz",
            "client_type": "PATIENT"
        })
            .then(res => checkPatient(res))
            .catch(() => numberErr())
    }

    function numberErr() {
        setIsLoading(false)
        setNumberAuthError(true)
    }

    function checkPatient(res) {

        if (res.sms_id) {
            setModalShowOTP(true);
            setModalShowNumber(false)
            setSmsId(res.sms_id)
            setIsLoading(false)
        }

        if (res.data.user_found == true) {
            setToken(res.data)
            setUserId(res.data.user_id)

            // setResponseUser(res.data)
            // setUserGuid(res.data.user_id)

            setIsLoading(false)
        } else {
            setCheckClientType(true)
            // agar client yangi bosa setCheckClientType true beradi
        }
    }


    function verifyOtp() {
        setIsLoading(true)
        httpAuth.post(`verify/${smsId}/${otp}`, {data: {}})
            .then(res => verifyOtpFromSms(res))
            .catch(() => otpErr())
    }

    function otpErr(params) {
        setOtpAuthError(true)
        setIsLoading(false)
    }

    function verifyOtpFromSms(res) {
        if (res == 'User verified but not found') {
            setModalShowOTP(false);
            setModalShowNumber(false);
            token ? clearWhileExit() : setModalShowRegister(true);
        }
    }

    const onSubmit = (values) => {

        const digits = values.passport.replace(/\D/g, ""),
            letters = values.passport.replace(/[^a-z]/gi, "");

        const phoneNumber = numberPhone.replaceAll(' ', '').replace('+998', '').replace(')', ') ')

        const newPatient = {
            "passport_number": digits,
            "passport_serial": letters,
            "address": "",
            "birthday": "",
            "city": "",
            "email": "",
            "gender": values.gender,
            "index": "",
            "last_name": values.last_name,
            "name": values.name,
            "numbe": "",
            "passport_photo": "",
            "phone_number": phoneNumber,
            "pinfl": "",
            "region": "",
            "secon_name": values.secon_name,
            "source": "Вебсайт"
        }

        httpAuth.post('register-otp/patients', {data: newPatient})
            .then(res => registerNewAcc(res))
    }

    function registerNewAcc(res) {
        if (res.token.access_token) {
            setToken(res.token.access_token)
            setUserId(res.user_id)
            clearWhileExit()
        } else {
            alert('error')
        }
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

                <div className="authModal m-0">

                    {modalShowNumber ? <div className={'m-0'}>
                        <h3>Вход в систему</h3>

                        <Form onSubmit={handleSubmit(sendCode)}>
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label>Номер телефона</Form.Label>
                                <InputMask mask="+\9\9\8\ (99) 999-99-99" onChange={(e) => setNumberPhone(e.target.value)} value={numberPhone}
                                           placeholder="Введите номер телефона"/>
                                <span
                                    className={`fieldError d-flex align-items-center mt-3 ${numberAuthError == false ? 'numberAuth' : null}`}><ErrorOutlineIcon
                                    className={'me-2'}/>Пожалуйста, введите корректный номер телефона!</span>
                            </Form.Group>

                            <Button type="button" onClick={/* function(event){ setModalShowOTP(true); setModalShowNumber(false)} */ sendCode}>

                                {isLoading ? (
                                    <Spinner animation="border" role="status">
                                        <span className="visually-hidden">Loading...</span>
                                    </Spinner>
                                ) : (
                                    'Войти'
                                )}

                            </Button>
                        </Form>
                    </div> : null}

                    {modalShowOTP ? <div className={'m-0 otpNumberLogin'}>
                        <div className="col-8 m-auto">
                            <h3>Вход в систему</h3>

                            <p>Код отправили сообщением на {numberPhone}
                                <button onClick={function (event) {
                                    setModalShowOTP(false);
                                    setModalShowNumber(true)
                                }}>Изменить
                                </button>
                            </p>
                        </div>

                        <Form onSubmit={handleSubmit(verifyOtp)}>
                            <OtpInput
                                value={otp}
                                onChange={setStateOtp}
                                numInputs={4}
                                className={'m-0 werthyj'}
                                isInputNum={true}
                            />
                            <span
                                className={`fieldError d-flex align-items-center mt-3 mb-3 ${otpAuthError == false ? 'numberAuth' : null}`}><ErrorOutlineIcon
                                className={'me-2'}/>Пожалуйста, введите код из смс!</span>
                            <Button variant="primary" type="button"
                                    onClick={/* function(event){ setModalShowOTP(false); setModalShowNumber(false); setModalShowRegister(true)} */ verifyOtp}>

                                {isLoading ? (
                                    <Spinner animation="border" role="status">
                                        <span className="visually-hidden">Loading...</span>
                                    </Spinner>
                                ) : (
                                    'Войти'
                                )}

                            </Button>
                        </Form>
                    </div> : null}

                    {modalShowRegister ? <div className={'m-0'}>
                        <h3>Регистрация</h3>

                        <Form onSubmit={handleSubmit(onSubmit)}>
                            <Form.Group className="" controlId="formBasicName">
                                <Form.Label>Имя</Form.Label>
                                <Form.Control {...register("name", {required: true})} placeholder="Введите ваше имя"/>
                                {errors.name && <span className={'fieldError d-flex align-items-center mt-3'}><ErrorOutlineIcon className={'me-2'}/> Это обязательное поле!</span>}
                            </Form.Group>

                            <Form.Group className="" controlId="formBasicSurname">
                                <Form.Label>Фамилия</Form.Label>
                                <Form.Control {...register("secon_name", {required: true})} placeholder="Введите фамилию"/>
                                {errors.surname &&
                                    <span className={'fieldError d-flex align-items-center mt-3'}><ErrorOutlineIcon className={'me-2'}/> Это обязательное поле!</span>}
                            </Form.Group>

                            <Form.Group className="" controlId="formBasicFatherName">
                                <Form.Label>Отчество</Form.Label>
                                <Form.Control {...register("last_name", {required: true})} placeholder="Введите отчество"/>
                                {errors.fathersname &&
                                    <span className={'fieldError d-flex align-items-center mt-3'}><ErrorOutlineIcon className={'me-2'}/> Это обязательное поле!</span>}
                            </Form.Group>

                            <Form.Group className="" controlId="formBasicPassport">
                                <Form.Label>Серия паспорта</Form.Label>
                                <Form.Control {...register("passport", {required: true})} placeholder="Введите серию паспорта"/>
                                {errors.passport &&
                                    <span className={'fieldError d-flex align-items-center mt-3'}><ErrorOutlineIcon className={'me-2'}/> Это обязательное поле!</span>}
                            </Form.Group>

                            <Form.Group className="" controlId="formBasicGender">
                                <Form.Label>Пол</Form.Label>
                                <Form.Select {...register("gender", {required: true})}>
                                    <option value={'Мужчина'}>Мужской</option>
                                    <option value={'Женщина'}>Женский</option>
                                </Form.Select>
                                {errors.gender && <span className={'fieldError d-flex align-items-center mt-3'}><ErrorOutlineIcon className={'me-2'}/> Это обязательное поле!</span>}
                            </Form.Group>

                            <Button onClick={handleSubmit(onSubmit)}>
                                Зарегистрироваться
                            </Button>
                        </Form>
                    </div> : null}
                </div>

            </Modal.Body>
        </Modal>
    );
}


export function Header({isFixed}) {
    const router = useRouter()
    const [modalShow, setModalShow] = React.useState(false);
    const {userId, token, patient, setUserId, setToken, setLogout, setAboutPatient} = useAuth()
    const {t} = useTranslation('common')
    const [anchorEl, setAnchorEl] = React.useState(null);


    useEffect(() => {
        if (!userId) return
        httpClient.post('object/get-list/patients', {data: {"guid": userId}})
            .then(res => setAboutPatient(res.data.response?.[0] ?? {}))
    }, [userId])


    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    const handleCloseAndLogOut = () => {
        setAnchorEl(null);
        setLogout()
    }
    const langs = [
        {
            key: 'ru',
            label: 'РУ',
        },
        {
            key: 'uz',
            label: 'UZ',
        },
        {
            key: 'en',
            label: 'EN',
        },
    ]
    return (
        <header className={`globalHeader ${isFixed ? 'fixed' : ''}`}>
            <Navbar bg="white" expand="lg" className={styles.navbars}>
                <Container container-lg>
                    <div className="d-flex">
                        <Link className={styles.navbarbrand} href="/">
                            <a className={styles.navbarbrandlink}>
                                <img width={'110px'} src="/images/LogoVector.svg" alt=""/>
                            </a>
                        </Link>
                        <SearchBar/>
                    </div>
                    <Navbar.Toggle aria-controls="navbarScroll"/>
                    <Navbar.Collapse className={'justify-content-end'} id="navbarScroll">
                        <Nav
                            className=""
                            style={{maxHeight: '100px'}}
                            navbarScroll
                        >

                            <Navbar.Brand className={'d-flex justify-content-center align-items-center'}>
                                <img src="/images/Vector.svg" alt=""/>
                                <span className={styles.firstHeaderSpan}>Ваша локация: {DetectAdress()}</span>
                            </Navbar.Brand>
                            <Navbar.Brand className={'d-flex justify-content-center align-items-center'}>
                                <img src="/images/Vector (1).svg" alt=""/>
                                <span className={styles.firstHeaderSpan}>1223</span>
                            </Navbar.Brand>
                            <Dropdown className="d-flex align-items-center" autoClose="outside">
                                <Dropdown.Toggle id="dropdown-autoclose-outside" className={styles.localeBtn}>
                                    {useTranslation().lang}
                                </Dropdown.Toggle>
                                <Dropdown.Menu className={styles.dropdownmenu}>
                                    {langs.map((item) => (
                                        <div key={item.key}>
                                            <Link href={router.asPath} locale={item.key}>
                                                <a data-rr-ui-dropdown-item className={'dropdown-item'}>{item.label}</a>
                                            </Link>
                                        </div>
                                    ))}
                                </Dropdown.Menu>
                            </Dropdown>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>

            <Navbar bg="white" expand="lg" className={styles.navbars}>
                <Container container-lg>
                    <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="w-100 d-flex justify-content-between">
                            <div className="d-flex">
                                <Link href={'/services'}>
                                    <a className={styles.navlink}>Направления и услуги</a>
                                </Link>
                                <Link href={'/prices'}>
                                    <a className={styles.navlink}>Цены</a>
                                </Link>
                                <Link href={'/doctors'}>
                                    <a className={styles.navlink}>Врачи</a>
                                </Link>
                                <Link href={'/aboutus'}>
                                    <a className={styles.navlink}>О нас</a>
                                </Link>
                                <Link href={'/discount'}>
                                    <a className={styles.navlink}>Акции</a>
                                </Link>
                            </div>

                            <div className="d-flex">

                                {
                                    token ?
                                        (
                                            <>
                                                <Button
                                                    id="basic-button"
                                                    aria-controls={open ? 'basic-menu' : undefined}
                                                    aria-haspopup="true"
                                                    aria-expanded={open ? 'true' : undefined}
                                                    onClick={handleClick}
                                                    className={styles.loggedBtn}
                                                >
                                                    {
                                                        patient.passport_photo ?
                                                            <LazyLoadImage
                                                                alt={''}
                                                                effect="blur"
                                                                src={patient.passport_photo}
                                                                width={''}/> : <img src="/images/defaultUser.png" alt=""/>
                                                    }
                                                    <span>{patient?.secon_name + ' ' + patient?.name}</span>
                                                </Button>
                                                <Menu
                                                    id="basic-menu"
                                                    anchorEl={anchorEl}
                                                    open={open}
                                                    onClose={handleClose}
                                                    MenuListProps={{
                                                        'aria-labelledby': 'basic-button',
                                                    }}
                                                >
                                                    <Link href={'myaccount'}>
                                                        <MenuItem onClick={handleClose}>Мой профиль</MenuItem>
                                                    </Link>

                                                    <MenuItem onClick={handleCloseAndLogOut}>Выйти</MenuItem>
                                                </Menu>

                                            </>
                                        )
                                        :
                                        (<Button className={styles.accBtn} onClick={() => setModalShow(true)}>
                                            <img src="/images/Vector (2).svg" alt=""/>
                                            <span>Личный кабинет</span>
                                        </Button>)
                                }


                                <MyVerticallyCenteredModal
                                    show={modalShow}
                                    onHide={() => setModalShow(false)}
                                />




                                {
                                    token ? (
                                        <Link href={'/order'}>
                                            <Button className={styles.orderBtn}>
                                                <span>Записаться на приём</span>
                                            </Button>
                                        </Link>
                                    ) : (

                                            <Button className={styles.orderBtn} onClick={() => setModalShow(true)}>
                                                <span>Записаться на приём</span>
                                            </Button>

                                    )
                                }

                            </div>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </header>
    )
}
