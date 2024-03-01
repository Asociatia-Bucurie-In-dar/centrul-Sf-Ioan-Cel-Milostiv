import type { Stripe } from "stripe";

import { stripe } from "@/utils/stripe/stripe";
import {Center, Container, Divider} from "@mantine/core";
import commonClasses from "@/utils/commonClasses.module.css";
import {TitleWithDescription} from "@/components/Common/TitleWithDescription";

import {MyZIndexes} from "@/utils/my-constants";
import {ConfettiButton} from "@/components/ConfettiButton/ConfettiButton";
import DonationConfetti from "@/components/CoolEffects/DonationConfetti";
//import confetti from "canvas-confetti";

export default async function ResultPage({searchParams}: { searchParams: { session_id: string } }) {
    if (!searchParams.session_id)
        throw new Error("Please provide a valid session_id (`cs_test_...`)");

    const checkoutSession: Stripe.Checkout.Session =
        await stripe.checkout.sessions.retrieve(searchParams.session_id, {
            expand: ["line_items", "payment_intent"],
        });

    const paymentIntent = checkoutSession.payment_intent as Stripe.PaymentIntent;


    //const fireAllConfettis = () => {
    //    fire(0.25, {spread: 26, startVelocity: 55,});
    //    fire(0.2, {spread: 60,});
    //    fire(0.1, {spread: 120, startVelocity: 25, decay: 0.92, scalar: 1.2});
    //    fire(0.1, {spread: 120, startVelocity: 45,});
    //};
//
    //const defaults = { origin: { y: 0.6 } };
    //const zIndex = MyZIndexes.Confetti;

    //function fire(particleRatio: any, opts: any) {
    //    confetti({...defaults, ...opts,
    //        particleCount: Math.floor(150 * particleRatio),
    //        zIndex: zIndex,
    //    });
    //}
    
    //if (paymentIntent.status === 'succeeded'){
    //    fireAllConfettis();
    //}

    if (paymentIntent.status === 'succeeded')
        return (
        <Container className={commonClasses.container}>
            <TitleWithDescription title={"Mulțumim!"} 
                                  description={"Plata a fost efectuată cu succes."} />
            
            <Center>
            <ConfettiButton text={"Înapoi la proiecte"} size={"lg"} mt={"xl"} />
            </Center>
            
            <DonationConfetti />
            
            <Divider color="transparent" mb={150}/>
        </Container>
    );
    else return (
        <Container className={commonClasses.container}>
            <TitleWithDescription title={"Ups!"}
                                  description={"Plata nu a reuşit."} />

            <Center>
                <ConfettiButton text={"Înapoi la proiecte"} size={"lg"} mt={"xl"} />
            </Center>

            <Divider color="transparent" mb={150}/>
        </Container>
    );
};