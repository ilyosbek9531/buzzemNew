import useTranslation from 'next-translate/useTranslation'
import styles from './About.module.scss'
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import React, {useEffect, useState} from "react";
import httpClient from "../../../services/httpClient";
import Link from "next/link";

export function AboutInfo({branchInfo}) {
    const {t} = useTranslation('about')
    const [branchReccomend, setbranchReccomend] = useState([])
    const BranchGuid = branchInfo.data.response.guid

    useEffect(() => {
        httpClient.post('object/get-list/branch_offers', {data: {limit: 3, offset: 0, 'branches_id': BranchGuid}})
            .then(res => setbranchReccomend(res.data.response))
    }, [])
    return (
        <section className={styles.BranchesInfoSection}>
            <div className={`${styles.BranchInfoTitle} container-lg`}>
                <h2>{branchInfo.data.response.name}</h2>

                <div>
                    <img src={branchInfo.data.response.photo} alt=""/>
                </div>
            </div>

            <div className={styles.ourSuggestions}>
                <div className="container-lg">
                    <h3>Что мы предлагаем</h3>

                    <div className={styles.ourSuggestionsItems}>

                        {
                            branchReccomend?.map((branchReccomends, index) => (
                                <div className={styles.ourSuggestionsItem} key={branchReccomends.id}>

                                    {branchReccomends.icon}

                                    <h4>{branchReccomends.title}</h4>

                                    <p dangerouslySetInnerHTML={{ __html: branchReccomends.description }} />
                                </div>
                            ))
                        }


                    </div>
                </div>
            </div>
        </section>
    )
}
