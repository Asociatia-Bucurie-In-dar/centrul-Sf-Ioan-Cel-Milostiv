import {NextResponse} from "next/server";


export async function GET(req: Request) {
    return NextResponse.json({ donations: 123123 }, { status: 200 });
}