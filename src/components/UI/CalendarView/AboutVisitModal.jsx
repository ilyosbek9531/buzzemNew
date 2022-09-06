import { Container } from '@mui/material'
import { format } from 'date-fns'
import useTimeList from 'hooks/useTimeList'
import Link from 'next/link'
import { Modal } from 'react-bootstrap'
import styles from './CalendarView.module.scss'
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import ScheduleIcon from '@mui/icons-material/Schedule';
import AddLocationOutlinedIcon from '@mui/icons-material/AddLocationOutlined';
import { ru } from 'date-fns/locale';

export function AboutVisitModal(props) {
    const { timeList } = useTimeList(30)
    const visitInfoForModal = props.modalInfo ?? {}

    return (
        <Modal
            {...props}
            size="xl"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>

            </Modal.Header>
            <Modal.Body>
                <div>
                    <div className={styles.AboutVisitModalHeader}>
                        <h4>{visitInfoForModal?.services?.name}</h4>
                        <p dangerouslySetInnerHTML={{ __html: visitInfoForModal?.services?.description}}/>
                    </div>

                    <hr className={styles.AboutVisitModalHr}/>

                    <div className={styles.AboutVisitModalBody}>
                        <div className={styles.modalBodyImage}>
                            <img className={'h-100'} src={visitInfoForModal?.doctors?.passport_photo} alt="" />
                        </div>

                        <div className={styles.modalBodyInfo}>
                            <p>{visitInfoForModal?.doctors?.FIO}</p>
                            <p>{visitInfoForModal?.price} cум</p>

                            <p>Статус приёма: <span>{visitInfoForModal.status}</span></p>

                            {/*<p>Оплачивает прием: Работадатель</p>*/}

                            {/*<p>Способ оплаты: Payme</p>*/}

                            <div className={styles.CheckOrderLeftSecondContainerItemInfoFoot}>
                                <div className='d-flex me-3'>
                                    <CalendarTodayIcon className={'me-2'}/>
                                    <span>{visitInfoForModal?.time_from ? format(new Date(visitInfoForModal?.time_from), 'EEEEEE, dd MMM', { locale: ru }) : ''}</span>
                                </div>

                                <div className='d-flex me-3'>
                                    <ScheduleIcon className={'me-2'}/>
                                    <span>{visitInfoForModal?.time_from ? format(new Date(visitInfoForModal?.time_from), 'HH:mm') : ''}</span>
                                </div>

                                {/*<div className='d-flex'>*/}
                                {/*    <AddLocationOutlinedIcon />*/}
                                {/*    <span>Шайхантахур, А. Кодирий 39</span>*/}
                                {/*</div>*/}
                            </div>
                        </div>
                    </div>
                </div>
            </Modal.Body>
        </Modal>
    )
}
