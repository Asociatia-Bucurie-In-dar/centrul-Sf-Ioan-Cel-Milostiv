import { MetadataRoute } from "next";
import { MyRoutePaths } from "@/utils/route-paths";
import { locales, defaultLocale } from "@/i18n/routing";

function getUrlsOfLocale(localeAsString: string): MetadataRoute.Sitemap {
    const locale = localeAsString === "" ? "" : "/" + localeAsString;
    const baseUrl = "https://bucurieindar.org" + locale;

    const paths = Object.values(MyRoutePaths).map(x => x);
    let urls = paths.map(link => {
        const url = baseUrl + link;
        const languages: Record<string, string> = {};
        locales.forEach((loc) => {
            const locPrefix = loc === defaultLocale ? "" : "/" + loc;
            languages[loc] = `https://centrulsfantulioancelmilostiv.org${locPrefix}${link}`;
        });
        return { url, alternates: { languages } };
    });

    return urls;
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    let allUrls: MetadataRoute.Sitemap = [];

    for (const loc of locales) {
        const prefix = loc === defaultLocale ? "" : loc;
        const urls = getUrlsOfLocale(prefix);
        urls.forEach(x => allUrls.push(x));
    }

    return allUrls;
}