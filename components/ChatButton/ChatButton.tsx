
import classes from './ChatButton.module.css';
import {ActionIcon, Button, rem} from "@mantine/core";
import {IconBrandFacebook, IconBrandWhatsapp} from "@tabler/icons-react";
import {MyZIndexes} from "@/utils/my-constants";
import Link from "next/link";
import {contactInfo} from "@/content/contact/my-contact";

export function ChatButton() {
    return (<>
        <div style={{
            position: 'fixed',
            bottom: '4vh',
            right: '5vw',
            zIndex: MyZIndexes.ChatButton
        }}>
            <ActionIcon size={50}
                        style={{marginRight: rem(8)}}
                variant="gradient"
                aria-label="Gradient action icon"
                gradient={{ from: 'green', to: 'lime', deg: 90 }}
                        component={Link} href={"https://wa.me/" + contactInfo.phoneForWhatsapp} 
                        rel="noopener noreferrer" target="_blank">
                <IconBrandWhatsapp style={{ width: '70%', height: '70%' }} stroke={1.5}/>
            </ActionIcon>
            <ActionIcon size={50}
                        variant="gradient"
                        aria-label="Gradient action icon"
                        gradient={{ from: 'indigo', to: 'blue', deg: 90 }}
                        component={Link} href={contactInfo.facebookLink} 
                        rel="noopener noreferrer" target="_blank">
                <IconBrandFacebook style={{ width: '70%', height: '70%' }} stroke={1.5}/>
            </ActionIcon>
        </div>
    </>);
}