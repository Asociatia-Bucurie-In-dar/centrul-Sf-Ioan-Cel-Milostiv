export type ProjectType = {
    id: string; //Primary Key
    slug: string;
    
    translation_key: string;
    image_path: string;
    currentAmount: number;
    goalAmount: number;
};

export type ProjectTranslationsType = {
    Donate: string;
    CardOption: string;
    BankTransferOption: string;
    DesiredAmount: string;
    Continue: string;
    DonateFor: string;
}

export type ContactTranslationType = {
    FormTitle: string;
    Disclaimer: string;
    Email: string;
    Phone: string;
    Address: string;
    WorkingHours: string;
    Name: string;
    YourMessage: string;
    Send: string;
    Success: string;
    Error: string;
};