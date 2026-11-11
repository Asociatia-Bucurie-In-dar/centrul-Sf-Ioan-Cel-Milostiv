'use client';

import { Group, Paper, Text, Title, Tooltip } from '@mantine/core';
import classes from './Admin.module.css';

export type BarItem = { key: string; label: string; value: number };

// Single-series horizontal bar chart: one hue, value labels in text ink, hover tooltip with share.
// `sort` orders by value (for nominal categories); leave it off for ordinal ones (durations, ages).
export function BarList({ title, subtitle, items, total, sort = false, unit = '' }: {
    title: string;
    subtitle?: string;
    items: BarItem[];
    total: number; // denominator for the % in the tooltip
    sort?: boolean;
    unit?: string;
}) {
    const rows = sort ? [...items].sort((a, b) => b.value - a.value) : items;
    const max = rows.reduce((m, r) => Math.max(m, r.value), 0);

    return (
        <Paper withBorder radius="md" p="md">
            <Title order={5}>{title}</Title>
            {subtitle && <Text fz="xs" c="dimmed">{subtitle}</Text>}
            <div style={{ marginTop: 12 }}>
                {rows.map((r) => {
                    const pct = total > 0 ? Math.round((r.value / total) * 100) : 0;
                    return (
                        <Tooltip key={r.key} label={`${r.label}: ${r.value}${unit} (${pct}%)`} position="top-start" withinPortal>
                            <Group gap="sm" wrap="nowrap" className={classes.barRow}>
                                <Text fz="sm" className={classes.barLabel} truncate="end">{r.label}</Text>
                                <div className={classes.barTrack}>
                                    {r.value > 0 && (
                                        <div className={classes.bar} style={{ width: `${max > 0 ? (r.value / max) * 100 : 0}%` }} />
                                    )}
                                </div>
                                <Text fz="sm" fw={600} className={classes.barValue}>{r.value}{unit}</Text>
                            </Group>
                        </Tooltip>
                    );
                })}
                {max === 0 && <Text fz="sm" c="dimmed">Nu există date încă.</Text>}
            </div>
        </Paper>
    );
}
