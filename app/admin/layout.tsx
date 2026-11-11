import '@mantine/core/styles.css';
import React from 'react';
import type { Metadata } from 'next';
import { ColorSchemeScript, MantineProvider } from '@mantine/core';

// Separate root layout: the admin panel is Romanian-only and has no public header/footer.
// /admin is excluded from the next-intl middleware in proxy.ts.

export const metadata: Metadata = {
    title: 'Administrare | Centrul Sf. Ioan cel Milostiv',
    robots: { index: false, follow: false },
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="ro">
            <head>
                <ColorSchemeScript />
                <link rel="shortcut icon" href="/sfIoan.png" />
                <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
            </head>
            <body>
                <MantineProvider defaultColorScheme="light">{children}</MantineProvider>
            </body>
        </html>
    );
}
