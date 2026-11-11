import { redirect } from 'next/navigation';
import { Center, Paper, Text, Title } from '@mantine/core';
import { getCurrentAdmin } from '@/utils/admin-auth';
import { LoginForm } from '@/components/Admin/LoginForm';

export const dynamic = 'force-dynamic';

export default async function AdminLoginPage() {
    if (await getCurrentAdmin()) redirect('/admin');

    return (
        <Center mih="100vh" p="md" bg="var(--mantine-color-gray-0)">
            <Paper withBorder shadow="sm" radius="md" p="xl" w="100%" maw={400}>
                <Title order={2}>Administrare</Title>
                <Text c="dimmed" fz="sm" mb="lg">Centrul Sf. Ioan cel Milostiv</Text>
                <LoginForm />
            </Paper>
        </Center>
    );
}
