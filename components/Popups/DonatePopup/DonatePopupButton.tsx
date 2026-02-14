'use client';

import React, { useState, useEffect } from "react";

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
import {IconChevronRight, IconCircle, IconCircleDot} from "@tabler/icons-react";
// import {
//     IconBrandApple,
//     IconBrandGoogle,
//     IconBuildingBank,
//     IconCreditCard
// } from "@tabler/icons-react";


export function DonatePopupButton(props: {projectId: string,
    projectTile: string,
    translations: ProjectTranslationsType,
    fullWidth?: boolean,
    size?: string }) {

    const [opened, {open, close}] = useDisclosure(false);

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

    function prepAndOpen() {
        open();
    }

    return <>
        <Modal opened={opened} onClose={close} withCloseButton={false} zIndex={MyZIndexes.DonateModal}
               size="auto" transitionProps={{ transition: 'slide-up' }}>
            <>
                <Center>
                    <Text size="lg" ta="center">
                        {props.translations.DonateFor} <br/><b>{props.projectTile}</b> ?
                    </Text>
                </Center>
                <Divider mt="xs" mb="xs" color="transparent"/>
                {forBank}
            </>
        </Modal>

        <Button style={{ width: props.fullWidth ? 'auto' : 'max-content' }}
                variant="gradient"
                fw={600}
                gradient={{from: 'pink', to: 'yellow', deg: 90}}
                size={props.size || 'sm'}
                onClick={prepAndOpen}>
            {props.translations.Donate}
        </Button>
    </>;
}