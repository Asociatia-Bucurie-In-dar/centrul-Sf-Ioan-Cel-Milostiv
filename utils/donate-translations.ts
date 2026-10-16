import {useTranslations} from "next-intl";
import {ProjectTranslationsType} from "@/utils/my-types";

export function useDonatePopupTranslations(): ProjectTranslationsType {
    const donateT = useTranslations('PROJECTS_MORE');
    const headerT = useTranslations('HEADER');
    return {
        Donate: donateT('DONATE'),
        CardOption: donateT('CARD_OPTION'),
        BankTransferOption: donateT('BANK_TRANSFER_OPTION'),
        DesiredAmount: donateT('DESIRED_AMOUNT'),
        Continue: donateT('CONTINUE'),
        DonateFor: donateT('DONATE_FOR'),
        IAgreeWith: donateT('I_AGREE_TO_THE'),
        TermsAndConditions: donateT('TERMS_AND_CONDITIONS'),
        And: donateT('AND'),
        PrivacyPolicy: donateT('PRIVACY_POLICY'),
        Locale: headerT('LOCALE'),
    };
}
