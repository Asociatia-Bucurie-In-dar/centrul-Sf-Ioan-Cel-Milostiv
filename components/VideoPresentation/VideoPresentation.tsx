import {Container} from '@mantine/core';
import {TitleWithDescription} from "@/components/Common/TitleWithDescription";
import {useTranslations} from "next-intl";
import classes from './VideoPresentation.module.css';

const VIDEO_IDS = ['lL30UGT8NxQ', 'ZDVKAJHxNFc'];

export function VideoPresentation() {
    const t = useTranslations('VIDEO_PRESENTATION');

    return (
        <Container size="lg" className={classes.wrapper}>
            {/* <TitleWithDescription title={t('TITLE')} description={t('DESCRIPTION')}/> */}
            <div className={classes.videos}>
                {VIDEO_IDS.map((videoId, index) => (
                    <div key={index} className={classes.videoContainer}>
                        <iframe
                            className={classes.iframe}
                            src={`https://www.youtube-nocookie.com/embed/${videoId}`}
                            title={t('TITLE')}
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                            referrerPolicy="strict-origin-when-cross-origin"
                            allowFullScreen
                            loading="lazy"
                        />
                    </div>
                ))}
            </div>
        </Container>
    );
}

