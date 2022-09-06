import Link from 'next/link'
import styles from './Prices.module.scss'
import * as React from 'react';
import {Nav} from "react-bootstrap";
import IconGenerator from "../IconGenerator/IconGenerator";


export function MobilePrices(services) {

    const categories = services.services.categories
    return (
        <section className={styles.MobilePricesSection}>
            <div className="container-lg">
                <h3>Стоимости услуг</h3>

                <div className={`d-flex flex-column ${styles.MobilePricesItems}`}>

                    {
                        categories?.map((catlist, index) => (
                            <Link href={`prices/${catlist.guid}`} key={index}>
                                <a>
                                    <div className={'me-2'}>
                                        <IconGenerator icon={catlist.icon}/>
                                    </div>
                                    <span>{catlist.name}</span>
                                </a>
                            </Link>
                        ))
                    }
                </div>

            </div>
        </section>
    )
}