import React, { useState, useRef } from 'react'
import { Sheet, Header, Content, Footer, detents, Portal } from 'react-sheet-slide'
import Link from "next/link";
import styles from './FixedButtonHelp.module.scss'
import 'react-sheet-slide/style.css'
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import Form from "react-bootstrap/Form";
import InputMask from "react-input-mask";
import Button from "react-bootstrap/Button";

export function MobileBottomSheetMessageOrder(props) {
    const [open, setOpen] = useState(false)
    const ref = useRef()
    return (
        <div className="rss-backdrop" style={{ background: '#f7f8f8'}}>


            <div className={styles.MobileFixedBottomBtn}>

                <Link href={'/order'}>
                    <a>
                        Записаться на приём
                    </a>
                </Link>

                <button type="button" onClick={() => setOpen(true)} >
                    <img src="/images/MobileFixedBtn.svg" alt=""/>
                </button>
            </div>


            <Portal>
                <Sheet
                    ref={ref}
                    open={open}
                    onDismiss={() => setOpen(false)}
                    onClose={() => {
                        console.log('Component unmounted')
                    }}
                    selectedDetent={detents.large}
                    detents={props => {
                        console.log("PROPS ==>", props)
                        return  [
                            detents.large({
                                ...props,
                                minHeight: 529,
                                maxHeight: 590
                            }),
                            detents.fit(props)
                        ]
                    }}
                    useDarkMode={false}
                    useModal={false}
                    scrollingExpands={true}
                >
                    <Header>
                        <div className={styles.fixedBtnHeader}>
                            <button type="button" onClick={() => setOpen(false)}>
                                <KeyboardArrowLeftIcon/>
                                Назад
                            </button>

                            <h5>Сообщение</h5>
                        </div>
                    </Header>
                    <Content>
                        {/*<div style={{ padding: '54px 16px 24px' }}>*/}
                        {/*    <div>Add more storage to keep everything on online</div>*/}
                        {/*    <div>*/}
                        {/*        Online includes plenty of storage to keep all your data safe and*/}
                        {/*        features to protect your privacy.*/}
                        {/*    </div>*/}
                        {/*    <div>Learn More About Online</div>*/}
                        {/*</div>*/}

                        <div className="fixedBtnBody">
                            <Form>
                                <Form.Group className="" controlId="formBasicEmail">
                                    <Form.Label>Имя</Form.Label>
                                    <Form.Control type="text" placeholder="Введите ваше имя" />
                                </Form.Group>

                                <Form.Group className="" controlId="formBasicEmail">
                                    <Form.Label>Тема сообщения</Form.Label>
                                    <Form.Control type="text" placeholder="Введите тему сообщения" />
                                </Form.Group>

                                <Form.Group className="" controlId="formBasicEmail">
                                    <Form.Label>Номер телефона</Form.Label>
                                    <InputMask mask="+\9\9\8 99 999 99 99" onChange={props.onChange} value={props.value} placeholder="Введите номер телефона"/>
                                </Form.Group>

                                <Form.Group className="" controlId="formBasicEmail">
                                    <Form.Label>Сообщение</Form.Label>
                                    <Form.Control type="text" placeholder="Ваше сообщение" />
                                </Form.Group>

                                <Button type="submit">
                                    Отправить
                                </Button>
                            </Form>
                        </div>

                    </Content>
                    {/*<Footer>*/}
                    {/*    <button type="button" onClick={() => setOpen(false)}>*/}
                    {/*        Close*/}
                    {/*    </button>*/}
                    {/*</Footer>*/}
                </Sheet>
            </Portal>
        </div>
    )
}