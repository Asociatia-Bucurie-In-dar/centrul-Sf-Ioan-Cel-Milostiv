'use client';

import React from "react";
import {
    Button,
    CopyButton,
    ActionIcon,
    Tooltip,
    Center,
    Divider,
    Modal,
    Text,
    Stack,
    Group,
    Badge,
    Paper,
} from "@mantine/core";
import { MyZIndexes } from "@/utils/my-constants";
import { useDisclosure } from '@mantine/hooks';
import { ProjectTranslationsType } from "@/utils/my-types";
import { IconCopy, IconCheck } from "@tabler/icons-react";

const ACCOUNTS = [
    { currency: "RON", iban: "RO47BTRLRONCRT0610749708", label: "Cont bancar lei" },
    { currency: "EUR", iban: "RO35BTRLEURCRT0610749703", label: "Cont bancar euro" },
];

function IbanRow({ currency, iban, label }: { currency: string; iban: string; label: string }) {
    return (
        <Paper withBorder p="lg" radius="md">
            <Group justify="space-between" wrap="nowrap">
                <Stack gap={4}>
                    <Group gap="xs">
                        <Badge variant="gradient" gradient={{ from: 'orange', to: 'yellow', deg: 90 }} size="lg">
                            {currency}
                        </Badge>
                        <Text size="md" c="dimmed">{label}</Text>
                    </Group>
                    <Text size="md" ff="monospace" fw={500}>{iban}</Text>
                </Stack>
                <CopyButton value={iban} timeout={2000}>
                    {({ copied, copy }) => (
                        <Tooltip label={copied ? 'Copied' : 'Copy'} withArrow>
                            <ActionIcon color={copied ? 'teal' : 'gray'} variant="subtle" onClick={copy}>
                                {copied ? <IconCheck size={18} /> : <IconCopy size={18} />}
                            </ActionIcon>
                        </Tooltip>
                    )}
                </CopyButton>
            </Group>
        </Paper>
    );
}

export function DonatePopupButton(props: {
    projectId: string;
    projectTile: string;
    translations: ProjectTranslationsType;
    fullWidth?: boolean;
    size?: string;
}) {
    const [opened, { open, close }] = useDisclosure(false);

    return (
        <>
            <Modal
                opened={opened}
                onClose={close}
                withCloseButton
                zIndex={MyZIndexes.DonateModal}
                size="md"
                transitionProps={{ transition: 'slide-up' }}
                radius="lg"
                padding="lg"
                styles={{ header: { paddingBottom: 0 } }}
            >
                <Center>
                    <Text size="lg" ta="center">
                        {props.translations.DonateFor} <br /><b>{props.projectTile}</b>
                    </Text>
                </Center>
                <Divider mt="md" mb="md" />
                <Stack gap="sm">
                    {ACCOUNTS.map((acc) => (
                        <IbanRow key={acc.currency} {...acc} />
                    ))}
                </Stack>
            </Modal>

            <Button
                style={{ width: props.fullWidth ? 'auto' : 'max-content' }}
                variant="gradient"
                fw={600}
                gradient={{ from: 'pink', to: 'yellow', deg: 90 }}
                size={props.size || 'sm'}
                onClick={open}
            >
                {props.translations.Donate}
            </Button>
        </>
    );
}