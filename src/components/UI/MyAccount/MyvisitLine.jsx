import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import useAuth from 'hooks/useAuth';
import httpClient from 'services/httpClient';
import { compareAsc, format } from 'date-fns'
import { ru } from 'date-fns/locale';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import { useMemo } from 'react'
function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

export default function MyvisitLine({onlineVisits, offlineVisits}) {
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };


    return (
        <div className="myvisitline">
            <Box sx={{ width: '100%' }}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                        <Tab label="Онлайн запись" {...a11yProps(0)} />
                        <Tab label="Оффлайн запись" {...a11yProps(1)} />
                    </Tabs>
                </Box>
                <TabPanel value={value} index={0}>


                    {
                        onlineVisits?.map((item, index) => (
                            <div className="myvisitlineitem" key={index}>
                                <div className="col-12 d-flex">
                                    <div className="col-4 d-flex">
                                        <div className="imgcontainer mr-8">
                                            <LazyLoadImage
                                                alt={''}
                                                effect="blur"
                                                src={item.doctors.passport_photo}
                                                width={'100%'} />
                                        </div>
                                        <div className="d-flex flex-column justify-content-center">
                                            <p>{item.doctors.FIO}</p>
                                            <span>{item.doctors.speciatlities.name}</span>
                                        </div>
                                    </div>

                                    <div className="col-3 d-flex flex-column justify-content-center">
                                        <span dangerouslySetInnerHTML={{ __html: item.services?.name }} />
                                    </div>

                                    <div className="col-3 d-flex flex-column justify-content-center">
                                        <p>{format(new Date(item.time_from), 'dd MMM yyyy', { locale: ru })}</p>
                                        <span>{format(new Date(item.time_from), 'kk:mm', { locale: ru }) + '-' + format(new Date(item.time_to), 'kk:mm', { locale: ru })}</span>
                                    </div>

                                    <div className="col-2 d-flex flex-column justify-content-center">
                                        <button>{item.status}</button>
                                    </div>
                                </div>
                            </div>
                        ))
                    }



                </TabPanel>
                <TabPanel value={value} index={1}>
                {
                        offlineVisits?.map((item, index) => (
                            <div className="myvisitlineitem" key={index}>
                                <div className="col-12 d-flex">
                                    <div className="col-4 d-flex">
                                        <div className="imgcontainer mr-8">
                                            <LazyLoadImage
                                                alt={''}
                                                effect="blur"
                                                src={item.doctors.passport_photo}
                                                width={'100%'} />
                                        </div>
                                        <div className="d-flex flex-column justify-content-center">
                                            <p>{item.doctors.FIO}</p>
                                            <span>{item.doctors.speciatlities.name}</span>
                                        </div>
                                    </div>

                                    <div className="col-3 d-flex flex-column justify-content-center">
                                        <span dangerouslySetInnerHTML={{ __html: item.services?.name }} />
                                    </div>

                                    <div className="col-3 d-flex flex-column justify-content-center">
                                        <p>{format(new Date(item.time_from), 'dd MMM yyyy', { locale: ru })}</p>
                                        <span>{format(new Date(item.time_from), 'kk:mm', { locale: ru }) + '-' + format(new Date(item.time_to), 'kk:mm', { locale: ru })}</span>
                                    </div>

                                    <div className="col-2 d-flex flex-column justify-content-center">
                                        <button>{item.status}</button>
                                    </div>
                                </div>
                            </div>
                        ))
                    }
                </TabPanel>
            </Box>
        </div>
    );
}