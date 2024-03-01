"use client";

import React, { useState, useEffect } from "react";

import { createCheckoutSession } from "@/utils/stripe/stripe-actions";
import {
    Button,
    Center,
    Divider,
    Modal,
    NativeSelect,
    Text,
    TextInput,
    rem,
    SegmentedControl,
    Title, Badge, Paper
} from "@mantine/core";
import {Form} from "@storybook/components";
import {MyZIndexes} from "@/utils/my-constants";
import classes from "./DonatePopupButton.module.css";

import { useDisclosure } from '@mantine/hooks';
import {ProjectTranslationsType} from "@/utils/my-types";
// import {
//     IconBrandApple,
//     IconBrandGoogle,
//     IconBuildingBank,
//     IconCreditCard
// } from "@tabler/icons-react";


export function DonatePopupButton(props: {projectId: string,
    projectTile: string,
    translations: ProjectTranslationsType,
    fullWidth?: boolean}) {

    const payOption1 = props.translations.CardOption;
    const payOption2 = props.translations.BankTransferOption;
    
    const [loading, setLoading] = useState(false);
    const [badSum, setBadSum] = useState(true);
    const [payMethod, setPayMethod] = useState(payOption1);
    const [redirectTo, setRedirectTo] = useState('');
    useEffect(() => {
        if (redirectTo) {
            window.location.assign(redirectTo);
        }
    }, [redirectTo]);
    
    const callDonateAPI = async (event: any) => {
        event.preventDefault();
        
        setLoading(true);
        const data = 
            {projectId: props.projectId, projectTitle: props.projectTile, currencyAmount: Number(input.customDonation) };
        const { client_secret, url } = await createCheckoutSession(data);
        
        setLoading(false);
        
        setRedirectTo(url as string);
    }
    
    const [input, setInput] = useState<{ customDonation: string }> ({ customDonation: '' } );
    const handleInputChange: React.ChangeEventHandler<HTMLInputElement> = (
        e,
    ): void => {
        let numberAsString = e.target.value;
        if (numberAsString.length > 0 && numberAsString[0] === '0') {
            numberAsString = numberAsString.slice(1);
        }
        numberAsString = numberAsString.replace(/\D/g, '');
        
        setBadSum(Number(numberAsString) < 1);
        
        setInput({customDonation: numberAsString});
    };
    
    const data = [
        { value: 'eur', label: '🇪🇺 EUR' },
        // { value: 'usd', label: '🇺🇸 USD' },
        // { value: 'cad', label: '🇨🇦 CAD' },
        // { value: 'gbp', label: '🇬🇧 GBP' },
        // { value: 'aud', label: '🇦🇺 AUD' },
    ];
    
    const iconSize = 25;
    
        const [opened, {open, close}] = useDisclosure(false);

        const select = (
            <NativeSelect
                data={data}
                rightSectionWidth={28}
                styles={{
                    input: {
                        fontWeight: 500,
                        borderTopLeftRadius: 0,
                        borderBottomLeftRadius: 0,
                        width: rem(115),
                        marginRight: rem(-2),
                    },
                }}
            />
        );
        
        const forCard = <>
            <TextInput type="number"
                       placeholder="10 EUR"
                       label={props.translations.DesiredAmount}
                       rightSection={select}
                       rightSectionWidth={115}
                       size="lg"
                       onChange={handleInputChange}
                       value={input.customDonation}/>

            <Divider mb="lg"/>

            <Center>
                <Button type="submit" variant="gradient" gradient={{from: 'green', to: 'green', deg: 60}} size="lg"
                        disabled={loading || badSum}>
                    {props.translations.Continue}
                </Button>
            </Center>
        </>;

    const forBank = <>
        <Paper withBorder p="lg" radius="md" shadow="md">
            <Center>
                <Text size="lg"><b>RON</b> - RO89BTRLEURCRT0610749701</Text>
            </Center>
            <br></br>
            <Center>
                <Text size ="lg"><b>EUR</b> - RO42BTRLRONCRT0610749701</Text>
            </Center>
        </Paper>
    </>;

    return <>
        <Modal opened={opened} onClose={close} withCloseButton={false} zIndex={MyZIndexes.DonateModal}
                   size="auto">
                <Form onSubmit={callDonateAPI}>
                    <Center><Text size="lg">
                        {props.translations.DonateFor} <b>{props.projectTile}</b>
                    </Text></Center>

                    <Divider mt="sm" mb="sm" color="transparent"/>

                    {/* RADIO */}
                    
                    <SegmentedControl
                        radius="xl"
                        size="md"
                        data={[payOption1, payOption2]}
                        defaultValue={payOption1}
                        classNames={classes}
                        onChange={(value) => setPayMethod(value)}
                    />
                    {/* RADIO */}
                    
                    <Divider mt="sm" mb="sm" color="transparent"/>

                    {payMethod === payOption1 ? forCard : forBank}
                    
                </Form>
            </Modal>

            <Button style={{width: props.fullWidth ? 'auto' : 'max-content', minWidth: rem(100)}}
                    variant="gradient"
                    gradient={{from: 'pink', to: 'yellow', deg: 90}}
                    size="sm"
                    mt="md" onClick={open}>
                <b>{props.translations.Donate}</b>
            </Button>
        </>;
}