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
            const isCurrent = pathname === link.link;
            return (
                <Link href={link.link} key={link.label}
                      className={classes.link}
                      data-active={isCurrent|| undefined}>
                    {link.label}
                </Link>
            );
        });
    };

// Usage in your component
    const links = [];
    links.push({ label: headerProps.home.label, link: headerProps.home.link });
    // links.push({ label: headerTranslations.projects.label, link: headerTranslations.projects.link });
    // links.push({ label: headerTranslations.about.label, link: headerTranslations.about.link });
    // links.push({ label: headerTranslations.gallery.label, link: headerTranslations.gallery.link });
    // links.push({ label: headerTranslations.blog.label, link: headerTranslations.blog.link });
    links.push({ label: headerProps.contact.label, link: headerProps.contact.link });

    const headerItems = renderLinks(links);
    var headerZIndex = MyZIndexes.Header;

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
                        <Link href={headerProps.home.link} key={headerProps.home.label}>
                            <Image src={logo.src} alt="Logo" width={50} height={50} />
                        </Link>
                        <Divider orientation="vertical" color="transparent"/>
                        <LanguagePicker />
                    </Group>
                    
                    <Group visibleFrom="sm">
                        <Group h="100%" gap={5} visibleFrom="sm" mr="md">
                            {headerItems}
                        </Group>
                        <DonatePopupButton projectId={headerProps.id}
                                           projectTile={headerProps.project.title}
                                           fullWidth={false}
                                           translations={headerProps.donatePopupTranslations}/>
                        <ThemeSwitcher/>
                    </Group>
                    <Group hiddenFrom="sm">
                        <DonatePopupButton projectId={headerProps.id}
                                           projectTile={headerProps.project.title}
                                           fullWidth={false}
                                           translations={headerProps.donatePopupTranslations}/>
                        <Burger opened={drawerOpened} onClick={toggleDrawer} size="sm" />
                    </Group>
                </div>
            </Container>
            <Drawer
                opened={drawerOpened}
                onClose={closeDrawer}
                size="60%"
                padding="lg"
                hiddenFrom="sm"
                zIndex={MyZIndexes.MobileMenu}
            >
                <Divider my="sm" />
                <div onClick={closeDrawer}>
                    {headerItems}
                </div>
                <Divider my="sm" />
                <Group justify="left" px="md">
                    <ThemeSwitcher/>
                </Group>
            </Drawer>
        </header>
    );
}