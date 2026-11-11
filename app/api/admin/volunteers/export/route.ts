import { NextRequest, NextResponse } from 'next/server';
import ExcelJS from 'exceljs';
import { getCurrentAdmin } from '@/utils/admin-auth';
import { getRoOptionLabels, loadAreaNeeds, loadVolunteers } from '@/utils/volunteers/server';
import {
    computeAreaCapacity,
    filterVolunteers,
    filtersFromParams,
    formatDateTime,
    volunteersInScope,
} from '@/utils/volunteers/admin-data';
import { VOLUNTEER_STATUS_LABELS, VolunteerStatus } from '@/content/volunteer/volunteer-options';

export const dynamic = 'force-dynamic';

// Excel export of the volunteer list (with the same filters as the admin table)
// plus a capacity-per-area sheet for active volunteers.
export async function GET(req: NextRequest) {
    if (!(await getCurrentAdmin())) {
        return NextResponse.json({ error: 'UNAUTHORIZED' }, { status: 401 });
    }

    const filters = filtersFromParams(req.nextUrl.searchParams);
    const [all, needs] = await Promise.all([loadVolunteers(), loadAreaNeeds()]);
    const volunteers = filterVolunteers(all, filters);
    const labels = getRoOptionLabels();
    const list = (keys: string[], map: Record<string, string>) => keys.map((k) => map[k] ?? k).join(', ');
    const one = (key: string | null, map: Record<string, string>) => (key ? map[key] ?? key : '');

    const workbook = new ExcelJS.Workbook();
    workbook.created = new Date();

    // --- Sheet 1: volunteers ---
    const sheet = workbook.addWorksheet('Voluntari', { views: [{ state: 'frozen', ySplit: 1 }] });
    sheet.columns = [
        { header: 'ID', key: 'id', width: 6 },
        { header: 'Data înscrierii', key: 'createdAt', width: 18 },
        { header: 'Status', key: 'status', width: 12 },
        { header: 'Prenume', key: 'firstName', width: 16 },
        { header: 'Nume', key: 'lastName', width: 16 },
        { header: 'Email', key: 'email', width: 28 },
        { header: 'Telefon', key: 'phone', width: 16 },
        { header: 'Localitate', key: 'city', width: 16 },
        { header: 'Vârsta', key: 'ageRange', width: 12 },
        { header: 'Ocupație', key: 'occupation', width: 22 },
        { header: 'Arii', key: 'areas', width: 40 },
        { header: 'Competențe', key: 'skills', width: 40 },
        { header: 'Alte competențe', key: 'otherSkills', width: 25 },
        { header: 'Ore / săpt.', key: 'hoursPerWeek', width: 10 },
        { header: 'Disponibilitate', key: 'availabilityType', width: 22 },
        { header: 'Intervale orare', key: 'timeSlots', width: 35 },
        { header: 'Mod de implicare', key: 'workMode', width: 20 },
        { header: 'Durată asumată', key: 'commitment', width: 15 },
        { header: 'Experiență', key: 'experience', width: 40 },
        { header: 'Motivație', key: 'motivation', width: 40 },
        { header: 'Sursă', key: 'source', width: 18 },
        { header: 'Notițe interne', key: 'adminNotes', width: 40 },
        { header: 'Acord GDPR', key: 'consentAt', width: 18 },
        { header: 'Versiune acord', key: 'consentVersion', width: 14 },
    ];
    for (const v of volunteers) {
        sheet.addRow({
            id: v.id,
            createdAt: formatDateTime(v.createdAt),
            status: VOLUNTEER_STATUS_LABELS[v.status as VolunteerStatus] ?? v.status,
            firstName: v.firstName,
            lastName: v.lastName,
            email: v.email,
            phone: v.phone,
            city: v.city ?? '',
            ageRange: one(v.ageRange, labels.AGE_RANGES),
            occupation: v.occupation ?? '',
            areas: list(v.areas, labels.AREAS),
            skills: list(v.skills, labels.SKILLS),
            otherSkills: v.otherSkills ?? '',
            hoursPerWeek: v.hoursPerWeek,
            availabilityType: one(v.availabilityType, labels.AVAILABILITY_TYPES),
            timeSlots: list(v.timeSlots, labels.TIME_SLOTS),
            workMode: one(v.workMode, labels.WORK_MODES),
            commitment: one(v.commitment, labels.COMMITMENTS),
            experience: v.experience ?? '',
            motivation: v.motivation ?? '',
            source: one(v.source, labels.SOURCES),
            adminNotes: v.adminNotes ?? '',
            consentAt: formatDateTime(v.consentAt),
            consentVersion: v.consentVersion,
        });
    }
    sheet.getRow(1).font = { bold: true };
    sheet.autoFilter = { from: { row: 1, column: 1 }, to: { row: 1, column: sheet.columns.length } };

    // --- Sheet 2: capacity per area (active volunteers, regardless of list filters) ---
    const capacity = computeAreaCapacity(volunteersInScope(all, 'ACTIVE'), needs);
    const capSheet = workbook.addWorksheet('Capacitate pe arii');
    capSheet.columns = [
        { header: 'Arie', key: 'area', width: 32 },
        { header: 'Voluntari activi', key: 'volunteers', width: 16 },
        { header: 'din care constant', key: 'constant', width: 18 },
        { header: 'Ore disponibile / săpt.', key: 'hours', width: 22 },
        { header: 'Necesar estimat', key: 'need', width: 16 },
        { header: 'Gap', key: 'gap', width: 10 },
    ];
    for (const r of capacity.rows) {
        capSheet.addRow({ ...r, area: labels.AREAS[r.area] ?? r.area });
    }
    const totalRow = capSheet.addRow({
        area: 'Total',
        volunteers: capacity.totals.volunteers,
        hours: capacity.totals.hours,
        need: capacity.totals.need,
        gap: capacity.totals.gap,
    });
    totalRow.font = { bold: true };
    capSheet.getRow(1).font = { bold: true };
    capSheet.addRow([]);
    capSheet.addRow(['Orele unui voluntar sunt împărțite egal între ariile alese.']);

    const buffer = await workbook.xlsx.writeBuffer();
    const date = new Date().toISOString().slice(0, 10);

    return new NextResponse(buffer as ArrayBuffer, {
        headers: {
            'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
            'Content-Disposition': `attachment; filename="voluntari-${date}.xlsx"`,
            'Cache-Control': 'no-store',
        },
    });
}
