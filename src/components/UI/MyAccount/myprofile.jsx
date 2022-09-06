import { Container } from '@mui/material'
import Link from 'next/link'
import styles from './MyAccount.module.scss'
import Form from 'react-bootstrap/Form';
import AddIcon from '@mui/icons-material/Add';
import InputMask from "react-input-mask";
import useAuth from 'hooks/useAuth';
import { useForm } from "react-hook-form";
import Button from 'react-bootstrap/Button';
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import httpClient from "../../../services/httpClient";
import { useEffect } from 'react';
import HFImageUpload from '../HFController/HFImageUpload';


export function Myprofile() {

    const { userId, token, patient, setUserId, setToken, setLogout, setAboutPatient } = useAuth()

    const { register, handleSubmit, formState: { errors }, setValue, reset, control } = useForm()

    const onSubmit = (values) => {
        httpClient.put('object/patients', { data: values })
            .then(res => console.log(res))

        console.log(values)
    }

    useEffect(() => {
        reset(patient)
    }, [patient])


    function handleChange(e) {
        const imageContainer = document.getElementById('imageContainer')
        let files = e.target.files[0]
        let imageURL = URL.createObjectURL(files)
        imageContainer.style.backgroundImage = `url(${imageURL})`
    }

    return (
        <div>
            <Form>
                <h3 className={'mb-24'}>Личные данные</h3>
                <div className={styles.myprofile}>

                    <div className="card profile">
                        <div className="avatar">
                            {/* <input type="file" id="file-uploader" onChange={handleChange} /> */}
                           
                            <div className="img">
                            <HFImageUpload name={'passport_photo'} control={control}/>
                            </div>
                            <label htmlFor="file-uploader" className="label">
                                <AddIcon />
                            </label>
                        </div>
                        {errors.passport_photo && <span className={'fieldError d-flex align-items-center mt-3'}><ErrorOutlineIcon className={'me-2'}/> Это обязательное поле!</span>}
                    </div>

                    <div className="d-flex w-100 flex-wrap gap-24">
                        <Form.Group className="flexonetoone" controlId="formBasicEmail">
                            <Form.Label>Фамилия</Form.Label>
                            <input className={'form-control'} {...register("secon_name", { required: true })} type="text" placeholder="" />
                            {errors.secon_name && <span className={'fieldError d-flex align-items-center mt-3'}><ErrorOutlineIcon className={'me-2'}/> Это обязательное поле!</span>}
                        </Form.Group>

                        <Form.Group className="flexonetoone" controlId="formBasicEmail">
                            <Form.Label>Имя</Form.Label>
                            <input className={'form-control'} {...register("name", { required: true })} type="text" placeholder="" />
                            {errors.name && <span className={'fieldError d-flex align-items-center mt-3'}><ErrorOutlineIcon className={'me-2'}/> Это обязательное поле!</span>}
                        </Form.Group>

                        <Form.Group className="flexonetoone" controlId="formBasicEmail">
                            <Form.Label>ID клиента</Form.Label>
                            <input className={'form-control'} type="text" placeholder="" value={patient.increment_id} disabled />
                        </Form.Group>

                        <Form.Group className="flexonetoone" controlId="formBasicEmail">
                            <Form.Label>Серия и номер паспорта</Form.Label>
                            <input className={'form-control'} type="text" placeholder="" value={patient.passport_serial + patient.passport_number} disabled />
                        </Form.Group>

                        <Form.Group className="flexonetoone" controlId="formBasicEmail">
                            <Form.Label>Телефон</Form.Label>
                            <input className={'form-control'} type="text" {...register("phone_number")} placeholder="" value={patient.phone_number} disabled />
                            {errors.phone_number && <span className={'fieldError d-flex align-items-center mt-3'}><ErrorOutlineIcon className={'me-2'}/> Это обязательное поле!</span>}
                        </Form.Group>

                        <Form.Group className="flexonetoone" controlId="formBasicEmail">
                            <Form.Label>Дата рождения</Form.Label>
                            <input className={'form-control'} {...register("birthday")} type="date" placeholder=""  />
                            {errors.birthday && <span className={'fieldError d-flex align-items-center mt-3'}><ErrorOutlineIcon className={'me-2'}/> Это обязательное поле!</span>}
                        </Form.Group>

                        <Form.Group className="flexonetoone" controlId="formBasicEmail">
                            <Form.Label>Электронная почта</Form.Label>
                            <input className={'form-control'} {...register("email")} type="text" placeholder="" />
                            {errors.email && <span className={'fieldError d-flex align-items-center mt-3'}><ErrorOutlineIcon className={'me-2'}/> Это обязательное поле!</span>}
                        </Form.Group>

                        <Form.Group className="flexonetoone" controlId="formBasicEmail">
                            <Form.Label>ПИНФЛ</Form.Label>
                            <input className={'form-control'} {...register("pinfl")} type="text" placeholder=""  />
                            {errors.pinfl && <span className={'fieldError d-flex align-items-center mt-3'}><ErrorOutlineIcon className={'me-2'}/> Это обязательное поле!</span>}
                        </Form.Group>

                        <Form.Group className="flexonetoone" controlId="formBasicEmail">
                            <Form.Label>Адрес места жительства</Form.Label>
                            <input className={'form-control'} {...register("city")} type="text" placeholder="Город"  />
                            {errors.city && <span className={'fieldError d-flex align-items-center mt-3'}><ErrorOutlineIcon className={'me-2'}/> Это обязательное поле!</span>}
                        </Form.Group>

                        <Form.Group className="flexonetoone" controlId="formBasicEmail">
                            <Form.Label>Адрес места жительства</Form.Label>
                            <input className={'form-control'} {...register("region")} type="text" placeholder="Область"  />
                            {errors.region && <span className={'fieldError d-flex align-items-center mt-3'}><ErrorOutlineIcon className={'me-2'}/> Это обязательное поле!</span>}
                        </Form.Group>

                        <Form.Group className="flexonetoone" controlId="formBasicEmail">
                            <Form.Label>Адрес места жительства</Form.Label>
                            <input className={'form-control'} {...register("address")} type="text" placeholder="Адрес" />
                            {errors.address && <span className={'fieldError d-flex align-items-center mt-3'}><ErrorOutlineIcon className={'me-2'}/> Это обязательное поле!</span>}
                        </Form.Group>

                        <Form.Group className="flexonetoone" controlId="formBasicEmail">
                            <Form.Label>Адрес места жительства</Form.Label>
                            <input className={'form-control'} {...register("index")} type="number" placeholder="Индекс"/>
                            {errors.index && <span className={'fieldError d-flex align-items-center mt-3'}><ErrorOutlineIcon className={'me-2'}/> Это обязательное поле!</span>}
                        </Form.Group>
                    </div>

                    <div className="d-flex justify-content-end">
                        <Button onClick={handleSubmit(onSubmit)} className={styles.saveBtn}>
                            Отправить
                        </Button>
                    </div>
                </div>

            </Form>
        </div>

    )
}
