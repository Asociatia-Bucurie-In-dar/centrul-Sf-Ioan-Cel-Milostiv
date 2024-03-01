import { MetadataRoute } from "next";
import { MyRoutePaths } from "@/utils/route-paths";
import { GetAllProjectsStaticContent } from "@/content/projects/projects-content";
import { GetAllArticlesStaticContent } from "@/content/blog/blog-content";
import { locales, defaultLocale } from "@/middleware";

function getUrlsOfLocale(localeAsString: string): { url: string, alternates: { hreflang: string, href: string }[] }[] {
    const locale = localeAsString === "" ? "" : "/" + localeAsString;
    const baseUrl = "https://bucurieindar.org" + locale;

    const paths = Object.values(MyRoutePaths).map(x => x);
    let urls = paths.map(link => {
        const url = baseUrl + link;
        const alternates = locales.map((loc) => {
            const locPrefix = loc === defaultLocale ? "" : "/" + loc;
            return { hreflang: loc, href: `https://bucurieindar.org${locPrefix}${link}` };
        });
        return { url, alternates };
    });

    // Add projects
    const projects = GetAllProjectsStaticContent(99);
    projects.forEach(x => {
        const projectUrl = baseUrl + MyRoutePaths.Projects + "/" + x.slug;
        const alternates = locales.map((loc) => {
            const locPrefix = loc === defaultLocale ? "" : "/" + loc;
            return { hreflang: loc, href: `https://bucurieindar.org${locPrefix}${MyRoutePaths.Projects}/${x.slug}` };
        });
        urls.push({ url: projectUrl, alternates });
    });

    // Add articles
    const articles = GetAllArticlesStaticContent(99);
    articles.forEach(x => {
        const articleUrl = baseUrl + MyRoutePaths.Blog + "/" + x.slug;
        const alternates = locales.map((loc) => {
            const locPrefix = loc === defaultLocale ? "" : "/" + loc;
            return { hreflang: loc, href: `https://bucurieindar.org${locPrefix}${MyRoutePaths.Blog }/${x.slug}` };
        });
        urls.push({ url: articleUrl, alternates });
    });

    return urls;
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    let allUrls: { url: string, alternates: { hreflang: string, href: string }[] }[] = [];

    for (let locale of locales) {
        if (locale === defaultLocale) locale = "";
        const urls = getUrlsOfLocale(locale);
        urls.forEach(x => allUrls.push(x));
    }

    // Logic to convert allUrls to the desired sitemap format goes here
    // This part depends on how you plan to serialize or output the sitemap with hreflang annotations

    return allUrls;
}