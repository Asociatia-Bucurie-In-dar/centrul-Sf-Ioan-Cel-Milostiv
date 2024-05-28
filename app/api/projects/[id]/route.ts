import {NextRequest, NextResponse} from "next/server";
import { PrismaClient } from '@prisma/client';
import cache from '@/utils/cache';

const prisma = new PrismaClient();

export async function GET(req: NextRequest) {

    const projectId:string = req.nextUrl.pathname.split('/').pop() ?? '';

    // Try to get the cached total amount
    let totalAmount:number|null|undefined = null;
    if (cache.has(projectId))
    {
        totalAmount = cache.get(projectId);
    }


    if (totalAmount === null || totalAmount === undefined) {
        totalAmount = await prisma.donation.aggregate({
            _sum: { amount: true },
            where: { causeId: projectId }
        }).then(r => {
            return r._sum.amount ?? 0;
        });

        // Update the cache with the new value
        cache.set(projectId, totalAmount);
    }

    return NextResponse.json({ totalDonated: totalAmount }, { status: 200 });
}