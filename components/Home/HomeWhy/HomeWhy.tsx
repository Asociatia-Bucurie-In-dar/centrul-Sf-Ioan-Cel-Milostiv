import commonClasses from "@/utils/commonClasses.module.css";
import {TitleWithDescription} from "@/components/Common/TitleWithDescription";
import {Center, Container, Divider, Image, SimpleGrid, Stack, Text, Title} from "@mantine/core";
import {AnimatedThing} from "@/components/CoolEffects/AnimatedNumber/AnimatedThing";
import {useTranslations} from "next-intl";

const spacing = "xl";
const division = 75;
const cols = { base: 1, sm: 2, md: 2, lg: 2, xl: 2 };
export function HomeWhy() {

    const t = useTranslations('ABOUT');

    const roundedImage = (src: string) => {
        return (
            <div style={{borderRadius: '10px', overflow: 'hidden'}}>
                <Image src={src}/>
            </div>
        );
    }

    return (
        <>
            <Container size="full" pt={45}>
                <Container size="lg">
                    <TitleWithDescription title={"De ce înființăm Centrul?"} />
                    
                    <Divider mb={45} color="transparent" />

                    {/* FIRST */}
                    <SimpleGrid cols={cols} spacing={spacing}>
                        <Center>
                            {roundedImage("/faq.svg")}
                        </Center>

                        <Center>
                            <Stack>
                                <Title>Primul motiv</Title>
                                <Text c="dimmed">
                                    Fiecare dintre noi avem nevoie de ajutor într-un fel sau altul. Fiecare dintre noi am
                                    trecut cel puțin o dată în viață printr-o perioadă neagră din care nu mai știam cum să ieșim sau când se va termina. I-am
                                    văzut pe cei din familie, pe prieteni, pe oamenii dragi din viața nostră suferind și nu aveam cum să-i ajutăm. In acele
                                    momente cămd ești căzut ai nevoie de un sprijin, cât de mult contează ajutorul oferit cu drag, din inimă, din credință.
                                    Avem toată nădejdea și cred cu tărie că echipa Centrului Sf. Ioan Cel Milostiv se va strădui să aducă alinare, vindecare și să
                                    fie sprijin celor care nu mai au pe cine să se sprijine.
                                </Text>
                            </Stack>
                        </Center>
                    </SimpleGrid>

                    <Divider color="transparent" mb={division}/>

                    {/* SECOND */}
                    <SimpleGrid cols={cols} spacing={spacing}>
                        <Center>
                            <Stack>
                                <Title>Al doilea</Title>
                                <Text c="dimmed">
                                    Centrele din Romania sunt insuficiente, iar numărul celor afectati crește, în special copii și
                                    adolescenți. Așa că nu putrm și nu vrem să stăm indifereți la ce se întâmplă, mai ales că împreună putem ajuta aceste
                                    suflete. Omule drag, un om dacă reușim să-l convingem, un om în prag de suicid, că viața are sens, contează enorm, o tânără
                                    mămică să nu avorteze, pentru că viața este prețioasă, un părinte să renunțe la alcool, la droguri, la jocuri de noroc,
                                    înseamnă că avem o familie salvată, un copil care alege să se joace afară, și nu la consolă. Omule drag, miza este mai mare
                                    decât vindecarea unui om, miza este salvarea a cât mai multe vieți, destine și suflete. Stă în puterea ta să alegi.
                                </Text>
                            </Stack>
                        </Center>

                        <Center>
                            {roundedImage("/faq.svg")}
                        </Center>
                    </SimpleGrid>

                    <Divider color="transparent" mb={division} />
                    
                </Container>
            </Container>
        </>
    );
}
