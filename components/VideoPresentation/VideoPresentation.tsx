import {Container} from '@mantine/core';
import {TitleWithDescription} from "@/components/Common/TitleWithDescription";
import {useTranslations} from "next-intl";
import classes from './VideoPresentation.module.css';

const YOUTUBE_VIDEO_ID = 'YOUR_VIDEO_ID';

export function VideoPresentation() {
    const t = useTranslations('VIDEO_PRESENTATION');

    return (
        <Container size="lg" className={classes.wrapper}>
            {/* <TitleWithDescription title={t('TITLE')} description={t('DESCRIPTION')}/> */}
            <div className={classes.videoContainer}>
                <iframe
                    className={classes.iframe}
                    src={`https://www.youtube-nocookie.com/embed/lL30UGT8NxQ`}
                    title={t('TITLE')}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    referrerPolicy="strict-origin-when-cross-origin"
                    allowFullScreen
                    loading="lazy"
                />
            </div>
        </Container>
    );
}
