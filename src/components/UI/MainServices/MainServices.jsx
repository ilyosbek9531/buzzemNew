// import {Button, Container, FormControl} from '@mui/material'
import useTranslation from 'next-translate/useTranslation'
import Link from 'next/link'
import {useRouter} from 'next/router'
import 'bootstrap/dist/css/bootstrap.css'
import {Form, Nav, Navbar, NavDropdown, Button, Container, FormControl, Dropdown} from "react-bootstrap";
import {SearchBar} from "../HeaderSearch/SearchHeader";
import styles from './MainServices.module.scss'

export function MainServices() {
    return (
        <section className={styles.MainService}>
            <div className="container-lg">
                <h3 className={styles.MainServiceTitle}>Медицинские сервисы</h3>
                <div className="d-flex flex-column">
                    <div className={styles.firstRoll}>
                        <div className={styles.firstRollItemL} style={{backgroundImage: "url('/images/Frame 270989539.jpg')"}}>
                            <h4>Консультация врача в клинике</h4>
                            <p>Медицинские консультации чтоб найти решение <br/>
                                для любых ваших проблем со здоровьем
                            </p>
                            <Link href={'/'}>
                                <a>Записаться на приём</a>
                            </Link>
                        </div>

                        <div className={styles.firstRollItemR} style={{backgroundImage: "url('/images/Frame 270989541.jpg')"}}>
                            <h4>СПА</h4>
                            <p>
                                С новейшими и наиболее эффективными <br/> методиками эстетики лица и тела
                            </p>
                            <Link href={'/'}>
                                <a>Записаться на СПА</a>
                            </Link>
                        </div>
                    </div>

                    <div className={styles.secondRoll}>
                        <div className={styles.secondRollItemL} style={{backgroundImage: "url('/images/Frame 270989540.jpg')"}}>
                            <h4>Диагностика в клинике</h4>
                            <p>
                                Рентген, УЗИ, МРТ, КГ, ЭКГ, КТ
                            </p>
                        </div>

                        <div className={styles.secondRollItemM} style={{backgroundImage: "url('/images/Frame 270989542 (1).svg')"}}>
                            <h4>Стоматология</h4>
                            <p>
                                 Medion Dental является одним <br/> из лучших стоматологий в <br/> столице
                            </p>
                        </div>

                        <div className={styles.secondRollItemR} style={{backgroundImage: "url('/images/Frame 270989543.jpg')"}}>
                            <h4>Косметология</h4>
                            <p>
                                С новейшими и наиболее эффективными <br/> методиками эстетики лица
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}