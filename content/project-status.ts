// Edit this file to update the "Stadiul proiectului" section on the home page.
// Anything left as null is simply not shown on the site.

export type StepStatus = 'done' | 'inProgress' | 'notStarted';

export const projectStatus = {
    // Year and month of the last update, shown as "Actualizat: octombrie 2026".
    updatedAt: '2026-10',

    // Keys match PROJECT_STATUS.STEPS in messages/*.json
    steps: [
        {key: 'LAND', status: 'done'},
        {key: 'DESIGN', status: 'done'},
        {key: 'PERMITS', status: 'inProgress'},
        {key: 'CONSTRUCTION', status: 'notStarted'},
    ] as {key: string, status: StepStatus}[],

    // Stage I funding, in EUR. The previous site listed the stage budgets as
    // 120,000 (land & utilities) + 800,000 (building & cabins) + 50,000 (fit-out).
    funding: {
        goalEur: null as number | null,
        raisedEur: null as number | null,
    },

    // Free text per locale, e.g. {ro: '2028', en: '2028'}.
    estimatedOpening: null as {ro: string, en: string} | null,
};
