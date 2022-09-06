import {Footer} from 'components/UI/Footer/Footer'
import {Header} from 'components/UI/Header/Header'
import {FixedButtonHelp} from "../UI/FixedButtonHelp/FixedButtonHelp";
import {useIsMobile} from "../../hooks/useIsMobile";
import {HeaderMobile} from "../UI/Header/HeaderMobile";
import {MobileServiceFixedBtn} from "../UI/FixedButtonHelp/MobileServiceFixedBtn";

export default function ServiceLayout({children}) {
    const isMobile = useIsMobile()

    return (
        <>
            {isMobile ? <HeaderMobile isFixed={false}  /> : <Header isFixed={false}/>}
            {children}
            <Footer/>
        </>
    )
}
