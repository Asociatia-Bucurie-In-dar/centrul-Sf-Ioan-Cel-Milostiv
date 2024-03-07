import {userAgent} from "next/server";

export default function robots() {
    return {
        rules: [
            {
                userAgent: "",
                allow: "/",
                disallow: ["/admin", "/result"],
            }
        ],
        sitemap: "https://centrulsfantulioancelmilostiv.org/sitemap.xml"
    }
}