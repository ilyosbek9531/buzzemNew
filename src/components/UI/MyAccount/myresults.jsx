import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import ShareOutlinedIcon from '@mui/icons-material/ShareOutlined';

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

export default function Myresult() {
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <div>
            <h3 className={'mb-24'}>Результаты</h3>
            <div className="myresult">
                <Box sx={{ width: '100%' }}>
                    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                            <Tab label="Анализы" {...a11yProps(0)} />
                            <Tab label="Заключения врача" {...a11yProps(1)} />
                        </Tabs>
                    </Box>
                    <TabPanel value={value} index={0}>
                        <div className="myresultitem">
                            <div className="col-12 d-flex">
                                <div className="col-4 d-flex">
                                    <div className="imgcontainer mr-12">
                                        <img src="/images/pdf.svg" alt=""/>
                                    </div>
                                    <div className="d-flex flex-column justify-content-center">
                                        <p>анализ_кровь.pdf</p>
                                        <span>165.7 KB</span>
                                    </div>
                                </div>

                                <div className="col-4 d-flex flex-column justify-content-center">
                                    <p>Пн, Июнь 23, 2022</p>
                                </div>

                                <div className="col-4 d-flex justify-content-end">
                                    <button>
                                        Загрузить
                                        <img className={'ml-10'} src="/images/download.svg" alt=""/>
                                    </button>
                                    <button>
                                        Поделиться
                                        <img className={'ml-10'} src="/images/share.svg" alt=""/>
                                    </button>
                                </div>
                            </div>
                        </div>

                        <div className="myresultitem">
                            <div className="col-12 d-flex">
                                <div className="col-4 d-flex">
                                    <div className="imgcontainer mr-12">
                                        <img src="/images/pdf.svg" alt=""/>
                                    </div>
                                    <div className="d-flex flex-column justify-content-center">
                                        <p>анализ_кровь.pdf</p>
                                        <span>165.7 KB</span>
                                    </div>
                                </div>

                                <div className="col-4 d-flex flex-column justify-content-center">
                                    <p>Пн, Июнь 23, 2022</p>
                                </div>

                                <div className="col-4 d-flex justify-content-end">
                                    <button>
                                        Загрузить
                                        <img className={'ml-10'} src="/images/download.svg" alt=""/>
                                    </button>
                                    <button>
                                        Поделиться
                                        <img className={'ml-10'} src="/images/share.svg" alt=""/>
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div className="myresultitem">
                            <div className="col-12 d-flex">
                                <div className="col-4 d-flex">
                                    <div className="imgcontainer mr-12">
                                        <img src="/images/pdf.svg" alt=""/>
                                    </div>
                                    <div className="d-flex flex-column justify-content-center">
                                        <p>анализ_кровь.pdf</p>
                                        <span>165.7 KB</span>
                                    </div>
                                </div>

                                <div className="col-4 d-flex flex-column justify-content-center">
                                    <p>Пн, Июнь 23, 2022</p>
                                </div>

                                <div className="col-4 d-flex justify-content-end">
                                    <button>
                                        Загрузить
                                        <img className={'ml-10'} src="/images/download.svg" alt=""/>
                                    </button>
                                    <button>
                                        Поделиться
                                        <img className={'ml-10'} src="/images/share.svg" alt=""/>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </TabPanel>
                    <TabPanel value={value} index={1}>
                        <div className="myresultitem">
                            <div className="col-12 d-flex">
                                <div className="col-4 d-flex">
                                    <div className="imgcontainer mr-12">
                                        <img src="/images/pdf.svg" alt=""/>
                                    </div>
                                    <div className="d-flex flex-column justify-content-center">
                                        <p>анализ_кровь.pdf</p>
                                        <span>165.7 KB</span>
                                    </div>
                                </div>

                                <div className="col-4 d-flex flex-column justify-content-center">
                                    <p>Пн, Июнь 23, 2022</p>
                                </div>

                                <div className="col-4 d-flex justify-content-end">
                                    <button>
                                        Загрузить
                                        <img className={'ml-10'} src="/images/download.svg" alt=""/>
                                    </button>
                                    <button>
                                        Поделиться
                                        <img className={'ml-10'} src="/images/share.svg" alt=""/>
                                    </button>
                                </div>
                            </div>
                        </div>

                        <div className="myresultitem">
                            <div className="col-12 d-flex">
                                <div className="col-4 d-flex">
                                    <div className="imgcontainer mr-12">
                                        <img src="/images/pdf.svg" alt=""/>
                                    </div>
                                    <div className="d-flex flex-column justify-content-center">
                                        <p>анализ_кровь.pdf</p>
                                        <span>165.7 KB</span>
                                    </div>
                                </div>

                                <div className="col-4 d-flex flex-column justify-content-center">
                                    <p>Пн, Июнь 23, 2022</p>
                                </div>

                                <div className="col-4 d-flex justify-content-end">
                                    <button>
                                        Загрузить
                                        <img className={'ml-10'} src="/images/download.svg" alt=""/>
                                    </button>
                                    <button>
                                        Поделиться
                                        <img className={'ml-10'} src="/images/share.svg" alt=""/>
                                    </button>
                                </div>
                            </div>
                        </div>

                        <div className="myresultitem">
                            <div className="col-12 d-flex">
                                <div className="col-4 d-flex">
                                    <div className="imgcontainer mr-12">
                                        <img src="/images/pdf.svg" alt=""/>
                                    </div>
                                    <div className="d-flex flex-column justify-content-center">
                                        <p>анализ_кровь.pdf</p>
                                        <span>165.7 KB</span>
                                    </div>
                                </div>

                                <div className="col-4 d-flex flex-column justify-content-center">
                                    <p>Пн, Июнь 23, 2022</p>
                                </div>

                                <div className="col-4 d-flex justify-content-end">
                                    <button>
                                        Загрузить
                                        <img className={'ml-10'} src="/images/download.svg" alt=""/>
                                    </button>
                                    <button>
                                        Поделиться
                                        <img className={'ml-10'} src="/images/share.svg" alt=""/>
                                    </button>
                                </div>
                            </div>
                        </div>

                        <div className="myresultitem">
                            <div className="col-12 d-flex">
                                <div className="col-4 d-flex">
                                    <div className="imgcontainer mr-12">
                                        <img src="/images/pdf.svg" alt=""/>
                                    </div>
                                    <div className="d-flex flex-column justify-content-center">
                                        <p>анализ_кровь.pdf</p>
                                        <span>165.7 KB</span>
                                    </div>
                                </div>

                                <div className="col-4 d-flex flex-column justify-content-center">
                                    <p>Пн, Июнь 23, 2022</p>
                                </div>

                                <div className="col-4 d-flex justify-content-end">
                                    <button>
                                        Загрузить
                                        <img className={'ml-10'} src="/images/download.svg" alt=""/>
                                    </button>
                                    <button>
                                        Поделиться
                                        <img className={'ml-10'} src="/images/share.svg" alt=""/>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </TabPanel>
                </Box>
            </div>
        </div>
    );
}