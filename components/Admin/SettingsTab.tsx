'use client';

import { FormEvent, useState, useTransition } from 'react';
import {
    ActionIcon,
    Alert,
    Badge,
    Button,
    Group,
    Paper,
    PasswordInput,
    SimpleGrid,
    Stack,
    Table,
    Text,
    TextInput,
    Title,
    Tooltip,
} from '@mantine/core';
import { IconMail, IconPlus, IconTrash } from '@tabler/icons-react';
import {
    type ActionResult,
    addNotificationEmail,
    changeOwnPassword,
    createAdminUser,
    deleteAdminUser,
    removeNotificationEmail,
} from '@/app/admin/actions';
import type { AdminUserInfo } from '@/utils/admin-auth';
import { formatDateTime } from '@/utils/volunteers/admin-data';
import type { AdminUserRow, NotificationEmailRow } from './types';

type Message = { ok: boolean; text: string } | null;

// Runs a server action and turns its result into an inline message.
function useAction() {
    const [pending, startTransition] = useTransition();
    const [message, setMessage] = useState<Message>(null);
    const run = (action: () => Promise<ActionResult>, successText: string, onSuccess?: () => void) =>
        startTransition(async () => {
            const res = await action();
            setMessage(res.ok ? { ok: true, text: successText } : { ok: false, text: res.error });
            if (res.ok) onSuccess?.();
        });
    return { pending, message, setMessage, run };
}

function MessageAlert({ message }: { message: Message }) {
    if (!message) return null;
    return <Alert color={message.ok ? 'green' : 'red'} py="xs">{message.text}</Alert>;
}

function NotificationEmails({ emails }: { emails: NotificationEmailRow[] }) {
    const [email, setEmail] = useState('');
    const { pending, message, setMessage, run } = useAction();

    const add = (e: FormEvent) => {
        e.preventDefault();
        run(() => addNotificationEmail(email), 'Adresa a fost adăugată.', () => setEmail(''));
    };

    return (
        <Paper withBorder radius="md" p="md">
            <Title order={4}>Notificări pe email</Title>
            <Text fz="xs" c="dimmed" mb="md">
                Aceste adrese primesc un email de fiecare dată când se înscrie un voluntar nou.
            </Text>
            <Stack gap="xs">
                {emails.length === 0 && (
                    <Alert color="yellow" py="xs">Nu există nicio adresă – nimeni nu va fi notificat.</Alert>
                )}
                {emails.map((n) => (
                    <Group key={n.id} justify="space-between" wrap="nowrap">
                        <Group gap="xs" wrap="nowrap">
                            <IconMail size={16} color="var(--mantine-color-dimmed)" />
                            <Text fz="sm">{n.email}</Text>
                        </Group>
                        <Tooltip label="Elimină">
                            <ActionIcon variant="subtle" color="red" aria-label={`Elimină ${n.email}`} disabled={pending}
                                        onClick={() => run(() => removeNotificationEmail(n.id), 'Adresa a fost eliminată.')}>
                                <IconTrash size={16} />
                            </ActionIcon>
                        </Tooltip>
                    </Group>
                ))}
                <form onSubmit={add}>
                    <Group gap="xs" align="flex-end" mt="sm" wrap="nowrap">
                        <TextInput type="email" placeholder="adresa@exemplu.ro" value={email} style={{ flex: 1 }}
                                   onChange={(e) => { setEmail(e.currentTarget.value); setMessage(null); }} />
                        <Button type="submit" loading={pending} leftSection={<IconPlus size={16} />} disabled={!email.trim()}>
                            Adaugă
                        </Button>
                    </Group>
                </form>
                <MessageAlert message={message} />
            </Stack>
        </Paper>
    );
}

function AdminAccounts({ me, users }: { me: AdminUserInfo; users: AdminUserRow[] }) {
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const { pending, message, run } = useAction();

    const create = (e: FormEvent) => {
        e.preventDefault();
        run(() => createAdminUser(email, name, password), 'Contul a fost creat. Trimite-i persoanei parola pe un canal sigur.', () => {
            setEmail('');
            setName('');
            setPassword('');
        });
    };

    const remove = (u: AdminUserRow) => {
        if (!window.confirm(`Ștergi contul ${u.email}?`)) return;
        run(() => deleteAdminUser(u.id), 'Contul a fost șters.');
    };

    return (
        <Paper withBorder radius="md" p="md">
            <Title order={4}>Conturi de administrare</Title>
            <Text fz="xs" c="dimmed" mb="md">Persoanele care au acces la datele voluntarilor.</Text>
            <Table.ScrollContainer minWidth={420}>
                <Table verticalSpacing="xs">
                    <Table.Thead>
                        <Table.Tr>
                            <Table.Th>Cont</Table.Th>
                            <Table.Th>Ultima autentificare</Table.Th>
                            <Table.Th />
                        </Table.Tr>
                    </Table.Thead>
                    <Table.Tbody>
                        {users.map((u) => (
                            <Table.Tr key={u.id}>
                                <Table.Td>
                                    <Group gap="xs">
                                        <Text fz="sm" fw={500}>{u.name ?? u.email}</Text>
                                        {u.id === me.id && <Badge size="xs" variant="light">tu</Badge>}
                                    </Group>
                                    {u.name && <Text fz="xs" c="dimmed">{u.email}</Text>}
                                </Table.Td>
                                <Table.Td>
                                    <Text fz="sm">{u.lastLoginAt ? formatDateTime(u.lastLoginAt) : '—'}</Text>
                                </Table.Td>
                                <Table.Td ta="right">
                                    {u.id !== me.id && (
                                        <ActionIcon variant="subtle" color="red" aria-label={`Șterge ${u.email}`}
                                                    disabled={pending} onClick={() => remove(u)}>
                                            <IconTrash size={16} />
                                        </ActionIcon>
                                    )}
                                </Table.Td>
                            </Table.Tr>
                        ))}
                    </Table.Tbody>
                </Table>
            </Table.ScrollContainer>

            <form onSubmit={create}>
                <Text fz="sm" fw={600} mt="md" mb="xs">Adaugă un cont</Text>
                <SimpleGrid cols={{ base: 1, sm: 3 }} spacing="xs">
                    <TextInput type="email" placeholder="Email" required value={email}
                               onChange={(e) => setEmail(e.currentTarget.value)} />
                    <TextInput placeholder="Nume (opțional)" value={name} onChange={(e) => setName(e.currentTarget.value)} />
                    <PasswordInput placeholder="Parolă (min. 10 caractere)" required value={password} autoComplete="new-password"
                                   onChange={(e) => setPassword(e.currentTarget.value)} />
                </SimpleGrid>
                <Group justify="flex-end" mt="xs">
                    <Button type="submit" loading={pending} leftSection={<IconPlus size={16} />}>Creează contul</Button>
                </Group>
            </form>
            <MessageAlert message={message} />
        </Paper>
    );
}

function ChangePassword() {
    const [current, setCurrent] = useState('');
    const [next, setNext] = useState('');
    const [confirm, setConfirm] = useState('');
    const { pending, message, setMessage, run } = useAction();

    const submit = (e: FormEvent) => {
        e.preventDefault();
        if (next !== confirm) {
            setMessage({ ok: false, text: 'Parolele noi nu coincid.' });
            return;
        }
        run(() => changeOwnPassword(current, next), 'Parola a fost schimbată.', () => {
            setCurrent('');
            setNext('');
            setConfirm('');
        });
    };

    return (
        <Paper withBorder radius="md" p="md">
            <Title order={4} mb="md">Schimbă-ți parola</Title>
            <form onSubmit={submit}>
                <Stack gap="xs">
                    <PasswordInput label="Parola curentă" required value={current} autoComplete="current-password"
                                   onChange={(e) => setCurrent(e.currentTarget.value)} />
                    <PasswordInput label="Parola nouă" description="Minim 10 caractere" required value={next}
                                   autoComplete="new-password" onChange={(e) => setNext(e.currentTarget.value)} />
                    <PasswordInput label="Confirmă parola nouă" required value={confirm} autoComplete="new-password"
                                   onChange={(e) => setConfirm(e.currentTarget.value)} />
                    <MessageAlert message={message} />
                    <Group justify="flex-end">
                        <Button type="submit" loading={pending}>Schimbă parola</Button>
                    </Group>
                </Stack>
            </form>
        </Paper>
    );
}

export function SettingsTab({ me, notificationEmails, adminUsers }: {
    me: AdminUserInfo;
    notificationEmails: NotificationEmailRow[];
    adminUsers: AdminUserRow[];
}) {
    return (
        <SimpleGrid cols={{ base: 1, md: 2 }} spacing="lg">
            <Stack gap="lg">
                <NotificationEmails emails={notificationEmails} />
                <ChangePassword />
            </Stack>
            <AdminAccounts me={me} users={adminUsers} />
        </SimpleGrid>
    );
}
