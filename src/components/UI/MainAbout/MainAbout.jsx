// import {Button, Container, FormControl} from '@mui/material'
import useTranslation from 'next-translate/useTranslation'
import Link from 'next/link'
import {useRouter} from 'next/router'
import 'bootstrap/dist/css/bootstrap.css'
import {Form, Nav, Navbar, NavDropdown, Button, Container, FormControl, Dropdown} from "react-bootstrap";
import {SearchBar} from "../HeaderSearch/SearchHeader";
import styles from './MainAbout.module.scss'

export function MainAbout() {
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
        <section className={styles.mainAbout} style={{ backgroundImage: "url('/images/why us.jpg')" }}>
            <div className="container-lg">
                <div className={styles.mainAboutLogo}>
                    <img src="/images/aboutLogo.svg" alt=""/>
                </div>
                <div className={styles.mainAboutInfo}>
                    <p>
                        Сеть клиник Medion – это три больших многопрофильных медицинских центра, <br/> каждый из которых отличается своей особенностью. Все
                        клиники оснащены <br/> современным оборудованием от таких зарубежных производителей, как GE <br/> HealthCare, Alma, Dornier, Olympus и
                        другие
                    </p>
                </div>
                <div className={styles.mainAboutItems}>
                    <div className={styles.mainAboutItem}>
                        <span>5+</span>
                        <p>
                            лет заботимся о вашем
                            красоте и здоровье
                        </p>
                    </div>
                    <div className={styles.mainAboutItem}>
                        <span>100+</span>
                        <p>
                            специалистов
                            с многолетним опытом
                        </p>
                    </div>
                    <div className={styles.mainAboutItem}>
                        <span>300 000+</span>
                        <p>
                            довольных пациентов
                        </p>
                    </div>
                </div>
            </div>
        </section>
    )
}
