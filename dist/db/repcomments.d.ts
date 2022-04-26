declare const _default: ({
    _id: {
        $oid: string;
    };
    author: {
        $oid: string;
    };
    title: string;
    content: string;
    report: {
        $oid: string;
    };
    createdAt: {
        $date: string;
    };
    updatedAt: {
        $date: string;
    };
    __v: number;
} | {
    _id: {
        $oid: string;
    };
    content: string;
    report: {
        $oid: string;
    };
    author: {
        $oid: string;
    };
    createdAt: {
        $date: string;
    };
    updatedAt: {
        $date: string;
    };
    __v: number;
    title?: undefined;
})[];
export default _default;
