import { Container } from '@mui/material'
import Link from 'next/link'
import styles from './MyAccount.module.scss'
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Row from 'react-bootstrap/Row';
import Tab from 'react-bootstrap/Tab';
import MyvisitLine from "./MyvisitLine";
import MyvisitSquare from "./MyvisitSquare";
import { useEffect, useState } from 'react';
import useAuth from 'hooks/useAuth';
import { useMemo } from 'react';
import httpClient from 'services/httpClient';
import { format } from 'date-fns';

export function Myvisits() {

    const [myvisits, setMyvisits] = useState([])
    const { userId, token, patient, setUserId, setToken, setLogout, setAboutPatient } = useAuth()

    const onlineVisits = useMemo(() => {
        return myvisits.filter(visit => visit.booking_type === 'online').map(visit => ({
            ...visit,
            date: visit.time_from ? format(new Date(visit.time_from), 'dd.MM.yyyy') : null
        }))
    }, [myvisits])

    const offlineVisits = useMemo(() => {
        return myvisits.filter(visit => visit.booking_type === 'offline').map(visit => ({
            ...visit,
            date: visit.time_from ? format(new Date(visit.time_from), 'dd.MM.yyyy') : null
        }))
    }, [myvisits])

    

    const getData = async () => {
        try {

            const res = await httpClient.post('object/get-list/visit_service', { data: { "patients_id": userId } })

            const visits = res.data.response
            // setMyvisits(visits)

            console.log('111 -->', res)

            const specialitesId = visits?.map(visit => visit.doctors.specialities_id)

            const res2 = await httpClient.post('object/get-list/specialities', { data: { specialities_id: specialitesId } })

            console.log('111222 -->', res)


            const computedVisits = visits?.map(visit => ({
                ...visit,
                doctors: {
                    ...visit.doctors,
                    speciatlities: res2?.data?.response?.find(el => el.guid === visit.doctors?.specialities_id)
                }
            }))

            setMyvisits(computedVisits)

        } catch (error) {

        }
    }


    useEffect(() => {
        getData()
    }, [])


    return (
        <div>
            <Tab.Container id="left-tabs-example" defaultActiveKey="first">
            <div className="d-flex justify-content-between">
                <h3 className={'mb-24'}>Мои приёмы</h3>
                <Nav variant="pills" className="">
                    <Nav.Item>
                        <Nav.Link className={'mr-8 myaccStyleMenu'} eventKey="first" href="#">
                            <img src="/images/manuline.svg" alt=""/>
                        </Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link className={'myaccStyleMenu'} eventKey="second" href="#">
                            <img src="/images/menusquare.svg" alt=""/>
                        </Nav.Link>
                    </Nav.Item>
                </Nav>
            </div>
            <div className={styles.myvisit}>
                <Tab.Content>
                    <Tab.Pane eventKey="first">
                        <MyvisitLine onlineVisits={onlineVisits} offlineVisits={offlineVisits}/>
                    </Tab.Pane>
                    <Tab.Pane eventKey="second">
                        <MyvisitSquare onlineVisits={onlineVisits} offlineVisits={offlineVisits}/>
                    </Tab.Pane>
                </Tab.Content>
            </div>
            </Tab.Container>
        </div>
    )
}
