import {Center, Container, Divider} from "@mantine/core";
import commonClasses from "@/utils/commonClasses.module.css";
import {TitleWithDescription} from "@/components/Common/TitleWithDescription";
import {ConfettiButton} from "@/components/ConfettiButton/ConfettiButton";
import DonationConfetti from "@/components/CoolEffects/DonationConfetti";
import {getTranslations, setRequestLocale} from "next-intl/server";

export default async function ResultPage({params}: {params: Promise<{locale: string}>}) {
    const {locale} = await params;
    setRequestLocale(locale);
    const t = await getTranslations('DONATIONS');

    return (
        <Container className={commonClasses.container}>
            <TitleWithDescription title={t('SUCCESS_TITLE')}
                                  description={t('SUCCESS_MESSAGE')} />
            <Center>
                <ConfettiButton text={t('BACK')} link="/" size={"lg"} mt={"xl"} />
            </Center>
            <DonationConfetti />
            <Divider color="transparent" mb={150}/>
        </Container>
    );
};