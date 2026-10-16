// Each key matches OUR_TEAM.TEAM_MEMBERS.<KEY> in messages/*.json
// Each group key matches OUR_TEAM.GROUPS.<KEY>.

export type TeamMember = {key: string, avatar: string};

export const teamGroups: {key: string, members: TeamMember[]}[] = [
    {
        key: 'LEADERSHIP',
        members: [
            {key: 'FIRST', avatar: '/team/alex2.jpeg'},
            {key: 'MARIUS', avatar: '/team/catalin.jpeg'},
            {key: 'PITIGOI', avatar: '/team/3.jpeg'},
            {key: 'SECOND', avatar: '/team/2.jpeg'},
            {key: 'FOURTH', avatar: '/team/4.jpeg'},
        ],
    },
    {
        key: 'MEDICAL',
        members: [
            {key: 'FEODOT', avatar: '/team/asdadqw.jpeg'},
            {key: 'EIGHTH', avatar: '/team/anazaharia.jpeg'},
            {key: 'ELEVENTH', avatar: '/team/constantin.jpg'},
        ],
    },
    {
        key: 'OPERATIONAL',
        members: [
            {key: 'MANUELA', avatar: '/team/manuela.jpg'},
            {key: 'ANAMARIA', avatar: '/team/ferodot.png'},
            {key: 'SEVENTH', avatar: '/team/anabanica.jpeg'},
            {key: 'MIRELA', avatar: '/team/mirela.jpeg'},
            {key: 'ADRIANVOICU', avatar: '/team/adrianvoicu.jpg'},
            {key: 'TENTH', avatar: '/team/7.jpg'},
        ],
    },
    {
        key: 'PARTNERS',
        members: [
            {key: 'FIFTH', avatar: '/team/arhitectura.jpeg'},
        ],
    },
];
