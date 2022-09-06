import useTranslation from 'next-translate/useTranslation'
import Link from 'next/link'
import {useRouter} from 'next/router'
import styles from './ServicesInfo.module.scss'
import {Container, Form, FormControl, Nav, Navbar} from "react-bootstrap";
import {Button} from "@mui/material";
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import IconGenerator from "../IconGenerator/IconGenerator";

export function ServicesInfo(services) {
    const serviceInfo = services?.services?.specialities[0]

    console.log(serviceInfo)

    return (
        <Navbar bg="white" expand="lg" sticky="top" className={styles.navbars}>
            <div className={'container-lg'}>
                <div id="basic-navbar-nav" className={'w-100'}>
                    <div className="w-100 d-flex justify-content-between">
                        <div className="d-flex">
                            <div className={styles.titleimg}>
                                <IconGenerator icon={serviceInfo.icon}/>
                            </div>
                            <div className={styles.navbarTitle}>
                                <h3>{serviceInfo.name}</h3>
                            </div>
                        </div>


                        <Link href={`/orderfromservice/${serviceInfo.guid}`}>
                            <Button className={styles.orderBtn}>
                                <span>Записаться к {serviceInfo.name}</span>
                            </Button>
                        </Link>
                    </div>
                </div>
            </div>
        </Navbar>
    )
}