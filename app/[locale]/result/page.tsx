import type { Stripe } from "stripe";

import { stripe } from "@/utils/stripe/stripe";
import {Center, Container, Divider} from "@mantine/core";
import commonClasses from "@/utils/commonClasses.module.css";
import {TitleWithDescription} from "@/components/Common/TitleWithDescription";

import {MyZIndexes} from "@/utils/my-constants";
import {ConfettiButton} from "@/components/ConfettiButton/ConfettiButton";
import DonationConfetti from "@/components/CoolEffects/DonationConfetti";
import {track} from "@vercel/analytics/server";
import {getTranslations, unstable_setRequestLocale} from "next-intl/server";
//import confetti from "canvas-confetti";

export default async function ResultPage({searchParams, params}: { searchParams: { session_id: string }, params:{locale:string} } ) {
    unstable_setRequestLocale(params.locale);
    const session_id = searchParams.session_id;
    const t = await getTranslations('DONATIONS');

    if (!session_id)
        throw new Error("Please provide a valid session_id (`cs_test_...`) ");

    const checkoutSession: Stripe.Checkout.Session =
        await stripe.checkout.sessions.retrieve(session_id, {
            expand: ["line_items", "payment_intent"],
        });

    const paymentIntent = checkoutSession.payment_intent as Stripe.PaymentIntent;

    const amountDonated = paymentIntent.amount_received / 100;
    // Assuming there's only one line item and that's the one you need
    const projectName = checkoutSession?.line_items?.data[0].description ?? 'Unknown'; // or `name` depending on how it's stored

    if (paymentIntent.status === 'succeeded')
    {
        try {
            await track('DonationSimpler', {
                amount: amountDonated + ' EUR ' + ' pt. ' + projectName,
            });
        }
        catch (error) {
            console.error(`Error tracking event: ${error}`);
        }

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
    }
    else {
        try {
            await track('DonationFAILED', {
                amount: '' + projectName,
            });
        }
        catch (error) {
            console.error(`Error tracking event: ${error}`);
        }

        return (
            <Container className={commonClasses.container}>
                <TitleWithDescription title={t('ERROR_TITLE')}
                                      description={t('ERROR_MESSAGE')}/>

                <Center>
                    <ConfettiButton text={t('BACK')} link="/" size={"lg"} mt={"xl"}/>
                </Center>

                <Divider color="transparent" mb={150}/>
            </Container>
        );
    }
};