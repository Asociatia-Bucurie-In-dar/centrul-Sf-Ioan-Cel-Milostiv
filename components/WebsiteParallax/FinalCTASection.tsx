import {Container, Title, Text, Button, Group, Divider, rem, Stack, Center, Image, Anchor} from '@mantine/core';
import {useTranslations} from "next-intl";
import classes from './FinalCTASection.module.css';
import {IconFileTypePdf, IconMail, IconMapPin, IconPhone} from '@tabler/icons-react';
import {contactInfo} from "@/content/contact/my-contact";

export function FinalCTASection() {
    const t = useTranslations('FINAL_CTA');

    return (
        <div className={classes.root}>
            <div className={classes.background}>
                <Image
                    src="/new/6.webp"
                    alt="Call to Action"
                    style={{objectFit: 'cover', objectPosition: 'center', width: '100%', height: '100%', position: 'absolute'}}
                />
            </div>
            <div className={classes.overlay}/>
            <Container size="md" className={classes.content} pt={70} pb={75}>
                <Title order={2} ta="center" className={classes.title}>
                    {t('TITLE')}
                </Title>

                <Text ta="center" mt="xl" fz="lg" fw={500} fs="italic" className={classes.quote}>
                    „{t('QUOTE')}"
                </Text>

                <Divider mt="xl" mb="xl" color="transparent"/>

                <Center>
                    <Group gap="md" wrap="wrap" justify="center">
                        <Button
                            component="a"
                            href="/info2.pdf"
                            target="_blank"
                            rel="noopener noreferrer"
                            variant="gradient"
                            gradient={{from: 'pink', to: 'yellow', deg: 90}}
                            size="lg"
                            fw={600}
                            rightSection={<IconFileTypePdf size={18}/>}
                        >
                            {t('DOWNLOAD_PDF')}
                        </Button>
                        <Button
                            component="a"
                            href="/contact"
                            variant="white"
                            size="lg"
                            fw={600}
                        >
                            {t('CONTACT_US')}
                        </Button>
                        <Button
                            component="a"
                            href="/contact"
                            variant="outline"
                            color="white"
                            size="lg"
                            fw={600}
                        >
                            {t('BECOME_VOLUNTEER')}
                        </Button>
                    </Group>
                </Center>

                <Divider mt="xl" mb="lg" color="transparent"/>

                <Stack align="center" gap="xs">
                    <Group gap="xs">
                        <IconMapPin size={18} color="white"/>
                        <Text c="white" fw={500}>{contactInfo.address}</Text>
                    </Group>
                    <Group gap="xs">
                        <IconPhone size={18} color="white"/>
                        <Text c="white" fw={500}>{contactInfo.phone}</Text>
                    </Group>
                    <Group gap="xs">
                        <IconMail size={18} color="white"/>
                        <Anchor href={`mailto:${contactInfo.email}`} c="white" fw={500}>
                            {contactInfo.email}
                        </Anchor>
                    </Group>
                    <Divider mt="xs" color="transparent"/>
                    <Group gap="md">
                        <Anchor href="https://bucurieindar.ro" target="_blank" rel="noopener noreferrer" c="white" fw={500} fz="sm">
                            www.bucurieindar.ro
                        </Anchor>
                        <Anchor href="https://centrulsfantulioancelmilostiv.org" target="_blank" rel="noopener noreferrer" c="white" fw={500} fz="sm">
                            www.centrulioancelmilostiv.org
                        </Anchor>
                    </Group>
                </Stack>
            </Container>
        </div>
    );
}
