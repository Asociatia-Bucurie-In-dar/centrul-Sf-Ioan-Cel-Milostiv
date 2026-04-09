import classes from './HomeProjects.module.css';
import {TitleWithDescription} from "@/components/Common/TitleWithDescription";
import {Container, Divider, SimpleGrid} from "@mantine/core";
import commonClasses from "@/utils/commonClasses.module.css";
import {useTranslations} from "next-intl";
import {ProjectPreviewCard} from "@/components/Projects/ProjectPreviewCard";

export function HomeProjects2() {
    //const t = useTranslations('ORGANIZATON');

    const data = [
        {
            title: "Stabilizare",
            imgPath: "/base/flower1.jpg",
            texts: [
                "Evaluare și un mediu sigur",
                "Primul pas către reîntregire",
            ]
        },
        {
            title: "Explorare",
            imgPath: "/base/flower3.jpg",
            texts: [
                "Terapie individuală și de grupTerapie individuală și de grup",
                "Recunoașterea rănilor și a mecanismelor",
            ]
        },
        {
            title: "Transformare",
            imgPath: "/base/flower6.jpg",
            texts: [
                "Artă, natură, muncă, rugăciune",
                "Reconectarea cu sinele autentic",
            ]
        },
                {
            title: "Reintegrare",
            imgPath: "/base/flower8.jpg",
            texts: [
                "Educație, mentorat, autonomie, rutina",
                "Reîntoarcerea în lume, transformat",
            ]
        },
    ];

    const cards = data.map((info) => (
        <ProjectPreviewCard title={info.title} imgPath={info.imgPath} texts={info.texts} />
    ));
    
    return (
        <Container size="full" pt={10} pb="sm">
            
            <Divider mt="xl" color="transparent" />
            
            <TitleWithDescription title={"Patru Etape ale Transformării"}
                                  description={""} maxWidth="1100px" />

            <Divider mb={45} color="transparent" />

            <Container size="lg">
            <SimpleGrid cols={{ base: 1, sm: 2, md: 2 }} spacing="xl" mt={50}>
                {cards[0]}
                {cards[1]}
                {cards[2]}
                {cards[3]}
            </SimpleGrid>
            </Container>

            {/*<Container size="md">*/}
            {/*<SimpleGrid cols={{ base: 1, sm: 1, md: 1 }} spacing="xl" mt={50}>*/}
            {/*    {cards[3]}*/}
            {/*</SimpleGrid>*/}
            {/*</Container>*/}
            
            <Divider mb={45} color="transparent"/>
        </Container>
    );
}