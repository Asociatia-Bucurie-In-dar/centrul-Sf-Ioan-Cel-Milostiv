import {HomeHero} from '@/components/Home/Hero/HomeHero';
import {HomeProjects} from '@/components/Home/HomeProjects/HomeProjects';
import {DonationProgress} from '@/components/DonationProgress/DonationProgress';
import {HomeAboutGeneral} from '@/components/Home/HomeAboutGeneral/HomeAboutGeneral';
import {HomeAboutProjects} from '@/components/Home/HomeAboutProjects/HomeAboutProjects';
import {OurTeam} from '@/components/OurTeam/OurTeam';
import {FAQ} from '@/components/FAQ/FAQ';
import {SfIoan} from "@/components/SfIoan/SfIoan";
import {Divider} from "@mantine/core";
import {unstable_setRequestLocale} from "next-intl/server";
import {revalidateTag} from "next/cache";

export default function HomePage({params: {locale}}:{ params: { locale: string } }) {
    unstable_setRequestLocale(locale);

    return (
      <>
          <HomeHero/>
          <DonationProgress/>
          <HomeAboutProjects/>
          <HomeProjects/>
          <SfIoan/>
          <HomeAboutGeneral/>
          <OurTeam/>
          
          <Divider color="transparent" mb={100}/>
      </>
  );
}
