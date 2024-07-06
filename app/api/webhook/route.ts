import type { Stripe } from "stripe";
import { NextResponse } from "next/server";
import {stripe} from "@/utils/stripe/stripe";
import {PrismaClient} from '@prisma/client';
import {contactInfo} from "@/content/contact/my-contact";
import cache from '@/utils/cache';

const prisma = new PrismaClient();

async function saveDonation(donationData: any) {
    return prisma.donation.create({
        data: donationData,
    });
}

function InvalidateCache() {
    cache.flushAll();
}

export async function POST(req: Request) {
    //OTHER stuff happens on bucurieindar.org's webhook
    InvalidateCache();

    return NextResponse.json({ message: "Received, just reset cache!" }, { status: 200 });
}