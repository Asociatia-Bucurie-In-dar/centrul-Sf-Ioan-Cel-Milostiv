import {createSharedPathnamesNavigation} from 'next-intl/navigation'

import {locales} from "@/middleware";

export const {Link, useRouter} = createSharedPathnamesNavigation({locales});