'use client';

import { ReactNode, useState, useTransition } from 'react';
import {
    Alert,
    Anchor,
    Badge,
    Button,
    Divider,
    Drawer,
    Group,
    Select,
    SimpleGrid,
    Stack,
    Text,
    Textarea,
} from '@mantine/core';
import { IconTrash } from '@tabler/icons-react';
import { deleteVolunteer, updateVolunteer } from '@/app/admin/actions';
import {
    VOLUNTEER_STATUS_LABELS,
    VOLUNTEER_STATUSES,
    VolunteerOptionLabels,
} from '@/content/volunteer/volunteer-options';
import { formatDateTime, VolunteerRecord } from '@/utils/volunteers/admin-data';
import { StatusBadge } from './StatusBadge';

function Field({ label, children }: { label: string; children: ReactNode }) {
    return (
        <div>
            <Text fz="xs" c="dimmed" fw={600} tt="uppercase">{label}</Text>
            <Text fz="sm" component="div" style={{ whiteSpace: 'pre-wrap' }}>{children || '—'}</Text>
        </div>
    );
}

function BadgeList({ keys, labels }: { keys: string[]; labels: Record<string, string> }) {
    if (keys.length === 0) return <>—</>;
    return (
        <Group gap={4} mt={2}>
            {keys.map((k) => <Badge key={k} variant="light" size="sm">{labels[k] ?? k}</Badge>)}
        </Group>
    );
}

const STATUS_OPTIONS = VOLUNTEER_STATUSES.map((s) => ({ value: s, label: VOLUNTEER_STATUS_LABELS[s] }));

function VolunteerDetails({ v, labels, onClose }: { v: VolunteerRecord; labels: VolunteerOptionLabels; onClose: () => void }) {
    const [status, setStatus] = useState(v.status);
    const [notes, setNotes] = useState(v.adminNotes ?? '');
    const [message, setMessage] = useState<{ ok: boolean; text: string } | null>(null);
    const [pending, startTransition] = useTransition();
    const dirty = status !== v.status || notes !== (v.adminNotes ?? '');

    const save = () => startTransition(async () => {
        const res = await updateVolunteer(v.id, status, notes);
        setMessage(res.ok ? { ok: true, text: 'Salvat.' } : { ok: false, text: res.error });
    });

    const remove = () => {
        const name = `${v.firstName} ${v.lastName}`;
        if (!window.confirm(`Ștergi definitiv datele lui ${name}? Acțiunea nu poate fi anulată.`)) return;
        startTransition(async () => {
            const res = await deleteVolunteer(v.id);
            if (res.ok) onClose();
            else setMessage({ ok: false, text: res.error });
        });
    };

    return (
        <Stack gap="md">
            <Group gap="xs">
                <StatusBadge status={v.status} />
                <Text fz="sm" c="dimmed">Înscris pe {formatDateTime(v.createdAt)}</Text>
            </Group>

            <SimpleGrid cols={2} spacing="md">
                <Field label="Email"><Anchor href={`mailto:${v.email}`} fz="sm">{v.email}</Anchor></Field>
                <Field label="Telefon"><Anchor href={`tel:${v.phone.replace(/\s/g, '')}`} fz="sm">{v.phone}</Anchor></Field>
                <Field label="Localitate">{v.city}</Field>
                <Field label="Vârsta">{labels.AGE_RANGES[v.ageRange] ?? v.ageRange}</Field>
                <Field label="Ocupație">{v.occupation}</Field>
                <Field label="Cum a aflat de noi">{v.source ? labels.SOURCES[v.source] ?? v.source : null}</Field>
            </SimpleGrid>

            <Divider />
            <Field label="Arii de implicare"><BadgeList keys={v.areas} labels={labels.AREAS} /></Field>
            <Field label="Competențe"><BadgeList keys={v.skills} labels={labels.SKILLS} /></Field>
            <Field label="Alte competențe">{v.otherSkills}</Field>

            <Divider />
            <SimpleGrid cols={2} spacing="md">
                <Field label="Ore / săptămână">{String(v.hoursPerWeek)}</Field>
                <Field label="Disponibilitate">{labels.AVAILABILITY_TYPES[v.availabilityType] ?? v.availabilityType}</Field>
                <Field label="Mod de implicare">{labels.WORK_MODES[v.workMode] ?? v.workMode}</Field>
                <Field label="Durată asumată">{labels.COMMITMENTS[v.commitment] ?? v.commitment}</Field>
            </SimpleGrid>
            <Field label="Intervale orare"><BadgeList keys={v.timeSlots} labels={labels.TIME_SLOTS} /></Field>

            <Divider />
            <Field label="Experiență relevantă">{v.experience}</Field>
            <Field label="Motivație">{v.motivation}</Field>
            <Text fz="xs" c="dimmed">
                Acord GDPR dat pe {formatDateTime(v.consentAt)} (versiunea textului: {v.consentVersion}). Limba formularului: {v.locale}.
            </Text>

            <Divider label="Administrare" labelPosition="left" />
            <Select label="Status" data={STATUS_OPTIONS} value={status} allowDeselect={false}
                    onChange={(val) => { setStatus(val ?? status); setMessage(null); }} />
            <Textarea label="Notițe interne" autosize minRows={3} maxRows={10} maxLength={5000} value={notes}
                      onChange={(e) => { setNotes(e.currentTarget.value); setMessage(null); }} />
            {message && <Alert color={message.ok ? 'green' : 'red'} py="xs">{message.text}</Alert>}
            <Group justify="space-between">
                <Button variant="subtle" color="red" leftSection={<IconTrash size={16} />} onClick={remove}
                        disabled={pending}>
                    Șterge datele
                </Button>
                <Button onClick={save} loading={pending} disabled={!dirty}>Salvează</Button>
            </Group>
        </Stack>
    );
}

export function VolunteerDrawer({ volunteer, labels, onClose }: {
    volunteer: VolunteerRecord | null;
    labels: VolunteerOptionLabels;
    onClose: () => void;
}) {
    return (
        <Drawer opened={volunteer !== null} onClose={onClose} position="right" size="lg"
                title={volunteer ? <Text fw={700} fz="lg">{volunteer.firstName} {volunteer.lastName}</Text> : null}>
            {volunteer && <VolunteerDetails key={volunteer.id} v={volunteer} labels={labels} onClose={onClose} />}
        </Drawer>
    );
}
