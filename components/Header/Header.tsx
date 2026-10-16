"use client";

import { usePathname } from 'next/navigation'
import Link from 'next/link';
import { Group, Burger, Container, Drawer, Divider, rem } from '@mantine/core';
import { ThemeSwitcher } from '@/components/ThemeSwitcher';
import { useDisclosure, useHeadroom } from '@mantine/hooks';
import {LanguagePicker} from "@/components/LanguagePicker/LanguagePicker";
import {ConfettiButton} from "@/components/ConfettiButton/ConfettiButton";
import { Image } from '@mantine/core';
import classes from './Header.module.css';
import {MyZIndexes} from "@/utils/my-constants";
import logo from '@/public/sfIoan.png';
import {DonatePopupButton} from "@/components/Popups/DonatePopup/DonatePopupButton";
//const contactParent = { link: contact.link, label: contact.label, links: [contact, dash] };


export function Header({ headerProps, locale }: { headerProps: any, locale:string }) {
    const pathname = usePathname();
    const [drawerOpened, { toggle: toggleDrawer, close: closeDrawer }] = useDisclosure(false);
    const pinned = useHeadroom({ fixedAt: 120 });


    const renderLinks = (links: any) => {
        return links.map((link: any) => {
            let isCurrent = pathname === link.link;
            if (link.label === headerProps.home.label && pathname === `/${locale}`) {
                isCurrent = true;
            }
            return (
                <Link href={link.link} key={link.label}
                      className={classes.link}
                      data-active={isCurrent || undefined}>
                    {link.label}
                </Link>
            );
        });
    };

    const links = headerProps.links;
    const helpLink = (
        <Link href={headerProps.help.link} className={classes.helpLink}
              data-active={pathname === headerProps.help.link || undefined}>
            {headerProps.help.label}
        </Link>
    );

    const headerItems = renderLinks(links);
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
            <Container size="xl">
                <div className={classes.inner}>

                    <Group wrap="nowrap" gap="sm">
                        <Link href={headerProps.home.link} key={headerProps.home.label} style={{ display: 'block', flex: 'none' }}>
                            <Image src={logo.src} alt="Logo" w={50} h={50} fit="contain" style={{ flex: 'none' }}/>
                        </Link>
                        <Divider orientation="vertical" color="transparent"/>
                        <LanguagePicker />
                    </Group>
                    
                    <Group visibleFrom="lg" gap="xs" wrap="nowrap">
                        <Group h="100%" gap={2} wrap="nowrap" mr="xs">
                            {headerItems}
                        </Group>
                        {helpLink}
                        <DonatePopupButton projectId={headerProps.id}
                                           projectTile={headerProps.project.title}
                                           fullWidth={false}
                                           translations={headerProps.donatePopupTranslations}/>
                        <ThemeSwitcher/>
                    </Group>
                    <Group hiddenFrom="lg" wrap="nowrap" gap="sm">
                        <DonatePopupButton projectId={headerProps.id}
                                           projectTile={headerProps.project.title}
                                           fullWidth={false}
                                           translations={headerProps.donatePopupTranslations}/>
                        <Burger opened={drawerOpened} onClick={toggleDrawer} size="sm" aria-label={headerProps.burgerMenuLabel}/>

                    </Group>
                </div>
            </Container>
            <Drawer
                opened={drawerOpened}
                onClose={closeDrawer}
                size="60%"
                padding="lg"
                hiddenFrom="lg"
                zIndex={MyZIndexes.MobileMenu}
            >
                <Divider my="sm" />
                <div onClick={closeDrawer}>
                    {headerItems}
                    <Divider my="sm" />
                    {helpLink}
                </div>
                <Divider my="sm" />
                <Group justify="left" px="md">
                    <ThemeSwitcher/>
                </Group>
            </Drawer>
        </header>
    );
}