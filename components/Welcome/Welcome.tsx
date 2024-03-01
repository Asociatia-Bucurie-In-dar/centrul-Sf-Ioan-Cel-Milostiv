import { Title, Text, Anchor } from '@mantine/core';
import classes from './Welcome.module.css';

export function Welcome() {
  return (
    <>
      <Title className={classes.title} ta="center" mt={100}>
        Welcome.
      </Title>
      <Text c="dimmed" ta="center" size="lg" maw={580} mx="auto" mt="xl">
          In construction! This starter Next.js project includes a minimal setup for server side rendering, if you want
        to learn more on Mantine + Next.js integration follow{' '}
        <Anchor href="https://mantine.dev/guides/next/" size="lg">
          this guide
        </Anchor>
        . To get started edit page.tsx file.
      </Text>
        <Text c="dimmed" ta="center" size="lg" maw={580} mx="auto" mt="xl">
            Ä ö Ü ß, ă î ș ţ â, é à è û ç ë, 你好, ñ á é í ó ú ¿ ¡, русский, 日本語, 한국어, العربية, עברית, ελληνικά
        </Text>
    </>
  );
}
