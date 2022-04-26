export declare class CreateReportDTO {
    applicant_id: string;
    title: string;
    content: string;
}
export declare class UpdateReportDTO {
    id: string;
    title: string;
    content: string;
}
export declare class CreateRepCommentDTO {
    report: string;
    content: string;
}
export declare class UpdateRepCommentDTO {
    content: string;
    id: string;
}
