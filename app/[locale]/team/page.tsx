import commonClasses from "@/utils/commonClasses.module.css";
import {Container, Divider} from "@mantine/core";
import {getTranslations, setRequestLocale} from "next-intl/server";
import {use} from "react";
import {TeamDetails} from "@/components/OurTeam/OurTeam";

export async function generateMetadata({params}: { params: Promise<{locale: string}> }) {
    const {locale} = await params;
    const t = await getTranslations({locale, namespace: 'OUR_TEAM'});
    return {
        title: t('TITLE'),
        description: t('SHORT_DESCRIPTION'),
    };
}

export default function TeamPage({params}: {params: Promise<{locale: string}>}) {
    const {locale} = use(params);
    setRequestLocale(locale);

    return (
        <Container size="full" className={commonClasses.container}>
            <TeamDetails/>
            <Divider color="transparent" pb={100}/>
        </Container>
    );
}
