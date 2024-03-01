import { useEffect, useState } from 'react';
import { Switch, useMantineTheme, useMantineColorScheme, rem } from '@mantine/core';
import { IconSun, IconMoonStars } from '@tabler/icons-react';

export function ThemeSwitcher() {
    const theme = useMantineTheme();
    const { colorScheme, toggleColorScheme } = useMantineColorScheme();
    // State to manage the theme based on localStorage or system preference
    const [isDark, setIsDark] = useState(false);

    useEffect(() => {
        // Update the state and localStorage when component mounts or colorScheme changes
        setIsDark(colorScheme === 'dark');
        localStorage.setItem('color-scheme', colorScheme);
    }, [colorScheme]);

    const sunIcon = <IconSun style={{ width: rem(16), height: rem(16) }} stroke={2.5} color={theme.colors.yellow[4]} />;
    const moonIcon = <IconMoonStars style={{ width: rem(16), height: rem(16) }} stroke={2.5} color={theme.colors.blue[6]} />;

    return (
        <Switch checked={isDark}
                onClick={toggleColorScheme}
                size="md"
                color="dark.4"
                onLabel={sunIcon}
                offLabel={moonIcon}
        />
    );
}
