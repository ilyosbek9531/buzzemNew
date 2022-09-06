import useTranslation from 'next-translate/useTranslation'
import Link from 'next/link'
import {useRouter} from 'next/router'
import styles from './MainAdress.module.scss'
import {Form, FormControl} from "react-bootstrap";
import {Button} from "@mui/material";
import {YMaps, Map, Placemark} from "@pbe/react-yandex-maps";
import {useRef, useState} from "react";
import Modal from 'react-bootstrap/Modal';

const branches = [
    {
        id: 1,
        name: 'Шайхантахурский район, \n' +
            'ул. Абдулла Кодирий 39',
        coor: [41.32934765351493, 69.25695833250674]
    },
    {
        id: 2,
        name: 'Шайхантахурский район, \n' +
            'ул. Зульфияханум 18',
        coor: [41.3294972661586, 69.25840672537478]
    },
    {
        id: 3,
        name: 'Шайхантахурский район, \n' +
            'ул. Истирохат 258',
        coor: [41.329367871459965, 69.25997849985754]
    },


]

export function MobileMainAdress(props) {
    const [selectedIndex, setSelectedIndex] = useState(0)
    const mapRef = useRef()

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <section className={styles.MobileMainAdress}>
            <div className="container-lg">
                <h3>Адреса филиалов</h3>

                <button onClick={handleShow} className={styles.MobileMainAdressShowModal}>
                    <img src="/images/locationBorder.svg" alt=""/>
                    Показать на карте
                </button>

                <div className={styles.MainAdressMenu}>
                    <div className={styles.MainAdressMenuItems}>
                        {
                            branches.map((branch, index) => (
                                <Button onClick={() =>
                                {
                                    mapRef.current?.panTo(branch.coor, { flying: 1 })
                                    setSelectedIndex(index)
                                }
                                } key={branch.id} className={`${styles.MainAdressMenuItem} ${selectedIndex === index ? styles.active : 'fesf'}`}>
                                    <div className={styles.leftSide}>
                                        <img src="/images/logoVertical.svg" alt=""/>
                                    </div>
                                    <div className={`${styles.rightSide} ${selectedIndex === index ? styles.active : 'fesf'}`}>
                                        <span className={styles.spanchik}>{branch.name}</span>
                                    </div>
                                </Button>
                            ))
                        }
                    </div>
                </div>

                <Modal show={show} onHide={handleClose} className={'MobileAdressModalContainer'}>
                    <Modal.Header closeButton>
                    </Modal.Header>
                    <Modal.Body>
                        <div className={'MobileMainAdressModalShow'}>

                            <YMaps query={{load: "package.full"}}>
                                <Map
                                    instanceRef={mapRef}
                                    defaultState={{
                                        center: branches[selectedIndex]?.coor,
                                        zoom: 14.5,
                                        controls: []
                                    }}
                                    width="100%"
                                    height="60%"
                                >

                                    {
                                        branches.map(branch => (
                                            <Placemark key={branch.id} geometry={branch.coor} options={{
                                                iconLayout: "default#image",
                                                iconImageSize: [50, 50],
                                                iconImageHref: '/images/logoMedion.svg'
                                            }}/>
                                        ))
                                    }

                                </Map>
                            </YMaps>

                            <div className={'MainAdressMenu'}>
                                <div className={'MainAdressMenuItems'}>
                                    {
                                        branches.map((branch, index) => (
                                            <Button onClick={() =>
                                            {
                                                mapRef.current?.panTo(branch.coor, { flying: 1 })
                                                setSelectedIndex(index)
                                            }
                                            } key={branch.id} className={`MainAdressMenuItem ${selectedIndex === index ? 'active' : 'fesf'}`}>
                                                <div className={'leftSide'}>
                                                    <img src="/images/logoVertical.svg" alt=""/>
                                                </div>
                                                <div className={`rightSide ${selectedIndex === index ? 'active' : 'fesf'}`}>
                                                    <span className={'spanchik'}>{branch.name}</span>
                                                </div>
                                            </Button>
                                        ))
                                    }
                                </div>
                            </div>
                        </div>
                    </Modal.Body>
                    {/*<Modal.Footer>*/}
                    {/*    <Button variant="secondary" onClick={handleClose}>*/}
                    {/*        Close*/}
                    {/*    </Button>*/}
                    {/*    <Button variant="primary" onClick={handleClose}>*/}
                    {/*        Save Changes*/}
                    {/*    </Button>*/}
                    {/*</Modal.Footer>*/}
                </Modal>




            </div>
        </section>
    )
}