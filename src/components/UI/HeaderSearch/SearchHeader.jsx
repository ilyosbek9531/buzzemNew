import useTranslation from 'next-translate/useTranslation'
import Link from 'next/link'
import { useRouter } from 'next/router'
import styles from './SearchHeader.module.scss'
import InputHints from "react-input-hints";

export function SearchBar(props) {

// const handleInput = (e) => {
//   setSearchVal(e.target.value);
// }

    return (
        <div className={styles.container}>
            <div className={styles.inputwrap}>
                <img src="/images/search.svg" alt="" />
                <label
                    htmlFor="productsearch"
                    id={styles.inputlabel}
                >
                    Product Search
                </label>
                {/*<input*/}
                {/*    // onChange={handleInput}*/}
                {/*    type="text"*/}
                {/*    name="product-search"*/}
                {/*    id={styles.productsearch}*/}
                {/*    placeholder="Поиск в клинике"*/}
                {/*/>*/}
                <InputHints className={styles.formControl} aria-label="Search"
                            id={styles.productsearch}
                            placeholders={[
                                'УЗИ',
                                'Грипп',
                                'Гинекологи',
                                'Массаж',
                                'Косметология',
                                'Боль в спине',
                            ]} />
            </div>
        </div>
    );
}