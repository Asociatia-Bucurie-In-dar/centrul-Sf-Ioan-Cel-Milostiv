import { requireAdmin } from '@/utils/admin-auth';
import { prisma } from '@/utils/prisma';
import { getRoOptionLabels, loadAreaNeeds, loadVolunteers } from '@/utils/volunteers/server';
import { AdminDashboard } from '@/components/Admin/AdminDashboard';

export const dynamic = 'force-dynamic';

export default async function AdminPage({ searchParams }: { searchParams: Promise<{ v?: string }> }) {
    const me = await requireAdmin();
    const { v } = await searchParams;

    const [volunteers, needs, notificationEmails, adminUsers] = await Promise.all([
        loadVolunteers(),
        loadAreaNeeds(),
        prisma.notificationEmail.findMany({ orderBy: { createdAt: 'asc' } }),
        prisma.adminUser.findMany({
            orderBy: { createdAt: 'asc' },
            select: { id: true, email: true, name: true, lastLoginAt: true },
        }),
    ]);

    const openId = Number(v);

    return (
        <AdminDashboard
            me={me}
            volunteers={volunteers}
            needs={needs}
            labels={getRoOptionLabels()}
            notificationEmails={notificationEmails.map((n) => ({ id: n.id, email: n.email }))}
            adminUsers={adminUsers.map((u) => ({
                id: u.id,
                email: u.email,
                name: u.name,
                lastLoginAt: u.lastLoginAt?.toISOString() ?? null,
            }))}
            initialOpenId={Number.isInteger(openId) && openId > 0 ? openId : null}
        />
    );
}
