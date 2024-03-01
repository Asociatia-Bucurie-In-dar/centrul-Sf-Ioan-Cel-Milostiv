"use client";

import {
    Text,
    Title,
    SimpleGrid,
    TextInput,
    Textarea,
    Button,
    Group,
    ActionIcon, Divider, Container, Center,
} from '@mantine/core';
import { IconBrandFacebook, IconBrandWhatsapp } from '@tabler/icons-react';
import { ContactIcons } from './ContactIcons';
import classes from './ContactPanel.module.css';
import commonClasses from '@/utils/commonClasses.module.css';
import Link from "next/link";
import {MyRoutePaths} from "@/utils/route-paths";
import {useState} from "react";
import {contactInfo} from "@/content/contact/my-contact";
import {ContactTranslationType} from "@/utils/my-types";

const social = 
    [{icon: IconBrandFacebook, link: contactInfo.facebookLink},
        {icon: IconBrandWhatsapp, link: "https://wa.me/" + contactInfo.phoneForWhatsapp}];

export function ContactPanel(props: { translations: ContactTranslationType }) {
    const icons = social.map((props, index) => (
        <ActionIcon key={index} size={33} className={classes.social} variant="transparent"
        component={Link} href={props.link}>
            <props.icon size="1.6rem" stroke={1.5} />
        </ActionIcon>
    ));
    
    //SUBMISSION STUFF

    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        setLoading(true);

        // POST form data to API route
        const response = await fetch('/api/sendemail', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, name, message }),
        });

        const data = await response.json();
        
        if (response.ok) {
            alert(props.translations.Success);
            setEmail('');
            setName('');
            setMessage('');
        } else {
            alert(props.translations.Error);
        }
        
        setLoading(false);
    };

    //END SUBMISSION STUFF

    return (
        <div>
            <Divider color="transparent" mb="xl"/>
        <div className={classes.wrapper}>
            <SimpleGrid cols={{ base: 1, sm: 2 }} spacing={50}>
                <div>
                    <Title mb="sm" className={classes.title}>
                        {props.translations.FormTitle}
                    </Title>
                    {/*<Text className={classes.description}>*/}
                    {/*    {"Anularea plăților recurente se poate face şi în secțiunea"}{" "}*/}
                    {/*    <Text inherit variant="gradient" component="span" gradient={{ from: 'yellow', to: 'yellow' }}>*/}
                    {/*        <Link href={MyRoutePaths.Home.link}>*/}
                    {/*            <b>{MyRoutePaths.Dash.label}</b>*/}
                    {/*        </Link>*/}
                    {/*    </Text>*/}
                    {/*</Text>*/}
                    <Text className={classes.description} mt="sm" mb={30}>
                        <b>
                            {props.translations.Disclaimer}
                        </b>
                    </Text>

                    <ContactIcons translations={props.translations}/>

                    <Group mt="xl">{icons}</Group>
                </div>
                <form className={classes.form} onSubmit={handleSubmit}>
                   {/*<Center> <Text c="dimmed"><b>În construcție</b></Text> </Center>*/}
                    <Divider color="transparent" mb="md"/>
                    <TextInput
                        value={email}
                        onChange={(e) => setEmail(e.currentTarget.value)}
                        label={props.translations.Email}
                        required
                        classNames={{ input: classes.input, label: classes.inputLabel }}
                    />
                    <TextInput
                        value={name}
                        onChange={(e) => setName(e.currentTarget.value)}
                        label={props.translations.Name}
                        mt="md"
                        classNames={{ input: classes.input, label: classes.inputLabel }}
                    />
                    <Textarea
                        value={message}
                        onChange={(e) => setMessage(e.currentTarget.value)}
                        required
                        label={props.translations.YourMessage}
                        minRows={4}
                        mt="md"
                        classNames={{ input: classes.input, label: classes.inputLabel }}
                    />

                    <Group justify="flex-end" mt="md">
                        <Button className={classes.control} type="submit" disabled={loading}>
                            {props.translations.Send} 
                        </Button>
                    </Group>
                </form>
            </SimpleGrid>
        </div>
        </div>
    );
}