"use server";

import type { Stripe } from "stripe";

import { headers } from "next/headers";

import { formatAmountForStripe } from "@/utils/stripe/stripe-helpers";
import { stripe } from "@/utils/stripe/stripe";

const CURRENCY = "eur";

export async function createCheckoutSession( data: {
    projectId : string,
    projectTitle: string,
    currencyAmount: number,
    //email: string,
    agreed: boolean } ): Promise<{ client_secret: string | null; url: string | null }> {

    if (!data.agreed)
    {
        return {client_secret: null, url: null};
    }

    const origin: string = headers().get("origin") as string;
    const checkoutSession: Stripe.Checkout.Session =
        await stripe.checkout.sessions.create({
            mode: "payment",
            submit_type: "donate",
            payment_method_types: ["card"],
            // customer_email: data.email,
            line_items: [
                {
                    price_data: {
                        currency: CURRENCY,
                        product_data: {
                            name: data.projectTitle,
                        },
                        unit_amount: formatAmountForStripe(data.currencyAmount, CURRENCY),
                    },
                    quantity: 1,
                },
            ],
            success_url: `${origin}/result?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${origin}`,
            locale: "auto",
            metadata:  {
                projectId: data.projectId,
            },
            payment_intent_data: {
                metadata: {
                    projectId: data.projectId,
                },
            },
        });

    return {
        client_secret: checkoutSession.client_secret,
        url: checkoutSession.url,
    };
}