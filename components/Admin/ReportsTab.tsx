'use client';

import { useMemo, useState, useTransition } from 'react';
import {
    Alert,
    Button,
    Group,
    NumberInput,
    Paper,
    SegmentedControl,
    SimpleGrid,
    Table,
    Text,
    Title,
} from '@mantine/core';
import { IconArrowDownRight, IconArrowUpRight, IconCheck } from '@tabler/icons-react';
import { saveAreaNeeds } from '@/app/admin/actions';
import {
    VOLUNTEER_AGE_RANGES,
    VOLUNTEER_AREAS,
    VOLUNTEER_COMMITMENTS,
    VOLUNTEER_SKILLS,
    VOLUNTEER_SOURCES,
    VOLUNTEER_TIME_SLOTS,
    VOLUNTEER_WORK_MODES,
    VolunteerOptionLabels,
} from '@/content/volunteer/volunteer-options';
import {
    computeAreaCapacity,
    countByKey,
    ReportScope,
    VolunteerRecord,
    volunteersInScope,
} from '@/utils/volunteers/admin-data';
import { BarItem, BarList } from './BarList';
import classes from './Admin.module.css';

const DAY_MS = 24 * 60 * 60 * 1000;

function Stat({ label, value, hint }: { label: string; value: string; hint?: string }) {
    return (
        <Paper withBorder radius="md" p="md">
            <Text fz="xs" c="dimmed" fw={600} tt="uppercase">{label}</Text>
            <Text fz={28} fw={700} lh={1.2} mt={4}>{value}</Text>
            {hint && <Text fz="xs" c="dimmed" mt={2}>{hint}</Text>}
        </Paper>
    );
}

// Shortfall vs surplus: sign + icon + color, never color alone.
function Gap({ value }: { value: number }) {
    if (value === 0) return <Text fz="sm" c="dimmed" className={classes.num}>0 h</Text>;
    const short = value < 0;
    return (
        <Group gap={4} justify="flex-end" wrap="nowrap">
            {short ? <IconArrowDownRight size={14} color="var(--mantine-color-red-7)" />
                : <IconArrowUpRight size={14} color="var(--mantine-color-green-7)" />}
            <Text fz="sm" fw={600} c={short ? 'red.7' : 'green.7'} className={classes.num}>
                {short ? '' : '+'}{value} h
            </Text>
        </Group>
    );
}

export function ReportsTab({ volunteers, needs, labels }: {
    volunteers: VolunteerRecord[];
    needs: Record<string, number>;
    labels: VolunteerOptionLabels;
}) {
    const [scope, setScope] = useState<ReportScope>('ACTIVE');
    const [needDraft, setNeedDraft] = useState<Record<string, number>>(needs);
    const [message, setMessage] = useState<{ ok: boolean; text: string } | null>(null);
    const [pending, startTransition] = useTransition();

    const scoped = useMemo(() => volunteersInScope(volunteers, scope), [volunteers, scope]);
    const capacity = useMemo(() => computeAreaCapacity(scoped, needDraft), [scoped, needDraft]);

    const needsDirty = VOLUNTEER_AREAS.some((a) => (needDraft[a] ?? 0) !== (needs[a] ?? 0));
    const constantCount = scoped.filter((v) => v.availabilityType === 'CONSTANT').length;
    const lastMonthCount = useMemo(() => {
        const since = Date.now() - 30 * DAY_MS;
        return volunteers.filter((v) => new Date(v.createdAt).getTime() >= since).length;
    }, [volunteers]);

    const bars = useMemo(() => {
        const toItems = (rows: { key: string; count: number }[], map: Record<string, string>): BarItem[] =>
            rows.map((r) => ({ key: r.key, label: map[r.key] ?? r.key, value: r.count }));
        return {
            areas: toItems(countByKey(scoped, VOLUNTEER_AREAS, (v) => v.areas), labels.AREAS),
            skills: toItems(countByKey(scoped, VOLUNTEER_SKILLS, (v) => v.skills), labels.SKILLS),
            commitment: toItems(countByKey(scoped, VOLUNTEER_COMMITMENTS, (v) => v.commitment), labels.COMMITMENTS),
            timeSlots: toItems(countByKey(scoped, VOLUNTEER_TIME_SLOTS, (v) => v.timeSlots), labels.TIME_SLOTS),
            workMode: toItems(countByKey(scoped, VOLUNTEER_WORK_MODES, (v) => v.workMode), labels.WORK_MODES),
            age: toItems(countByKey(scoped, VOLUNTEER_AGE_RANGES, (v) => v.ageRange), labels.AGE_RANGES),
            source: toItems(countByKey(scoped, VOLUNTEER_SOURCES, (v) => v.source), labels.SOURCES),
        };
    }, [scoped, labels]);

    const saveNeeds = () => startTransition(async () => {
        const res = await saveAreaNeeds(needDraft);
        setMessage(res.ok ? { ok: true, text: 'Necesarul a fost salvat.' } : { ok: false, text: res.error });
    });

    const n = scoped.length;

    return (
        <>
            <Group justify="space-between" mb="md" wrap="wrap">
                <SegmentedControl value={scope} onChange={(v) => setScope(v as ReportScope)} data={[
                    { value: 'ACTIVE', label: 'Doar voluntari activi' },
                    { value: 'PIPELINE', label: 'Activi + noi + contactați' },
                ]} />
                <Text fz="xs" c="dimmed">Statusul se schimbă din fișa fiecărui voluntar.</Text>
            </Group>

            <SimpleGrid cols={{ base: 2, md: 4 }} mb="lg">
                <Stat label="Voluntari" value={String(n)} hint={`din ${volunteers.length} înscriși în total`} />
                <Stat label="Ore disponibile / săpt." value={`${capacity.totals.hours} h`}
                      hint={n > 0 ? `în medie ${Math.round((capacity.totals.hours / n) * 10) / 10} h / voluntar` : undefined} />
                <Stat label="Constant / punctual" value={`${constantCount} / ${n - constantCount}`} />
                <Stat label="Înscrieri noi" value={String(lastMonthCount)} hint="în ultimele 30 de zile" />
            </SimpleGrid>

            <Paper withBorder radius="md" p="md" mb="lg">
                <Group justify="space-between" align="flex-start" mb="sm">
                    <div>
                        <Title order={4}>Capacitate disponibilă pe arii</Title>
                        <Text fz="xs" c="dimmed" maw={640}>
                            Orele unui voluntar sunt împărțite egal între ariile alese. „Necesar estimat” se completează
                            de voi; gap = ore disponibile − necesar.
                        </Text>
                    </div>
                    <Button onClick={saveNeeds} loading={pending} disabled={!needsDirty} size="xs"
                            leftSection={<IconCheck size={16} />}>
                        Salvează necesarul
                    </Button>
                </Group>
                {message && <Alert color={message.ok ? 'green' : 'red'} py="xs" mb="sm">{message.text}</Alert>}
                <Table.ScrollContainer minWidth={680}>
                    <Table striped verticalSpacing="xs">
                        <Table.Thead>
                            <Table.Tr>
                                <Table.Th>Arie</Table.Th>
                                <Table.Th className={classes.num}>Voluntari</Table.Th>
                                <Table.Th className={classes.num}>din care constant</Table.Th>
                                <Table.Th className={classes.num}>Ore disponibile / săpt.</Table.Th>
                                <Table.Th className={classes.num}>Necesar estimat (h)</Table.Th>
                                <Table.Th className={classes.num}>Gap</Table.Th>
                            </Table.Tr>
                        </Table.Thead>
                        <Table.Tbody>
                            {capacity.rows.map((r) => (
                                <Table.Tr key={r.area}>
                                    <Table.Td>{labels.AREAS[r.area] ?? r.area}</Table.Td>
                                    <Table.Td className={classes.num}>{r.volunteers}</Table.Td>
                                    <Table.Td className={classes.num}>{r.constant}</Table.Td>
                                    <Table.Td className={classes.num}>{r.hours} h</Table.Td>
                                    <Table.Td>
                                        <NumberInput size="xs" w={90} ml="auto" min={0} max={1000} allowDecimal={false}
                                                     allowNegative={false} aria-label={`Necesar ${labels.AREAS[r.area]}`}
                                                     value={needDraft[r.area] ?? 0}
                                                     onChange={(v) => {
                                                         setMessage(null);
                                                         // Mantine passes strings like "030" when typing after a 0.
                                                         const parsed = typeof v === 'number' ? v : parseInt(v, 10);
                                                         setNeedDraft((prev) => ({ ...prev, [r.area]: Number.isFinite(parsed) ? parsed : 0 }));
                                                     }} />
                                    </Table.Td>
                                    <Table.Td><Gap value={r.gap} /></Table.Td>
                                </Table.Tr>
                            ))}
                        </Table.Tbody>
                        <Table.Tfoot>
                            <Table.Tr fw={700}>
                                <Table.Td>Total</Table.Td>
                                <Table.Td className={classes.num}>{n}</Table.Td>
                                <Table.Td className={classes.num}>{constantCount}</Table.Td>
                                <Table.Td className={classes.num}>{capacity.totals.hours} h</Table.Td>
                                <Table.Td className={classes.num}>{capacity.totals.need} h</Table.Td>
                                <Table.Td><Gap value={capacity.totals.gap} /></Table.Td>
                            </Table.Tr>
                        </Table.Tfoot>
                    </Table>
                </Table.ScrollContainer>
                <Text fz="xs" c="dimmed" mt="xs">
                    La „Voluntari”, un voluntar care a ales mai multe arii este numărat la fiecare dintre ele.
                </Text>
            </Paper>

            <SimpleGrid cols={{ base: 1, md: 2 }} spacing="lg">
                <BarList title="Voluntari pe arii de implicare" items={bars.areas} total={n} sort />
                <BarList title="Voluntari pe competențe" items={bars.skills} total={n} sort />
                <BarList title="Durata asumată" items={bars.commitment} total={n} />
                <BarList title="Când sunt disponibili" items={bars.timeSlots} total={n} />
                <BarList title="Mod de implicare" items={bars.workMode} total={n} />
                <BarList title="Vârstă" items={bars.age} total={n} />
                <BarList title="Cum au aflat de noi" items={bars.source} total={n} sort />
            </SimpleGrid>
        </>
    );
}
