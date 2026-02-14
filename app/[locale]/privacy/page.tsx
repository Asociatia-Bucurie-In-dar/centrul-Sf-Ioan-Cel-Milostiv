import * as fs from "fs";
import { remark } from 'remark';
import html from 'remark-html';
import {Container} from "@mantine/core";
import matter from "gray-matter";
import commonClasses from "@/utils/commonClasses.module.css";
import {TitleWithDescription} from "@/components/Common/TitleWithDescription";
import {setRequestLocale} from "next-intl/server";

export async function generateMetadata() {
    return {
        title: 'Privacy Policy',
        description: 'Privacy Policy',
    };
}
export default async function TermsPage({params}: {params: Promise<{locale: string}>}) {
    const {locale} = await params;
    setRequestLocale(locale);

    const fullPath:string = './messages/privacy/' + locale + '.md';
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    
    const matterResult = matter(fileContents);
    
    const processedContent = await remark()
        .use(html)
        .process(matterResult.content);
    const contentHtml = processedContent.toString();

    
    return (
        <>
            <Container className={commonClasses.container} pb="xl">
                <div dangerouslySetInnerHTML={{__html: contentHtml}} />
            </Container>
        </>
    );
}
