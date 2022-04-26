export declare enum PaymentPurposeEnum {
    CAMPAIGN = "Promote Campagin",
    APPLICANT_REGISTRATION = "New Applicant Registration"
}
export interface TransactionPaymentResponse {
    status: boolean;
    message: string;
    data: {
        id: number;
        domain: 'test' | 'live';
        status: string;
        reference: string;
        amount: number;
        message: any;
        paid_at: Date;
        created_at: Date;
        currency: string;
        channel: string;
        metadata: {
            purpose: PaymentPurposeEnum;
            key: string;
            custom_fields: CustomField[];
            referrer: string;
        };
    };
}
interface CustomField {
    display_name: string;
    value: string;
    variable_name: string;
}
export {};
