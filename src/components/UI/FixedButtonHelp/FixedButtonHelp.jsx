import styles from './FixedButtonHelp.module.scss'
import Link from 'next/link'
import { Container } from '@mui/material'
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import React, { useState } from 'react'
import {MessageBtnFixed} from "./Message";
import {CallBtnFixed} from "./CallOrder";

export function FixedButtonHelp(props) {
    const { window } = props
    const [visible, SetVisible] = useState(false)

    const handleClick = () => {
        SetVisible(!visible)
    }
    return (
        <>
            {visible && (
                <div className={styles.FixedButtonHelpers}>
                    <MessageBtnFixed/>
                    <CallBtnFixed/>
                </div>
            )}

        <button className={styles.FixedButtonHelp}
                onClick={handleClick}
                style={{ cursor: 'pointer' }}
                aria-hidden="true">
            Помощь

            {
                visible ? <ExpandMoreIcon/> : <ExpandLessIcon/>
            }

        </button>
        </>
    )
}
