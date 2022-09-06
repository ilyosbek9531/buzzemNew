import Link from 'next/link'
import styles from './MyAccount.module.scss'
import Form from 'react-bootstrap/Form';

export function Mybudget() {
    return (
        <div>
            <h3 className={'mb-24'}>Кошелёк</h3>

            <div className="d-flex">
                <div className={styles.mybudget}>
                    <p>Баланс</p>
                    <span>50 000 сум <button><img src="/images/soroq.svg" alt=""/></button></span>
                </div>

                <div className={styles.mybudget}>
                    <p>Кешбек</p>
                    <span>0 сум <button><img src="/images/soroq.svg" alt=""/></button></span>
                </div>
            </div>
        </div>
    )
}
