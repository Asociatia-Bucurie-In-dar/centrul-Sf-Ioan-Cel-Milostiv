'use client';

import React, { useState, useEffect } from "react";

import { createCheckoutSession } from "@/utils/stripe/stripe-actions";
import {
    Button,
    Center,
    Divider,
    Modal, NativeSelect, Text, TextInput, rem, SegmentedControl, UnstyledButton, Checkbox, Paper
} from "@mantine/core";
import {Form} from "@storybook/components";
import {MyZIndexes} from "@/utils/my-constants";
import classes from "./DonatePopupButton.module.css";
import { useDisclosure } from '@mantine/hooks';
import {ProjectTranslationsType} from "@/utils/my-types";
import Link from "next/link";
import {MyRoutePaths} from "@/utils/route-paths";
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
            {
                projectId: props.projectId,
                projectTitle: props.projectTile,
                currencyAmount: Number(input.customDonation),
                //email: input.email,
                agreed: agreeValue,
            };
        const { client_secret, url } = await createCheckoutSession(data);

        setLoading(false);

        if (url)
        {
            setRedirectTo(url as string);
        }
    }

    const [input, setInput] = useState<{ customDonation: string, email: string }> ({ customDonation: '', email: '' } );
    const handleMoneyChange: React.ChangeEventHandler<HTMLInputElement> = (
        e
    ): void => {
        let numberAsString = e.target.value;
        if (numberAsString.length > 0 && numberAsString[0] === '0') {
            numberAsString = numberAsString.slice(1);
        }
        numberAsString = numberAsString.replace(/\D/g, '');

        setBadSum(Number(numberAsString) < 1);

        setInput({customDonation: numberAsString, email: input.email});
    };

    const handleEmailChange: React.ChangeEventHandler<HTMLInputElement> = (e): void => {
        setInput({customDonation: input.customDonation, email: e.target.value});
    };

    const [agreeValue, onAgreeChange] = useState(false);

    const data = [
        { value: 'eur', label: '🇪🇺 EUR' },
        // { value: 'usd', label: '🇺🇸 USD' },
        // { value: 'cad', label: '🇨🇦 CAD' },
        // { value: 'gbp', label: '🇬🇧 GBP' },
        // { value: 'aud', label: '🇦🇺 AUD' },
    ];

    const stopPropagation = (e: React.MouseEvent<HTMLAnchorElement>) => e.stopPropagation();

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
        {/* EMAIL */}
        {/*<TextInput type="email"*/}
        {/*           autoComplete="email"*/}
        {/*           placeholder=""*/}
        {/*           label={"Email"}*/}
        {/*           required*/}
        {/*           size="md"*/}
        {/*           onChange={handleEmailChange}*/}
        {/*           value={input.email}/>*/}

        {/*<Divider mb="xs" color="transparent"/>*/}
        {/* MONEY */}
        <TextInput type="number"
                   placeholder="10 EUR"
                   required
                   label={props.translations.DesiredAmount}
                   rightSection={select}
                   rightSectionWidth={115}
                   size="md"
                   onChange={handleMoneyChange}
                   value={input.customDonation}/>

        <Divider mb="sm" color="transparent"/>
        {/* AGREE CHECK */}
        <UnstyledButton onClick={() => onAgreeChange(!agreeValue)} className={classes.button}>
            <Checkbox
                checked={agreeValue}
                required
                onChange={() => {}}
                tabIndex={-1}
                size="md"
                mr="md"
                styles={{ input: { cursor: 'pointer' } }}
                aria-hidden
                onClick={() => onAgreeChange(!agreeValue)}
            />
            <div>
                <Text fw={500} mb={7} lh={1}>
                    {props.translations.IAgreeWith}:
                </Text>
                <Text fz="sm" fw={600}>
                    <Link href={'/' + props.translations.Locale + MyRoutePaths.Terms} target="_blank" onClick={stopPropagation} className={classes.link}>{props.translations.TermsAndConditions}</Link> {props.translations.And} <Link href={'/' + props.translations.Locale + MyRoutePaths.Privacy} target="_blank" onClick={stopPropagation} className={classes.link}>{props.translations.PrivacyPolicy}</Link>
                </Text>
            </div>
        </UnstyledButton>

        <Divider mb={30} color="transparent"/>
        {/* CONTINUE BUTTON */}
        <Center>
            <Button type="submit" variant="gradient" gradient={{from: 'green', to: 'green', deg: 60}} size="md"
                    disabled={loading} mb="xs">
                {props.translations.Continue}
            </Button>
        </Center>
    </>;

    const forBank = <>
        <Paper withBorder p="lg" radius="md" shadow="md">
            <Center>
                <Text size="lg"><b>RON</b> - RO31BTRLRONCRT0610749705</Text>
            </Center>
            <br></br>
            <Center>
                <Text size ="lg"><b>EUR</b> - RO62BTRLEURCRT0610749702</Text>
            </Center>
            <br></br>
            <Center>
                <Text size="lg"><b>USD</b> - RO66BTRLUSDCRT0610749702</Text>
            </Center>
        </Paper>
    </>;

    return <>
        <Modal opened={opened} onClose={close} withCloseButton={false} zIndex={MyZIndexes.DonateModal}
               size="auto" transitionProps={{ transition: 'slide-up' }}>
            <>
                <Form onSubmit={callDonateAPI}>
                    <Center><Text size="lg">
                        {props.translations.DonateFor} <b>{props.projectTile}</b>
                    </Text></Center>

                    <Divider mt="sm" mb="sm" color="transparent"/>

                    {/* SEGMENTED CONTROL */}
                    <SegmentedControl
                        radius="xl"
                        size="md"
                        data={[payOption1, payOption2]}
                        defaultValue={payOption1}
                        classNames={classes}
                        onChange={(value) => setPayMethod(value)}
                    />

                    <Divider mt="sm" mb="sm" color="transparent"/>

                    {payMethod === payOption1 ? forCard : forBank}

                </Form>
            </>
        </Modal>
        <Button style={{ width: props.fullWidth ? 'auto' : 'max-content' }}
                variant="gradient"
                fw={600}
                gradient={{from: 'pink', to: 'yellow', deg: 90}}
                size="sm"
                onClick={open}>
            {props.translations.Donate}
        </Button>
    </>;
}