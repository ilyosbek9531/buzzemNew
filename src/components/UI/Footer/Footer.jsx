import styles from './Footer.module.scss'
import Link from 'next/link'
import {Button, Container} from '@mui/material'
import {useEffect, useState} from "react";
import httpClient from "../../../services/httpClient";

export function Footer() {
    const [branches, setBranches] = useState([])

    useEffect(() => {
        httpClient.post('object/get-list/branches', {data: {/*limit: 2, offset: 0*/}})
            .then(res => setBranches(res.data.response))
    }, [])

  return (
      <footer className={styles.footer}>
        <div className="container-lg">
            <div className="d-flex">
                <div className="footer-logo col-2">
                    <Link href={'/'}>
                        <a>
                            <img src="/images/logoMedion.svg" alt=""/>
                        </a>
                    </Link>
                </div>

                <div className="col-10 footer-menu d-flex justify-content-between">
                    <div className={styles.navMenu}>
                        <div className="d-flex flex-column">
                            <Link href={'/'}>
                                <a>Направления и услуги</a>
                            </Link>
                            <Link href={'/'}>
                                <a>Личный кабинет</a>
                            </Link>
                            <Link href={'/'}>
                                <a>Цены</a>
                            </Link>
                            <Link href={'/'}>
                                <a>О нас</a>
                            </Link>
                            <Link href={'/'}>
                                <a>Врачи</a>
                            </Link>
                            <Link href={'/'}>
                                <a>Новости</a>
                            </Link>
                        </div>
                    </div>

                    <div className={styles.navAdress}>
                        <div className="d-flex flex-column">
                            <h3>Адреса филиалов</h3>

                            {
                                branches.map((branch, index) => (
                                    <p key={branch.id}>
                                        {branch.address}
                                    </p>
                                ))
                            }
                        </div>
                    </div>

                    <div className={styles.navContacts}>
                        <div className="d-flex flex-column">
                            <h3>Контакты</h3>
                            <p>
                                Телефон:
                                <Link href={'tel:998932310303'}>
                                    <a> +998 (93) 231-03-03</a>
                                </Link>
                            </p>
                            <p>
                                Колл центр:
                                <Link href={'tel:1223'}>
                                    <a> 1223</a>
                                </Link>
                            </p>
                            <p>
                                E-mail:
                                <Link href={'mailto:info@medion.uz'}>
                                    <a> info@medion.uz</a>
                                </Link>
                            </p>
                        </div>
                    </div>

                    <div className={styles.navSocial}>
                        <div className="d-flex flex-column">
                            <h3>Мы в социальных сетях:</h3>

                            <div className="d-flex">
                                <Link href={'https://t.me/medionuz'}>
                                    <a>
                                        <img src="/images/tg.svg" alt=""/>
                                    </a>
                                </Link>

                                <Link href={'https://www.facebook.com/Medionuz'}>
                                    <a>
                                        <img src="/images/fb.svg" alt=""/>
                                    </a>
                                </Link>

                                <Link href={'https://www.instagram.com/medionuz'}>
                                    <a>
                                        <img src="/images/ig.svg" alt=""/>
                                    </a>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <hr className={styles.footerHr}/>

            <div className="d-flex">
                <p className={styles.copyright}>©Medion 2022. Все права защищены</p>
            </div>

        </div>
      </footer>
  )
}
