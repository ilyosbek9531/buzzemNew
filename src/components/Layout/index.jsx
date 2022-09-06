import {Footer} from 'components/UI/Footer/Footer'
import {Header} from 'components/UI/Header/Header'
import {FixedButtonHelp} from "../UI/FixedButtonHelp/FixedButtonHelp";
import {useIsMobile} from "../../hooks/useIsMobile";
import {useState} from "react";
import {HeaderMobile} from "../UI/Header/HeaderMobile";
import {MobileBottomSheetMessageOrder} from "../UI/FixedButtonHelp/MobileFixed";

export default function MainLayout({children}) {
    const isMobile = useIsMobile()

    return (
        <>
            {isMobile ? <HeaderMobile isFixed /> : <Header isFixed/>}
            {children}
            {isMobile ? <MobileBottomSheetMessageOrder/> : <FixedButtonHelp/>}
            <Footer/>
        </>
    )
}
