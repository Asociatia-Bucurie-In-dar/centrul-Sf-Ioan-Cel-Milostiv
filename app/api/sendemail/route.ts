import {NextResponse} from "next/server";
import {Resend} from 'resend';

export async function POST(req: Request)
{
    const resend = new Resend(process.env.RESEND_API_KEY as string);
    const body = await req.json();
    
    try {
        
        const {data} = await resend.emails.send({
            from: 'Bucurie in Dar <office@bucurieindar.ro>',
            to: 'office@bucurieindar.ro',
            subject: `Mesaj pe Sf. Ioan, de la ${body.name}`,
            html: '<p>' + body.message + ' ---- de la: ' + body.email + '</p>',
        });

        console.log('email sent');
        return NextResponse.json(data);
    }
    catch (err) {
        console.log(err);
        return NextResponse.json(
            { message: "Webhook handler failed" },
            { status: 500 },
        );
    }
}
