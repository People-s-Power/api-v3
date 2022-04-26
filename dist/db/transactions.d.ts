declare const _default: ({
    _id: {
        $oid: string;
    };
    domain: string;
    status: string;
    reference: string;
    amount: number;
    paid_at: {
        $date: string;
    };
    created_at: {
        $date: string;
    };
    channel: string;
    currency: string;
    ip_address: string;
    transaction_date: {
        $date: string;
    };
    user: {
        $oid: string;
    };
    applicant: {
        $oid: string;
    };
    __v: number;
} | {
    _id: {
        $oid: string;
    };
    user: {
        $oid: string;
    };
    applicant: {
        $oid: string;
    };
    __v: number;
    domain?: undefined;
    status?: undefined;
    reference?: undefined;
    amount?: undefined;
    paid_at?: undefined;
    created_at?: undefined;
    channel?: undefined;
    currency?: undefined;
    ip_address?: undefined;
    transaction_date?: undefined;
})[];
export default _default;
