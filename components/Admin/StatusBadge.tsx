import { Badge } from '@mantine/core';
import {
    VOLUNTEER_STATUS_COLORS,
    VOLUNTEER_STATUS_LABELS,
    VolunteerStatus,
} from '@/content/volunteer/volunteer-options';

export function StatusBadge({ status }: { status: string }) {
    const s = status as VolunteerStatus;
    return (
        <Badge variant="light" color={VOLUNTEER_STATUS_COLORS[s] ?? 'gray'}>
            {VOLUNTEER_STATUS_LABELS[s] ?? status}
        </Badge>
    );
}
