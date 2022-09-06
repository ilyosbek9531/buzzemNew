import React, { useState, useRef } from 'react'
import { Sheet, Header, Content, Footer, detents, Portal } from 'react-sheet-slide'
import Link from "next/link";
import styles from './FixedButtonHelp.module.scss'
import 'react-sheet-slide/style.css'
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import Form from "react-bootstrap/Form";
import InputMask from "react-input-mask";
import Button from "react-bootstrap/Button";

export function MobileServiceFixedBtn(serviceInfo) {
    const [open, setOpen] = useState(false)
    const ref = useRef()
    return (
        <div className="rss-backdrop" style={{ background: '#f7f8f8'}}>


            <div className={styles.MobileFixedBottomBtn}>

                <Link href={`/orderfromservice/${serviceInfo.serviceInfo.guid}`}>
                    <a>
                        Записаться к {serviceInfo.serviceInfo.name}
                    </a>
                </Link>
            </div>
        </div>
    )
}