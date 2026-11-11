'use client';

import { useMemo, useState } from 'react';
import {
    Anchor,
    Badge,
    Button,
    Group,
    Paper,
    Select,
    SimpleGrid,
    Table,
    Text,
    TextInput,
} from '@mantine/core';
import { IconDownload, IconFilterOff, IconSearch } from '@tabler/icons-react';
import {
    VOLUNTEER_STATUS_LABELS,
    VOLUNTEER_STATUSES,
    VolunteerOptionLabels,
} from '@/content/volunteer/volunteer-options';
import {
    EMPTY_FILTERS,
    filterVolunteers,
    filtersToQuery,
    formatDate,
    VolunteerFilters,
    VolunteerRecord,
} from '@/utils/volunteers/admin-data';
import { VolunteerDrawer } from './VolunteerDrawer';
import { StatusBadge } from './StatusBadge';
import classes from './Admin.module.css';

function toOptions(map: Record<string, string>) {
    return Object.entries(map).map(([value, label]) => ({ value, label }));
}

type Props = {
    volunteers: VolunteerRecord[];
    labels: VolunteerOptionLabels;
    initialOpenId: number | null;
};

export function VolunteersTab({ volunteers, labels, initialOpenId }: Props) {
    const [filters, setFilters] = useState<VolunteerFilters>(EMPTY_FILTERS);
    const [openId, setOpenId] = useState<number | null>(initialOpenId);

    const filtered = useMemo(() => filterVolunteers(volunteers, filters), [volunteers, filters]);
    const selected = openId === null ? null : volunteers.find((v) => v.id === openId) ?? null;

    const statusOptions = useMemo(
        () => VOLUNTEER_STATUSES.map((s) => ({ value: s, label: VOLUNTEER_STATUS_LABELS[s] })),
        []
    );
    const setFilter = (key: keyof VolunteerFilters) => (value: string | null) =>
        setFilters((prev) => ({ ...prev, [key]: value ?? '' }));
    const hasFilters = filtersToQuery(filters) !== '';

    return (
        <>
            <Paper withBorder radius="md" p="md" mb="md">
                <SimpleGrid cols={{ base: 1, sm: 3, lg: 6 }} spacing="sm">
                    <TextInput placeholder="Caută nume, email, telefon..." leftSection={<IconSearch size={16} />}
                               value={filters.q} onChange={(e) => setFilter('q')(e.currentTarget.value)} />
                    <Select placeholder="Status" data={statusOptions} value={filters.status || null}
                            onChange={setFilter('status')} clearable />
                    <Select placeholder="Arie" data={toOptions(labels.AREAS)} value={filters.area || null}
                            onChange={setFilter('area')} clearable searchable />
                    <Select placeholder="Competență" data={toOptions(labels.SKILLS)} value={filters.skill || null}
                            onChange={setFilter('skill')} clearable searchable />
                    <Select placeholder="Disponibilitate" data={toOptions(labels.AVAILABILITY_TYPES)}
                            value={filters.availabilityType || null} onChange={setFilter('availabilityType')} clearable />
                    <Select placeholder="Mod de implicare" data={toOptions(labels.WORK_MODES)}
                            value={filters.workMode || null} onChange={setFilter('workMode')} clearable />
                </SimpleGrid>
                <Group justify="space-between" mt="sm">
                    <Text fz="sm" c="dimmed">
                        {filtered.length} din {volunteers.length} voluntari
                    </Text>
                    <Group gap="xs">
                        {hasFilters && (
                            <Button variant="subtle" size="xs" leftSection={<IconFilterOff size={16} />}
                                    onClick={() => setFilters(EMPTY_FILTERS)}>
                                Resetează filtrele
                            </Button>
                        )}
                        <Button component="a" size="xs" leftSection={<IconDownload size={16} />}
                                href={`/api/admin/volunteers/export?${filtersToQuery(filters)}`}>
                            Export Excel{hasFilters ? ' (filtrat)' : ''}
                        </Button>
                    </Group>
                </Group>
            </Paper>

            <Paper withBorder radius="md">
                <Table.ScrollContainer minWidth={900}>
                    <Table highlightOnHover verticalSpacing="sm">
                        <Table.Thead>
                            <Table.Tr>
                                <Table.Th>Data</Table.Th>
                                <Table.Th>Nume</Table.Th>
                                <Table.Th>Contact</Table.Th>
                                <Table.Th>Arii</Table.Th>
                                <Table.Th className={classes.num}>Ore / săpt.</Table.Th>
                                <Table.Th>Disponibilitate</Table.Th>
                                <Table.Th>Status</Table.Th>
                            </Table.Tr>
                        </Table.Thead>
                        <Table.Tbody>
                            {filtered.map((v) => (
                                <Table.Tr key={v.id} className={classes.row} onClick={() => setOpenId(v.id)}>
                                    <Table.Td>{formatDate(v.createdAt)}</Table.Td>
                                    <Table.Td>
                                        <Anchor component="button" type="button" fw={600} fz="sm"
                                                onClick={(e) => { e.stopPropagation(); setOpenId(v.id); }}>
                                            {v.firstName} {v.lastName}
                                        </Anchor>
                                        {v.city && <Text fz="xs" c="dimmed">{v.city}</Text>}
                                    </Table.Td>
                                    <Table.Td>
                                        <Text fz="sm">{v.email}</Text>
                                        <Text fz="xs" c="dimmed">{v.phone}</Text>
                                    </Table.Td>
                                    <Table.Td>
                                        <Group gap={4}>
                                            {v.areas.map((a) => (
                                                <Badge key={a} size="sm" variant="outline" color="gray">
                                                    {labels.AREAS[a] ?? a}
                                                </Badge>
                                            ))}
                                        </Group>
                                    </Table.Td>
                                    <Table.Td className={classes.num}>{v.hoursPerWeek}</Table.Td>
                                    <Table.Td>
                                        <Text fz="sm">
                                            {v.availabilityType === 'CONSTANT' ? 'Constant' : 'Punctual'}
                                        </Text>
                                    </Table.Td>
                                    <Table.Td><StatusBadge status={v.status} /></Table.Td>
                                </Table.Tr>
                            ))}
                            {filtered.length === 0 && (
                                <Table.Tr>
                                    <Table.Td colSpan={7}>
                                        <Text ta="center" c="dimmed" py="xl">
                                            {volunteers.length === 0
                                                ? 'Încă nu s-a înscris niciun voluntar.'
                                                : 'Niciun voluntar nu corespunde filtrelor.'}
                                        </Text>
                                    </Table.Td>
                                </Table.Tr>
                            )}
                        </Table.Tbody>
                    </Table>
                </Table.ScrollContainer>
            </Paper>

            <VolunteerDrawer volunteer={selected} labels={labels} onClose={() => setOpenId(null)} />
        </>
    );
}
