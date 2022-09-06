import React, {useState} from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import MenuIcon from '@mui/icons-material/Menu';
import Link from "next/link";
import styles from './Header.module.scss'
import {useRouter} from "next/router";
import useTranslation from "next-translate/useTranslation";

export function HeaderMobile() {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const router = useRouter()
    const {t} = useTranslation('common')
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
        <>

            <nav className={`d-flex justify-content-between ${styles.headerMobileNav}`}>

                <div className={'d-flex align-items-center'}>
                    <div className="hamburgerMenu">
                        <Button variant="primary" onClick={handleShow}>
                            <MenuIcon/>
                        </Button>


                        <Modal show={show} onHide={handleClose} className={'fullScreenModal'}>

                            <Modal.Header closeButton>
                                <img width={
                                    '100px'
                                } src="/images/LogoVector.svg" alt=""/>
                            </Modal.Header>
                            <Modal.Body>
                                <div className={styles.mobileHeaderTop}>
                                    <Link href={'/'} >
                                        <a onClick={handleClose}>
                                            <img src="/images/mobileAcc.svg" alt=""/>
                                            Войти
                                        </a>
                                    </Link>

                                    <Link href={'https://yandex.uz/maps/10335/tashkent/search/medion/?ll=69.239798%2C41.306911&sll=69.279737%2C41.311151&sspn=0.493011%2C0.217703&z=13.94'}>
                                        <a onClick={handleClose}>
                                            <img src="/images/Vector.svg" alt=""/>
                                            Ваша локация
                                        </a>
                                    </Link>
                                </div>

                                <ul className={styles.mobileHeaderBody}>
                                    <li>
                                        <Link href={'/services'}>
                                            <a onClick={handleClose}>
                                                Направления и услуги
                                            </a>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href={'/prices'}>
                                            <a onClick={handleClose}>
                                                Цены
                                            </a>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href={'/doctors'}>
                                            <a onClick={handleClose}>
                                                Врачи
                                            </a>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href={'/aboutus'}>
                                            <a onClick={handleClose}>
                                                О нас
                                            </a>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href={'/discount'}>
                                            <a onClick={handleClose}>
                                                Акции
                                            </a>
                                        </Link>
                                    </li>
                                    <li className={styles.mobileHeaderLocalization}>
                                        <span>Язык:</span>

                                        {langs.map((item) => (
                                            <div key={item.key} className={'m-0'}>
                                                <Link href={router.asPath} locale={item.key}>
                                                    {/* eslint-disable-next-line react-hooks/rules-of-hooks */}
                                                    <a onClick={handleClose} className={item.key === useTranslation().lang ? `${styles.activeLocal}` : 'nonactiveLocal'}>
                                                        {item.label}
                                                    </a>
                                                </Link>
                                            </div>
                                        ))}

                                        {/*<Link href={'/'}>*/}
                                        {/*    <a onClick={handleClose}>*/}
                                        {/*        Рy*/}
                                        {/*    </a>*/}
                                        {/*</Link>*/}

                                        {/*<Link href={'/'}>*/}
                                        {/*    <a onClick={handleClose}>*/}
                                        {/*        Уз*/}
                                        {/*    </a>*/}
                                        {/*</Link>*/}

                                        {/*<Link href={'/'}>*/}
                                        {/*    <a onClick={handleClose}>*/}
                                        {/*        Англ*/}
                                        {/*    </a>*/}
                                        {/*</Link>*/}

                                    </li>
                                </ul>
                            </Modal.Body>
                            <Modal.Footer>
                                <div className={'mobileHeaderBottom'}>
                                    <Link href={'tel:1223'}>
                                        <a onClick={handleClose}>
                                            <img src="/images/Vector (1).svg" alt=""/>
                                            1223
                                        </a>
                                    </Link>

                                    <Link href={'/order'}>
                                        <a onClick={handleClose}>
                                            Записаться на приём
                                        </a>
                                    </Link>
                                </div>
                            </Modal.Footer>

                        </Modal>
                    </div>

                    <Link href={'/'}>
                        <a>
                            <img width={'100px'} src="/images/LogoVector.svg" alt=""/>
                        </a>
                    </Link>
                </div>

                <div className={'mobileHeaderRight'}>
                    <button>
                        <img src="/images/search.svg" alt=""/>
                    </button>

                    <button>
                        <img src="/images/acc.svg" alt=""/>
                    </button>
                </div>
            </nav>

        </>
    );
}