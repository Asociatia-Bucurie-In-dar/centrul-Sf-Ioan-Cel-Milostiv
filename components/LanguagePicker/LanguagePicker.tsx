import {Button, Center, Image, Menu, rem} from '@mantine/core';
import { IconChevronDown } from '@tabler/icons-react';
import {MyLocales} from "@/utils/my-lanaguages";
import classes from './LanguagePicker.module.css';
import {MyZIndexes} from "@/utils/my-constants";
import {useLocale} from 'next-intl';
import {Link} from '@/navigation';



export function LanguagePicker() {
    const curLocale = useLocale();
    const curImage = MyLocales.find((locale: any) => locale.locale === curLocale)?.image;
    const icon = <IconChevronDown style={{ width: rem(16), height: rem(16) }} />;
    
    const menuItems = MyLocales.map((locale: any) => (
        <Menu.Item component={Link} locale={locale.locale} href={'/'} key={locale.locale}>
            <div style={{borderRadius: '3px', overflow: 'hidden'}}>
                <Image src={locale.image} width={20} height={20} alt={locale.locale}/>
            </div>
        </Menu.Item>
));

return (
    <>
        <Menu trigger="click-hover"  transitionProps={{ exitDuration: 0 }}
              closeDelay={200} withinPortal zIndex={MyZIndexes.HeaderDropdown}>
            <Menu.Target>
                    <Center className={classes.flagHover}>
                        <div style={{borderRadius: '3px', overflow: 'hidden', marginRight: '5px'}}>
                            <Image src={curImage} width={22} height={22} alt={curLocale}/>
                        </div>
                        <IconChevronDown size="0.9rem" stroke={1.5} />
                    </Center>
            </Menu.Target>
            <Menu.Dropdown>
                {menuItems}
            </Menu.Dropdown>
        </Menu>
        </>
    );
}