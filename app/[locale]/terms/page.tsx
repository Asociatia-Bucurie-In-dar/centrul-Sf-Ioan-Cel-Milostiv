import * as fs from "fs";
import { remark } from 'remark';
import html from 'remark-html';
import {Container} from "@mantine/core";
import matter from "gray-matter";
import commonClasses from "@/utils/commonClasses.module.css";
import {TitleWithDescription} from "@/components/Common/TitleWithDescription";

export async function generateMetadata({params: {locale}}:{ params: { locale: string } }) {
    return {
        title: 'Terms of Service',
        description: 'Terms of Service',
    };
}
export default async function TermsPage( {params: {locale}} : {params: {locale: string}} ) {

    //TODO move this to a common place
    const fullPath:string = './messages/terms/' + locale + '.md';
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
