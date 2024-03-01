import {HomeHero} from '@/components/Home/Hero/HomeHero';
import {HomeProjects} from '@/components/Home/HomeProjects/HomeProjects';
import {HomeFeeding} from '@/components/Home/HomeFeeding/HomeFeeding';
import {HomeAboutGeneral} from '@/components/Home/HomeAboutGeneral/HomeAboutGeneral';
import {HomeAboutProjects} from '@/components/Home/HomeAboutProjects/HomeAboutProjects';
import {OurTeam} from '@/components/OurTeam/OurTeam';
import {FAQ} from '@/components/FAQ/FAQ';
import {SfIoan} from "@/components/SfIoan/SfIoan";
import {Divider} from "@mantine/core";
import {unstable_setRequestLocale} from "next-intl/server";

export default function HomePage({params: {locale}}:{ params: { locale: string } }) {
    unstable_setRequestLocale(locale);
    
  return (
      <>
          <HomeHero/>
          <HomeFeeding/>
          <HomeProjects/>
          <SfIoan/>
          <HomeAboutGeneral/>
          <HomeAboutProjects/>
          <OurTeam/>
          <FAQ/>
          
          <Divider color="transparent" mb={100}/>
      </>
  );
}
