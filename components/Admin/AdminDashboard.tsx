'use client';

import { Badge, Box, Button, Container, Group, Tabs, Text, Title } from '@mantine/core';
import { IconChartBar, IconLogout, IconSettings, IconUsers } from '@tabler/icons-react';
import { logout } from '@/app/admin/actions';
import type { VolunteerOptionLabels } from '@/content/volunteer/volunteer-options';
import type { VolunteerRecord } from '@/utils/volunteers/admin-data';
import type { AdminUserInfo } from '@/utils/admin-auth';
import type { AdminUserRow, NotificationEmailRow } from './types';
import { VolunteersTab } from './VolunteersTab';
import { ReportsTab } from './ReportsTab';
import { SettingsTab } from './SettingsTab';
import classes from './Admin.module.css';

type Props = {
    me: AdminUserInfo;
    volunteers: VolunteerRecord[];
    needs: Record<string, number>;
    labels: VolunteerOptionLabels;
    notificationEmails: NotificationEmailRow[];
    adminUsers: AdminUserRow[];
    initialOpenId: number | null;
};

export function AdminDashboard(props: Props) {
    const newCount = props.volunteers.filter((v) => v.status === 'NEW').length;

    return (
        <Box mih="100vh" className={classes.page}>
            <Box component="header" className={classes.header}>
                <Container size="xl">
                    <Group justify="space-between" py="sm">
                        <div>
                            <Title order={3}>Administrare voluntari</Title>
                            <Text fz="xs" c="dimmed">Centrul Sf. Ioan cel Milostiv</Text>
                        </div>
                        <Group gap="sm">
                            <Text fz="sm" c="dimmed" visibleFrom="sm">{props.me.name ?? props.me.email}</Text>
                            <form action={logout}>
                                <Button type="submit" variant="subtle" size="xs" leftSection={<IconLogout size={16} />}>
                                    Ieșire
                                </Button>
                            </form>
                        </Group>
                    </Group>
                </Container>
            </Box>

            <Container size="xl" py="lg">
                <Tabs defaultValue="volunteers" keepMounted={false}>
                    <Tabs.List mb="lg">
                        <Tabs.Tab value="volunteers" leftSection={<IconUsers size={16} />}
                                  rightSection={newCount > 0 ? <Badge size="xs" circle>{newCount}</Badge> : null}>
                            Voluntari
                        </Tabs.Tab>
                        <Tabs.Tab value="reports" leftSection={<IconChartBar size={16} />}>Rapoarte</Tabs.Tab>
                        <Tabs.Tab value="settings" leftSection={<IconSettings size={16} />}>Setări</Tabs.Tab>
                    </Tabs.List>

                    <Tabs.Panel value="volunteers">
                        <VolunteersTab volunteers={props.volunteers} labels={props.labels}
                                       initialOpenId={props.initialOpenId} />
                    </Tabs.Panel>
                    <Tabs.Panel value="reports">
                        <ReportsTab volunteers={props.volunteers} needs={props.needs} labels={props.labels} />
                    </Tabs.Panel>
                    <Tabs.Panel value="settings">
                        <SettingsTab me={props.me} notificationEmails={props.notificationEmails}
                                     adminUsers={props.adminUsers} />
                    </Tabs.Panel>
                </Tabs>
            </Container>
        </Box>
    );
}
