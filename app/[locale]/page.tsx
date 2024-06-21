import {HomeHero} from '@/components/Home/Hero/HomeHero';
import {HomeProjects} from '@/components/Home/HomeProjects/HomeProjects';
import {DonationProgress} from '@/components/DonationProgress/DonationProgress';
import {HomeAboutProjects} from '@/components/Home/HomeAboutProjects/HomeAboutProjects';
import {OurTeam} from '@/components/OurTeam/OurTeam';
import {Divider} from "@mantine/core";
import {unstable_setRequestLocale} from "next-intl/server";
import {HomeWhy} from "@/components/Home/HomeWhy/HomeWhy";
import {Addictions} from "@/components/Addictions/Addictions";
import {useTranslations} from "next-intl";

export default function HomePage({params: {locale}}:{ params: { locale: string } }) {
    unstable_setRequestLocale(locale);
    
    //TODO hide this in a component
    const addictionsT = useTranslations('ADDICTIONS');
    const addictionsData = {
        title: addictionsT('TITLE'),
        description: addictionsT('DESCRIPTION'),
        readMoreTranslation: addictionsT('READ_MORE'),
        slidesData: [
            {
                image: '/gallery/alcohol.jpeg',
                title: addictionsT('CATEGORIES.0.TITLE'),
                description: addictionsT('CATEGORIES.0.DESCRIPTION'),
            },
            {
                image: '/gallery/drugs.jpeg',
                title: addictionsT('CATEGORIES.1.TITLE'),
                description: addictionsT('CATEGORIES.1.DESCRIPTION'),
            },
            {
                image: '/gallery/food.jpeg',
                title: addictionsT('CATEGORIES.2.TITLE'),
                description: addictionsT('CATEGORIES.2.DESCRIPTION'),
            },
            {
                image: '/gallery/gambling.jpeg',
                title: addictionsT('CATEGORIES.3.TITLE'),
                description: addictionsT('CATEGORIES.3.DESCRIPTION'),
            },
            {
                image: '/gallery/gaming.jpeg',
                title: addictionsT('CATEGORIES.4.TITLE'),
                description: addictionsT('CATEGORIES.4.DESCRIPTION'),
            },
            {
                image: '/gallery/porn.jpeg',
                title: addictionsT('CATEGORIES.5.TITLE'),
                description: addictionsT('CATEGORIES.5.DESCRIPTION'),
            },
            {
                image: '/gallery/shop.jpeg',
                title: addictionsT('CATEGORIES.6.TITLE'),
                description: addictionsT('CATEGORIES.6.DESCRIPTION'),
            },
            {
                image: '/gallery/smoking.jpeg',
                title: addictionsT('CATEGORIES.7.TITLE'),
                description: addictionsT('CATEGORIES.7.DESCRIPTION'),
            },
            {
                image: '/gallery/tech.jpeg',
                title: addictionsT('CATEGORIES.8.TITLE'),
                description: addictionsT('CATEGORIES.8.DESCRIPTION'),
            },
            {
                image: '/gallery/work.jpeg',
                title: addictionsT('CATEGORIES.9.TITLE'),
                description: addictionsT('CATEGORIES.9.DESCRIPTION'),
            },
            {
                image: '/gallery/caffeine.jpg', 
                title: addictionsT('CATEGORIES.10.TITLE'),
                description: addictionsT('CATEGORIES.10.DESCRIPTION'),
            },
            {
                image: '/gallery/sport.jpg', 
                title: addictionsT('CATEGORIES.11.TITLE'),
                description: addictionsT('CATEGORIES.11.DESCRIPTION'),
            },
            {
                image: '/gallery/tv.jpg', 
                title: addictionsT('CATEGORIES.12.TITLE'),
                description: addictionsT('CATEGORIES.12.DESCRIPTION'),
            }
        ],
    };

    return (
      <>
          <HomeHero/>
          <DonationProgress/>
          <Addictions translations={addictionsData}/>
          <HomeProjects/>
          <HomeWhy />
          <HomeAboutProjects/>
          <OurTeam/>
      </>
  );
}
