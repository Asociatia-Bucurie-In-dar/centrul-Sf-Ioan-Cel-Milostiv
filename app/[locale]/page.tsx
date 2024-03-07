import {HomeHero} from '@/components/Home/Hero/HomeHero';
import {HomeProjects} from '@/components/Home/HomeProjects/HomeProjects';
import {DonationProgress} from '@/components/DonationProgress/DonationProgress';
import {HomeAboutProjects} from '@/components/Home/HomeAboutProjects/HomeAboutProjects';
import {OurTeam} from '@/components/OurTeam/OurTeam';
import {Divider} from "@mantine/core";
import {unstable_setRequestLocale} from "next-intl/server";

export default function HomePage({params: {locale}}:{ params: { locale: string } }) {
    unstable_setRequestLocale(locale);

    return (
      <>
          <HomeHero/>
          <DonationProgress/>
          <HomeProjects/>
          <HomeAboutProjects/>
          <OurTeam/>
          
          <Divider color="transparent" mb={100}/>
      </>
  );
}
