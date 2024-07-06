import { NextResponse } from "next/server";
import cache from '@/utils/cache';

function InvalidateCache() {
    cache.flushAll();
}

export async function POST(req: Request) {
    //OTHER stuff happens on bucurieindar.org's webhook
    InvalidateCache();

    return NextResponse.json({ message: "Received, just reset cache!" }, { status: 200 });
}