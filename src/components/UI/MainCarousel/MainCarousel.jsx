import * as React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link'
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import styles from './MainCarousel.module.scss'
import {Swiper, SwiperSlide} from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import {Autoplay, Pagination, Navigation, A11y} from "swiper";
import {useMemo, useState} from "react";
import IllnessSwiper from "./IllnessSwiper";

function TabPanel(props) {
    const {children, value, index, ...other} = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{p: 3}}>
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

export default function BasicTabs({illness}) {
    const [value, setValue] = React.useState(0);
    const [selectedCategory, setSelectedCategory] = useState('adult')
    const filteredIlness = useMemo(() => {
        return illness?.filter((el) => el.type === selectedCategory)
    })
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1
    };

    return (
        <section className={styles.maincarousel}>
            <div className="container-lg">
                <div className="container-lg">
                    <div className={styles.maincarouseltitle}>
                        <h3>Выберите что вас беспокоит</h3>
                        <Box sx={{borderBottom: 1, borderColor: 'divider'}}>
                            <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                                <Tab className={styles.btn} label="Взрослые" {...a11yProps(0)} />
                                <Tab className={styles.btn} label="Дети" {...a11yProps(1)} />
                            </Tabs>
                        </Box>
                    </div>
                </div>

                <div className={styles.maincarouselbody}>
                    <TabPanel value={value} index={0}>
                        <IllnessSwiper illness={illness} category="adult" />
                    </TabPanel>
                    <TabPanel value={value} index={1}>
                    <IllnessSwiper illness={illness} category="child" />
                </TabPanel>

                </div>
            </div>
        </section>
    );

}
