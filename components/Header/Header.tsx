'use client';
import Link from 'next/link';
import { Group, Burger, Container, Drawer, Divider, rem } from '@mantine/core';
import { ThemeSwitcher } from '@/components/ThemeSwitcher';
import { useDisclosure, useHeadroom } from '@mantine/hooks';
import {LanguagePicker} from "@/components/LanguagePicker/LanguagePicker";
import {ConfettiButton} from "@/components/ConfettiButton/ConfettiButton";
import { Image } from '@mantine/core';
import classes from './Header.module.css';
import {MyZIndexes} from "@/utils/my-constants";
import logo from '@/public/logoPng.png';
//const contactParent = { link: contact.link, label: contact.label, links: [contact, dash] };


export function Header({ headerTranslations, locale }: { headerTranslations: any, locale:string }) {
    const pinned = useHeadroom({ fixedAt: 120 });
    const headerZIndex = MyZIndexes.Header;

    return (
        <header className={classes.header} style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            zIndex: headerZIndex,
            transform: `translate3d(0, ${pinned ? 0 : rem(-110)}, 0)`,
            transition: 'transform 400ms ease',
            backgroundColor: 'var(--mantine-color-body)',
        }}>
            <Container size="lg">
                <div className={classes.inner}>
                    
                    <Group>
                        <Link href="/">
                            <Image src={logo.src} alt="Logo" width={50} height={50} />
                        </Link>
                        <Divider orientation="vertical" color="transparent"/>
                        <LanguagePicker />
                    </Group>
                    
                    
                    <Group h="100%" gap={5} visibleFrom="sm">
                        
                    </Group>
                    
                    <Group>
                        <ConfettiButton text={headerTranslations.donate}/>
                        <ThemeSwitcher/>
                    </Group>
                </div>
            </Container>
        </header>
    );
}