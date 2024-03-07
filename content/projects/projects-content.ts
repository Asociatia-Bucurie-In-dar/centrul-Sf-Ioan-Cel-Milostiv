import {ProjectType} from "@/utils/my-types";

const imagesPath = '/projects/';
const projectsData : ProjectType[] = [
    {
        id: '99', 
        slug: 'centrul-Sf-Ioan-Cel-Milostiv', 
        image_path: imagesPath + 'SfIoan.png',
        goalAmount: 800000, 
        currentAmount: 0,
    },
];

export function GetAllProjectsStaticContent(amount: number): ProjectType[] {
    return projectsData.slice(0, amount);
}