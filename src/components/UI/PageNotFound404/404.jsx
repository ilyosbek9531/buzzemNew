import { Container } from '@mui/material'
import Link from 'next/link'
import styles from './404.module.scss'

export function PageNotFound() {
    return (
        <div className={styles.mainContainer}>
            <div className="container-lg" >
                <div className="d-flex flex-column align-items-center justify-content-center">
                    <img src="/images/404.svg" alt=""/>
                    <p>Страница не найдена</p>
                    <Link href={'/'}>
                        <a>
                            Вернуться на главную страницу
                        </a>
                    </Link>
                </div>
            </div>
        </div>
    )
}
