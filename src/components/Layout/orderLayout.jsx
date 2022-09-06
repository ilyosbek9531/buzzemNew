import {Footer} from 'components/UI/Footer/Footer'
import {Header} from 'components/UI/Header/Header'
import {FixedButtonHelp} from "../UI/FixedButtonHelp/FixedButtonHelp";
import {useIsMobile} from "../../hooks/useIsMobile";
import {useState} from "react";
import {HeaderMobile} from "../UI/Header/HeaderMobile";
import {MobileBottomSheetMessageOrder} from "../UI/FixedButtonHelp/MobileFixed";

export default function orderLayout({children}) {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const isMobile = useIsMobile()

    return (
        <>
            {children}
            {isMobile ? <MobileBottomSheetMessageOrder/> : <FixedButtonHelp/>}
            <Footer/>
        </>
    )
}
