import SEO from 'seo'
import {AboutInfo} from "../../components/UI/About/AboutInfo";
import httpClient from "../../services/httpClient";

export default function AboutBranches({branchInfo}) {
    return (
        <>
            <SEO />
            <AboutInfo branchInfo={branchInfo}/>
        </>
    )
}

export async function getServerSideProps(ctx) {
    const queryId = ctx.query.id

    const branchInfo = await httpClient.get(`object/branches/${queryId}`)

    return { props: {
            branchInfo
        }}
}

AboutBranches.layout = "MainLayout"