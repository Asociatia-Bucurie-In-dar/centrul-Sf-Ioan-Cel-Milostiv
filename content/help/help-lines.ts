// Shown on the "Am nevoie de ajutor" page. Each key matches HELP.LINES.<KEY> in messages/*.json
// Source: findahelpline.com/countries/ro; antisuicid hours (19:00–07:00) from ARPS (checked October 2026).
// Call each number before publishing changes here: a wrong number on this page does real harm.

export const emergencyNumber = '112';

export const helpLines = [
    {key: 'DEPREHUB', name: 'DepreHUB', phone: '0374 456 420'},
    {key: 'DEPREHUB_DRUGS', name: 'DepreHUB Antidrog', phone: '0374 456 444'},
    {key: 'ALCOLINE', name: 'AlcoLine', phone: '021 9335'},
    {key: 'SUICIDE', name: 'TelVerde Antisuicid', phone: '0800 801 200'},
    {key: 'CHILD', name: 'Telefonul Copilului', phone: '116 111'},
];

export function toTelLink(phone: string) {
    return 'tel:' + phone.replace(/[^\d+]/g, '');
}
