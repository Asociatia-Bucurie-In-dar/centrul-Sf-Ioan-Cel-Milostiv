import { MetadataRoute } from "next";
import { MyRoutePaths } from "@/utils/route-paths";
import { GetAllProjectsStaticContent } from "@/content/projects/projects-content";
import { locales, defaultLocale } from "@/middleware";

function getUrlsOfLocale(localeAsString: string): { url: string, alternates: { hreflang: string, href: string }[] }[] {
    const locale = localeAsString === "" ? "" : "/" + localeAsString;
    const baseUrl = "https://bucurieindar.org" + locale;

    const paths = Object.values(MyRoutePaths).map(x => x);
    let urls = paths.map(link => {
        const url = baseUrl + link;
        const alternates = locales.map((loc) => {
            const locPrefix = loc === defaultLocale ? "" : "/" + loc;
            return { hreflang: loc, href: `https://centrulsfantulioancelmilostiv.org${locPrefix}${link}` };
        });
        return { url, alternates };
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